package hcmut.online_examination.mappers;

import hcmut.online_examination.dto.ExamDto;
import hcmut.online_examination.dto.ExamResultDto;
import hcmut.online_examination.dto.OptionDto;
import hcmut.online_examination.dto.QuestionDto;
import hcmut.online_examination.dto.UserDto;
import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.ExamResultEntity;
import hcmut.online_examination.entity.OptionEntity;
import hcmut.online_examination.entity.QuestionEntity;
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
                        .collect(Collectors.toList())
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

        return QuestionEntity.builder()
                .question(dto.question())
                .score(dto.score())
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