package hcmut.online_examination.dto;

public record ExamineeAnswerDto(
        QuestionDto question,
        Long userAnswerId,
        Boolean isCorrect
) {}