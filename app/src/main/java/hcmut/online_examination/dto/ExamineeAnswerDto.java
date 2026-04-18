package hcmut.online_examination.dto;

public record ExamineeAnswerDto(
        QuestionDto question,
        Long userAnswerId,
        String content, // For ESSAY/CODE answers
        Boolean isCorrect
) {}