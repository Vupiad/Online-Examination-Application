package hcmut.online_examination.dto;

public record QuestionAnswerDto(
        Long questionId,
        Long selectedOptionId,
        String content, // Used for CODE or ESSAY content
        String language
) {}
