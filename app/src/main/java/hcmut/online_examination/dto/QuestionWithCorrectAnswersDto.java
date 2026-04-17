package hcmut.online_examination.dto;

public record QuestionWithCorrectAnswersDto(
        Long questionId,
        Long correctAnswers 
) {}