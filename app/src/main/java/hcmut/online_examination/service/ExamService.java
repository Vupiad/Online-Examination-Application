package hcmut.online_examination.service;

import hcmut.online_examination.dto.QuestionAnswerDto;
import hcmut.online_examination.dto.QuestionDto;
import hcmut.online_examination.dto.OptionDto;

import hcmut.online_examination.mappers.ExamMapper;
import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.ExamResultEntity;
import hcmut.online_examination.entity.OptionEntity;
import hcmut.online_examination.entity.QuestionEntity;
import hcmut.online_examination.entity.User;
import hcmut.online_examination.exception.DuplicateExamCodeException;
import hcmut.online_examination.exception.ExamNotFoundException;
import hcmut.online_examination.exception.InvalidExamPasscodeException;
import hcmut.online_examination.exception.MaxAttemptsExceededException;
import hcmut.online_examination.exception.UserNotFoundException;
import hcmut.online_examination.repository.ExamRepository;
import hcmut.online_examination.repository.ExamResultRepository;
import hcmut.online_examination.repository.OptionRepository;
import hcmut.online_examination.repository.QuestionRepository;
import hcmut.online_examination.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final OptionRepository optionRepository;
    private final ExamResultRepository examResultRepository;

    @Transactional
    public ExamEntity setPasscode(String examCode, String passcode) {
        ExamEntity exam = examRepository.findByExamCode(examCode)
                .orElseThrow(ExamNotFoundException::new);

        exam.setPasscode(passcode);
        return exam;
    }

    @Transactional
    public ExamEntity createExam(
            Long ownerId, // Đã đổi thành Long
            String examCode,
            String title,
            Long duration,
            Integer maxAttempts,
            List<QuestionDto> questions,
            Instant startTime,
            Instant endTime
    ) {
        // Truyền thẳng ownerId
        User user = userRepository.findById(ownerId)
                .orElseThrow(UserNotFoundException::new);

        if (examRepository.existsByExamCodeAndOwner(examCode, user)) {
            throw new DuplicateExamCodeException();
        }

        ExamEntity exam = ExamEntity.builder()
                .title(title)
                .maxAttempts(maxAttempts)
                .startTime(startTime)
                .endTime(endTime)
                .durationInMinutes(duration)
                .owner(user)
                .examCode(examCode)
                .build();

        for (QuestionDto qDto : questions) {
            QuestionEntity question = ExamMapper.toQuestionEntity(qDto);

            for (OptionDto oDto : qDto.options()) {
                OptionEntity option = ExamMapper.toOptionEntity(oDto);
                question.addOption(option);
            }
            exam.addQuestion(question);
        }

        return examRepository.save(exam);
    }

    public ExamEntity joinExam(String examCode, Long userId, String passcode) {
        ExamEntity exam = examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);

        if (!passcode.equals(exam.getPasscode())) {
            throw new InvalidExamPasscodeException();
        }

        // Gọi đúng userId
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        long attemptCount = examResultRepository.countByExamAndExaminee(exam, user);
        if (attemptCount >= exam.getMaxAttempts()) {
            throw new MaxAttemptsExceededException();
        }

        return exam;
    }

    @Transactional
    public ExamResultEntity submitExam(
            String examCode,
            Long examineeId, // Đã đổi examineeId thành Long
            Instant startTime,
            List<QuestionAnswerDto> answers
    ) {
        // Đã sửa biến thành examinee và gọi đúng examineeId
        User examinee = userRepository.findById(examineeId)
                .orElseThrow(UserNotFoundException::new);

        ExamEntity exam = examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);

        long attemptCount = examResultRepository.countByExamAndExaminee(exam, examinee);
        if (attemptCount >= exam.getMaxAttempts()) {
            throw new MaxAttemptsExceededException();
        }

        Map<Long, QuestionEntity> questionMap = exam.getQuestions().stream()
                .collect(Collectors.toMap(QuestionEntity::getId, q -> q));

        BigDecimal score = BigDecimal.ZERO;
        BigDecimal totalScore = BigDecimal.ZERO;

        for (QuestionAnswerDto answer : answers) {
            QuestionEntity question = questionMap.get(answer.questionId());
            if (question == null) {
                throw new IllegalArgumentException("Invalid question: " + answer.questionId());
            }

            if (answer.optionId() != null) {
                OptionEntity selectedOption = question.getOptions().stream()
                        .filter(o -> o.getId().equals(answer.optionId()))
                        .findFirst()
                        .orElseThrow(() -> new IllegalArgumentException("Invalid option for question " + question.getId()));

                if (selectedOption.getIsCorrect()) {
                    score = score.add(question.getScore());
                }
            }
            totalScore = totalScore.add(question.getScore());
        }

        ExamResultEntity attempt = ExamResultEntity.builder()
                .score(score)
                .totalScore(totalScore)
                .submittedAt(Instant.now())
                .exam(exam)
                .examinee(examinee) // Đã map đúng biến examine
                .startTime(startTime)
                .build();

        return examResultRepository.save(attempt);
    }

    public long countAttempts(String examCode, Long userId) {
        ExamEntity exam = examRepository.findByExamCode(examCode)
                .orElseThrow(ExamNotFoundException::new);

        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        return examResultRepository.countByExamAndExaminee(exam, user);
    }

    public List<ExamResultEntity> findAllExamResult(String examCode) {
        ExamEntity exam = examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);

        return examResultRepository.findAllByExam(exam);
    }
}