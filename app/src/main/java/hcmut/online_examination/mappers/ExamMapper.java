package hcmut.online_examination.mappers;

import hcmut.online_examination.dto.ExamDto;
import hcmut.online_examination.dto.ExamResultDto;
import hcmut.online_examination.dto.ExamineeAnswerDto;
import hcmut.online_examination.dto.OptionDto;
import hcmut.online_examination.dto.QuestionDto;
import hcmut.online_examination.dto.TeacherExamOverviewDto;
import hcmut.online_examination.dto.UserDto;
import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.ExamResultEntity;
import hcmut.online_examination.entity.ExamineeAnswerEntity;
import hcmut.online_examination.entity.OptionEntity;
import hcmut.online_examination.entity.QuestionEntity;
import hcmut.online_examination.entity.User;

import java.time.Instant;
import java.util.stream.Collectors;

public class ExamMapper {

    public static ExamDto toExamDto(ExamEntity entity) {
        return toExamDto(entity, false);
    }

    public static ExamDto toExamDto(ExamEntity entity, boolean getCorrectAnswer) {
        if (entity == null)
            return null;

        return new ExamDto(
                (Long) entity.getId(),
                entity.getExamCode(),
                entity.getName(),
                entity.getEndTime(),
                entity.getStartTime(),
                entity.getDurationInMinutes(),
                entity.getUpdatedAt(),
                entity.getQuestions().stream()
                        .map(q -> toQuestionDto(q, getCorrectAnswer))
                        .collect(Collectors.toList()));
    }

    public static ExamResultDto toExamResultDto(ExamResultEntity entity) {
        if (entity == null)
            return null;

        return new ExamResultDto(
                entity.getExam() != null ? entity.getExam().getExamCode() : null,
                entity.getExam() != null ? entity.getExam().getName() : null,
                entity.getExam() != null ? entity.getExam().getExamCode() : null,
                toUserDto(entity.getExaminee()),
                entity.getExam() != null ? entity.getExam().getDurationInMinutes() : null,
                entity.getTimeTaken(),
                entity.getScore(),
                entity.getTotalScore(),
                entity.getSubmittedAt(),
                entity.getAnswers().stream()
                        .map(a -> toExamineeAnswerDto(a, true))
                        .collect(Collectors.toList()));
    }

    public static QuestionDto toQuestionDto(QuestionEntity entity, boolean getCorrectAnswer) {
        if (entity == null)
            return null;

        return new QuestionDto(
                entity.getId(),
                entity.getContent(),
                entity.getScore(),
                entity.getOptions().stream()
                        .map(o -> toOptionDto(o, getCorrectAnswer))
                        .collect(Collectors.toList()));
    }

    public static OptionDto toOptionDto(OptionEntity entity, boolean getCorrectAnswer) {
        if (entity == null)
            return null;

        return new OptionDto(
                entity.getId(),
                entity.getContent(),
                getCorrectAnswer ? entity.getIsCorrect() : false);
    }

    public static ExamineeAnswerDto toExamineeAnswerDto(ExamineeAnswerEntity entity, boolean getCorrectAnswer) {
        if (entity == null)
            return null;

        return new ExamineeAnswerDto(
                toQuestionDto(entity.getQuestion(), getCorrectAnswer),
                entity.getOption() != null ? entity.getOption().getId() : null,
                entity.getIsCorrect());
    }

    public static UserDto toUserDto(User entity) {
        if (entity == null)
            return null;

        return new UserDto(
                (Long) entity.getId(),
                null,
                entity.getUsername(),
                false);
    }

    public static QuestionEntity toQuestionEntity(QuestionDto dto) {
        if (dto == null)
            return null;

        return QuestionEntity.builder()
                .content(dto.content())
                .score(dto.score())
                .build();
    }

    public static OptionEntity toOptionEntity(OptionDto dto) {
        if (dto == null)
            return null;

        return OptionEntity.builder()
                .content(dto.content())
                .isCorrect(dto.isCorrect())
                .build();
    }

    public static TeacherExamOverviewDto toTeacherExamOverviewDto(ExamEntity entity) {
        if (entity == null) return null;

        // 🔥 Logic tính toán Status dựa trên thời gian
        String currentStatus = "DRAFT";
        Instant now = Instant.now();

        if (entity.getStartTime() != null && entity.getEndTime() != null) {
            if (now.isBefore(entity.getStartTime())) {
                currentStatus = "UPCOMING"; 
            } else if (now.isAfter(entity.getEndTime())) {
                currentStatus = "CLOSED";   
            } else {
                currentStatus = "OPEN";    
            }
        }

        return new TeacherExamOverviewDto(
                entity.getExamCode(),
                entity.getName(),
                entity.getDurationInMinutes(),
                entity.getStartTime(),
                entity.getEndTime(),
                currentStatus
        );
    }
}