package hcmut.online_examination.dto;

import java.util.List;
import hcmut.online_examination.entity.QuestionType;

public record QuestionWithCorrectAnswersDto(
        Long id,
        String content,
        QuestionType type,
        List<OptionDto> options,
        List<Long> correctOptionIds,
        String sampleAnswer,
        String gradingRubric
) {}