package hcmut.online_examination.service;

import hcmut.online_examination.dto.*;
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
    private final NotificationService notificationService;

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

        ExamEntity savedExam = examRepository.save(exam);

        notificationService.notify(
                ownerId,
                "Exam Created",
                "You have successfully created a new exam: " + name + " (" + examCode + ")",
                "SYSTEM"
        );

        return savedExam;
    }

    @Transactional
    public void deleteExam(String examCode, Long ownerId) {
        ExamEntity exam = examRepository.findByExamCode(examCode)
                .orElseThrow(ExamNotFoundException::new);

        if (!exam.getOwner().getId().equals(ownerId)) {
            throw new ForbiddenException("You don't have permission to delete this exam.");
        }

        examRepository.delete(exam);
    }

    @Transactional
    public ExamEntity updateExam(
            Long ownerId,
            String examCode,
            String name,
            Long durationInMinutes,
            Integer maxAttempts,
            List<QuestionDto> questions,
            Instant startTime,
            Instant endTime
    ) {
        ExamEntity exam = examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);

        if (!exam.getOwner().getId().equals(ownerId)) {
            throw new ForbiddenException("You don't have permission to update this exam.");
        }

        exam.setName(name);
        exam.setDurationInMinutes(durationInMinutes);
        exam.setMaxAttempts(maxAttempts != null ? maxAttempts : 1);
        exam.setStartTime(startTime != null ? startTime : Instant.now());
        exam.setEndTime(endTime);

        // Map existing questions for lookup
        Map<Long, QuestionEntity> existingQuestionsMap = exam.getQuestions().stream()
                .filter(q -> q.getId() != null)
                .collect(Collectors.toMap(QuestionEntity::getId, q -> q));

        java.util.Set<Long> updatedQuestionIds = new java.util.HashSet<>();

        for (QuestionDto qDto : questions) {
            QuestionEntity question;
            if (qDto.questionId() != null && existingQuestionsMap.containsKey(qDto.questionId())) {
                // UPDATE EXISTING QUESTION
                question = existingQuestionsMap.get(qDto.questionId());
                updatedQuestionIds.add(question.getId());
                
                question.setQuestion(qDto.content());
                question.setScore(qDto.score());
                question.setType(qDto.type());
                question.setStarterCode(qDto.starterCode());
                question.setLanguage(qDto.language());
                question.setMinWords(qDto.minWords());
                question.setMaxWords(qDto.maxWords());
                question.setSampleAnswer(qDto.sampleAnswer());
                question.setGradingRubric(qDto.gradingRubric());

                // Update Options - manage by ID to prevent FK violations
                Map<Long, OptionEntity> existingOptionsMap = question.getOptions().stream()
                        .filter(o -> o.getId() != null)
                        .collect(Collectors.toMap(OptionEntity::getId, o -> o));
                
                java.util.Set<Long> updatedOptionIds = new java.util.HashSet<>();
                if (qDto.options() != null) {
                    for (OptionDto oDto : qDto.options()) {
                        if (oDto.id() != null && existingOptionsMap.containsKey(oDto.id())) {
                            OptionEntity option = existingOptionsMap.get(oDto.id());
                            option.setContent(oDto.content());
                            option.setIsCorrect(oDto.isCorrect());
                            updatedOptionIds.add(option.getId());
                        } else {
                            question.addOption(ExamMapper.toOptionEntity(oDto));
                        }
                    }
                }
                question.getOptions().removeIf(o -> o.getId() != null && !updatedOptionIds.contains(o.getId()));

                // Update TestCases - manage by ID
                Map<Long, TestCaseEntity> existingTCMap = question.getTestCases().stream()
                        .filter(tc -> tc.getId() != null)
                        .collect(Collectors.toMap(TestCaseEntity::getId, tc -> tc));
                
                java.util.Set<Long> updatedTCIds = new java.util.HashSet<>();
                if (qDto.testCases() != null) {
                    for (TestCaseDto tcDto : qDto.testCases()) {
                        if (tcDto.id() != null && existingTCMap.containsKey(tcDto.id())) {
                            TestCaseEntity tc = existingTCMap.get(tcDto.id());
                            tc.setInput(tcDto.input());
                            tc.setExpectedOutput(tcDto.expectedOutput());
                            tc.setHidden(tcDto.isHidden());
                            updatedTCIds.add(tc.getId());
                        } else {
                            question.addTestCase(ExamMapper.toTestCaseEntity(tcDto));
                        }
                    }
                }
                question.getTestCases().removeIf(tc -> tc.getId() != null && !updatedTCIds.contains(tc.getId()));
            } else {
                // CREATE NEW QUESTION
                question = ExamMapper.toQuestionEntity(qDto);
                if (qDto.options() != null) {
                    qDto.options().forEach(oDto -> question.addOption(ExamMapper.toOptionEntity(oDto)));
                }
                if (qDto.testCases() != null) {
                    qDto.testCases().forEach(tcDto -> question.addTestCase(ExamMapper.toTestCaseEntity(tcDto)));
                }
                exam.addQuestion(question);
            }
        }

        // REMOVE QUESTIONS NOT IN THE NEW LIST
        exam.getQuestions().removeIf(q -> q.getId() != null && !updatedQuestionIds.contains(q.getId()));

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
            List<QuestionAnswerDto> answers,
            Integer violationCount
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
        BigDecimal totalScore = exam.getQuestions().stream()
                .map(QuestionEntity::getScore)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        List<ExamineeAnswerEntity> studentAnswers = new ArrayList<>();

        Map<Long, List<QuestionAnswerDto>> groupedAnswers = answers.stream()
                .collect(Collectors.groupingBy(QuestionAnswerDto::questionId));

        for (Map.Entry<Long, List<QuestionAnswerDto>> entry : groupedAnswers.entrySet()) {
            QuestionEntity question = questionMap.get(entry.getKey());
            if (question == null) continue;

            List<QuestionAnswerDto> groupedList = entry.getValue();

            if (question.getType() == QuestionType.CODE) {
                QuestionAnswerDto answer = groupedList.get(0);
                ExamineeAnswerEntity studentAnswer = ExamineeAnswerEntity.builder()
                        .question(question).content(answer.content()).build();

                JudgeService.JudgeResult judgeResult = judgeService.judge(answer.content(), question.getLanguage(), question.getTestCases());
                if (judgeResult.isSuccess() && judgeResult.getTotalCount() > 0) {
                    BigDecimal ratio = BigDecimal.valueOf(judgeResult.getPassedCount())
                            .divide(BigDecimal.valueOf(judgeResult.getTotalCount()), 2, RoundingMode.HALF_UP);
                    score = score.add(question.getScore().multiply(ratio));
                    studentAnswer.setIsCorrect(judgeResult.getPassedCount() == judgeResult.getTotalCount());
                }
                studentAnswers.add(studentAnswer);
            } else if (question.getType() == QuestionType.ESSAY) {
                QuestionAnswerDto answer = groupedList.get(0);
                ExamineeAnswerEntity studentAnswer = ExamineeAnswerEntity.builder()
                        .question(question).content(answer.content()).build();
                studentAnswers.add(studentAnswer);
            } else {
                java.util.Set<Long> correctOptionIds = question.getOptions().stream()
                        .filter(OptionEntity::getIsCorrect)
                        .map(OptionEntity::getId)
                        .collect(Collectors.toSet());

                java.util.Set<Long> selectedIds = groupedList.stream()
                        .filter(a -> a.selectedOptionId() != null)
                        .map(QuestionAnswerDto::selectedOptionId)
                        .collect(Collectors.toSet());

                boolean isFullyCorrect = correctOptionIds.equals(selectedIds);
                if (isFullyCorrect && !correctOptionIds.isEmpty()) {
                    score = score.add(question.getScore());
                }

                for (QuestionAnswerDto answer : groupedList) {
                    if (answer.selectedOptionId() != null) {
                        OptionEntity selectedOption = question.getOptions().stream()
                                .filter(o -> o.getId().equals(answer.selectedOptionId()))
                                .findFirst()
                                .orElse(null);

                        if (selectedOption != null) {
                            ExamineeAnswerEntity studentAnswer = ExamineeAnswerEntity.builder()
                                    .question(question)
                                    .option(selectedOption)
                                    .isCorrect(selectedOption.getIsCorrect())
                                    .build();
                            studentAnswers.add(studentAnswer);
                        }
                    }
                }
            }
        }

        Instant submissionTime = Instant.now();
        long timeTakenSeconds = (startTime != null) ? Duration.between(startTime, submissionTime).getSeconds() : 0;

        ExamResultEntity result = ExamResultEntity.builder()
                .score(score)
                .totalScore(totalScore)
                .submittedAt(submissionTime)
                .timeTaken(timeTakenSeconds)
                .violationCount(violationCount != null ? violationCount : 0)
                .exam(exam)
                .examinee(examinee)
                .build();

        for (ExamineeAnswerEntity sa : studentAnswers) {
            result.addAnswer(sa);
        }

        ExamResultEntity savedResult = examResultRepository.save(result);

        // Notify Student
        notificationService.notify(
                examineeId,
                "Exam Submitted",
                "You have successfully submitted the exam: " + exam.getName() + " with a score of " + score + "/" + totalScore + ".",
                "SYSTEM"
        );

        // Notify Teacher
        notificationService.notify(
                exam.getOwner().getId(),
                "New Submission",
                examinee.getFullName() + " has submitted the exam: " + exam.getName() + " (" + score + "/" + totalScore + ").",
                "SYSTEM"
        );

        return savedResult;
    }

    @Transactional
    public ExamResultEntity updateResultScore(Long resultId, BigDecimal newScore, String comment) {
        ExamResultEntity result = examResultRepository.findById(resultId)
                .orElseThrow(() -> new ExamNotFoundException()); // Or a more specific exception
        
        result.setScore(newScore);
        // We could also add a comment field to ExamResultEntity if desired
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

    public List<ExamResultEntity> findAllResultsByExaminee(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        return examResultRepository.findAllByExamineeOrderBySubmittedAtDesc(user);
    }

    public List<QuestionWithCorrectAnswersDto> getCorrectOptions(String examCode, Long requestUserId) {
        ExamEntity exam = examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);

        boolean isOwner = exam.getOwner().getId().equals(requestUserId);
        
        // If not owner, check if the user has submitted this exam
        if (!isOwner) {
            User user = userRepository.findById(requestUserId)
                    .orElseThrow(UserNotFoundException::new);
            long attempts = examResultRepository.countByExamAndExaminee(exam, user);
            if (attempts == 0) {
                throw new ForbiddenException("You must submit the exam before viewing correct answers.");
            }
        }

        return exam.getQuestions().stream()
                .map(question -> {
                    List<Long> correctOptionIds = question.getOptions().stream()
                            .filter(OptionEntity::getIsCorrect)
                            .map(OptionEntity::getId)
                            .collect(Collectors.toList());

                    List<OptionDto> options = question.getOptions().stream()
                            .map(opt -> new OptionDto(opt.getId(), opt.getContent(), opt.getIsCorrect()))
                            .collect(Collectors.toList());

                    return new QuestionWithCorrectAnswersDto(
                            question.getId(),
                            question.getQuestion(),
                            question.getType(),
                            options,
                            correctOptionIds,
                            question.getSampleAnswer(),
                            question.getGradingRubric()
                    );
                })
                .collect(Collectors.toList());
    }

    public List<ExamEntity> getAllExams() {
        return examRepository.findAllByOrderByCreatedAtDesc();
    }

    public ExamEntity findFullExamByCode(String examCode) {
        return examRepository.findFullExam(examCode)
                .orElseThrow(ExamNotFoundException::new);
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