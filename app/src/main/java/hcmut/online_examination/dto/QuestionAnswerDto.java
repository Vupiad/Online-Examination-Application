package hcmut.online_examination.dto;

public record QuestionAnswerDto(
        Long questionId,
        Long selectedOptionId,
        String answerCode,
        String language
) {}
