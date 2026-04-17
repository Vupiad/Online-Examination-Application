package hcmut.online_examination.mappers;

import hcmut.online_examination.dto.*;
import hcmut.online_examination.entity.*;
import java.math.BigDecimal;
import java.util.stream.Collectors;

public class ExamMapper {

    public static ExamDto toExamDto(ExamEntity entity) {
        return toExamDto(entity, false);
    }

    public static ExamDto toExamDto(ExamEntity entity, boolean getCorrectAnswer) {
        if (entity == null) return null;

        return new ExamDto(
                entity.getId(),
                entity.getExamCode(),
                entity.getName(),
                entity.getStartTime(),
                entity.getEndTime(),
                entity.getDurationInMinutes(),
                entity.getQuestions().stream()
                        .map(q -> toQuestionDto(q, getCorrectAnswer))
                        .collect(Collectors.toList())
        );
    }

    public static ExamResultDto toExamResultDto(ExamResultEntity entity) {
        if (entity == null) return null;

        return new ExamResultDto(
                entity.getExam() != null ? entity.getExam().getName() : null,
                toUserDto(entity.getExaminee()),
                entity.getTimeTaken(),
                entity.getScore(),
                entity.getTotalScore(),
                entity.getSubmittedAt(),
                entity.getAnswers().stream()
                        .map(a -> toExamineeAnswerDto(a, true))
                        .collect(Collectors.toList())
        );
    }

    public static QuestionDto toQuestionDto(QuestionEntity entity, boolean getCorrectAnswer) {
        if (entity == null) return null;

        return new QuestionDto(
                entity.getId(),
                entity.getQuestion(),
                entity.getScore(),
                entity.getOptions().stream()
                        .map(o -> toOptionDto(o, getCorrectAnswer))
                        .collect(Collectors.toList()),
                entity.getType(),
                entity.getStarterCode(),
                entity.getTestCases().stream()
                        .map(ExamMapper::toTestCaseDto)
                        .collect(Collectors.toList())
        );
    }

    public static TestCaseDto toTestCaseDto(TestCaseEntity entity) {
        if (entity == null) return null;

        return new TestCaseDto(
                entity.getId(),
                entity.getInput(),
                entity.getExpectedOutput(),
                entity.isHidden()
        );
    }

    public static OptionDto toOptionDto(OptionEntity entity, boolean getCorrectAnswer) {
        if (entity == null) return null;

        return new OptionDto(
                entity.getId(),
                entity.getContent(),
                getCorrectAnswer ? entity.getIsCorrect() : false
        );
    }

    public static ExamineeAnswerDto toExamineeAnswerDto(ExamineeAnswerEntity entity, boolean getCorrectAnswer) {
        if (entity == null) return null;

        return new ExamineeAnswerDto(
                toQuestionDto(entity.getQuestion(), getCorrectAnswer),
                entity.getOption() != null ? entity.getOption().getId() : null,
                entity.getIsCorrect()
        );
    }

    public static UserDto toUserDto(User entity) {
        if (entity == null) return null;

        return new UserDto(
                entity.getId(),
                null,
                entity.getUsername(),
                false
        );
    }

    public static QuestionEntity toQuestionEntity(QuestionDto dto) {
        if (dto == null) return null;

        BigDecimal score = dto.score() != null ? dto.score() : BigDecimal.ONE;
        QuestionType type = dto.type() != null ? dto.type() : QuestionType.SINGLE_CHOICE;

        QuestionEntity entity = QuestionEntity.builder()
                .question(dto.content())
                .score(score)
                .type(type)
                .starterCode(dto.starterCode())
                .build();

        if (dto.testCases() != null) {
            dto.testCases().forEach(tc -> entity.addTestCase(toTestCaseEntity(tc)));
        }

        return entity;
    }

    public static TestCaseEntity toTestCaseEntity(TestCaseDto dto) {
        if (dto == null) return null;

        return TestCaseEntity.builder()
                .input(dto.input())
                .expectedOutput(dto.expectedOutput())
                .isHidden(dto.isHidden())
                .build();
    }

    public static OptionEntity toOptionEntity(OptionDto dto) {
        if (dto == null) return null;

        return OptionEntity.builder()
                .content(dto.content())
                .isCorrect(dto.isCorrect())
                .build();
    }
}