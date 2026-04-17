package hcmut.online_examination.service;

import hcmut.online_examination.dto.OptionDto;
import hcmut.online_examination.dto.QuestionAnswerDto;
import hcmut.online_examination.dto.QuestionDto;
import hcmut.online_examination.dto.QuestionWithCorrectAnswersDto;
import hcmut.online_examination.entity.*;
import hcmut.online_examination.exception.*;
import hcmut.online_examination.mappers.ExamMapper;
import hcmut.online_examination.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
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
    private final JudgeService judgeService;

    @Transactional
    public ExamEntity setPasscode(String examCode, String passcode) {
        ExamEntity exam = examRepository.findByExamCode(examCode)
                .orElseThrow(ExamNotFoundException::new);

        exam.setPasscode(passcode);
        return exam;
    }

    @Transactional
    public ExamEntity createExam(
            Long ownerId,
            String examCode,
            String name,
            Long durationInMinutes,
            Integer maxAttempts,
            List<QuestionDto> questions,
            Instant startTime,
            Instant endTime
    ) {
        User user = userRepository.findById(ownerId)
                .orElseThrow(UserNotFoundException::new);

        if (examRepository.existsByExamCodeAndOwner(examCode, user)) {
            throw new DuplicateExamCodeException();
        }

        ExamEntity exam = ExamEntity.builder()
                .name(name)
                .maxAttempts(maxAttempts != null ? maxAttempts : 1)
                .startTime(startTime != null ? startTime : Instant.now())
                .endTime(endTime)
                .durationInMinutes(durationInMinutes)
                .owner(user)
                .examCode(examCode)
                .status(ExamEntity.ExamStatus.OPEN)
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
            Long examineeId,
            Instant startTime,
            List<QuestionAnswerDto> answers
    ) {
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
        List<ExamineeAnswerEntity> studentAnswers = new ArrayList<>();

        for (QuestionAnswerDto answer : answers) {
            QuestionEntity question = questionMap.get(answer.questionId());
            if (question == null) continue; // Skip invalid questions

            ExamineeAnswerEntity studentAnswer = ExamineeAnswerEntity.builder()
                    .question(question)
                    .build();

            if (question.getType() == QuestionType.CODING) {
                // Future implementation: Coding judge
                totalScore = totalScore.add(question.getScore());
            } else {
                if (answer.selectedOptionId() != null) {
                    OptionEntity selectedOption = question.getOptions().stream()
                            .filter(o -> o.getId().equals(answer.selectedOptionId()))
                            .findFirst()
                            .orElse(null);

                    if (selectedOption != null) {
                        studentAnswer.setOption(selectedOption);
                        if (selectedOption.getIsCorrect()) {
                            studentAnswer.setIsCorrect(true);
                            score = score.add(question.getScore());
                        }
                    }
                }
                totalScore = totalScore.add(question.getScore());
            }
            studentAnswers.add(studentAnswer);
        }

        Instant submissionTime = Instant.now();
        long timeTakenSeconds = (startTime != null) ? Duration.between(startTime, submissionTime).getSeconds() : 0;

        ExamResultEntity result = ExamResultEntity.builder()
                .score(score)
                .totalScore(totalScore)
                .submittedAt(submissionTime)
                .timeTaken(timeTakenSeconds)
                .exam(exam)
                .examinee(examinee)
                .build();

        for (ExamineeAnswerEntity sa : studentAnswers) {
            result.addAnswer(sa);
        }

        return examResultRepository.save(result);
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

    public List<ExamResultEntity> findAllExamResultByUser(String examCode, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        ExamEntity exam = examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);

        return examResultRepository.findAllByExam(exam).stream()
                .filter(result -> result.getExaminee().getId().equals(user.getId()))
                .collect(Collectors.toList());
    }

    public List<QuestionWithCorrectAnswersDto> getCorrectOptions(String examCode, Long ownerId) {
        ExamEntity exam = examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);

        if (!exam.getOwner().getId().equals(ownerId)) {
            throw new ForbiddenException("Only owner of the exam can get the correct options.");
        }

        return exam.getQuestions().stream()
                .map(question -> {
                    Long correctOptionId = question.getOptions().stream()
                            .filter(OptionEntity::getIsCorrect)
                            .map(OptionEntity::getId)
                            .findFirst()
                            .orElse(null);

                    return new QuestionWithCorrectAnswersDto(question.getId(), correctOptionId);
                })
                .collect(Collectors.toList());
    }

    public List<ExamEntity> getAllExams() {
        return examRepository.findAllByOrderByCreatedAtDesc();
    }

    public Map<String, Object> getStats() {
        long openCount = examRepository.countByStatus(ExamEntity.ExamStatus.OPEN);
        return Map.of(
            "openExamsCount", openCount,
            "studentsTestingCount", 0, 
            "completionRateToday", 0
        );
    }
}