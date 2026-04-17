package hcmut.online_examination.dto;

public record QuestionAnswerDto(
        Long questionId,
        Long optionId,
        String answerCode,
        String language
) {}
