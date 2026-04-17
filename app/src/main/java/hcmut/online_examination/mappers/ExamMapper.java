package hcmut.online_examination.mappers;

import hcmut.online_examination.dto.ExamDto;
import hcmut.online_examination.dto.ExamResultDto;
import hcmut.online_examination.dto.OptionDto;
import hcmut.online_examination.dto.QuestionDto;
import hcmut.online_examination.dto.TestCaseDto;
import hcmut.online_examination.dto.UserDto;
import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.ExamResultEntity;
import hcmut.online_examination.entity.OptionEntity;
import hcmut.online_examination.entity.QuestionEntity;
import hcmut.online_examination.entity.TestCaseEntity;
import hcmut.online_examination.entity.User;

import java.util.stream.Collectors;

public class ExamMapper {

    public static ExamDto toExamDto(ExamEntity entity) {
        if (entity == null) return null;

        return new ExamDto(
                (Long) entity.getId(), 
                entity.getExamCode(),
                entity.getTitle(),
                entity.getDurationInMinutes(),
                entity.getQuestions().stream()
                        .map(ExamMapper::toQuestionDto)
                        .collect(Collectors.toList())
        );
    }

    public static ExamResultDto toExamResultDto(ExamResultEntity entity) {
        if (entity == null) return null;

        return new ExamResultDto(
                toUserDto(entity.getExaminee()),
                entity.getScore(),
                entity.getTotalScore(),
                entity.getSubmittedAt()
        );
    }

    public static QuestionDto toQuestionDto(QuestionEntity entity) {
        if (entity == null) return null;

        return new QuestionDto(
                entity.getId(),
                entity.getQuestion(),
                entity.getScore(),
                entity.getOptions().stream()
                        .map(ExamMapper::toOptionDto)
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

    public static OptionDto toOptionDto(OptionEntity entity) {
        if (entity == null) return null;

        return new OptionDto(
                entity.getId(),
                entity.getContent(),
                entity.getIsCorrect()
        );
    }

    public static UserDto toUserDto(User entity) {
        if (entity == null) return null;

        return new UserDto(
                (Long) entity.getId(),
                null, // email
                entity.getUsername(),
                false 
        );
    }


    public static QuestionEntity toQuestionEntity(QuestionDto dto) {
        if (dto == null) return null;

        QuestionEntity entity = QuestionEntity.builder()
                .question(dto.question())
                .score(dto.score())
                .type(dto.type())
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