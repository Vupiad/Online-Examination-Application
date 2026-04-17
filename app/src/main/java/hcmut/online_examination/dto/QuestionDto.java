package hcmut.online_examination.dto;

import hcmut.online_examination.entity.QuestionType;
import java.math.BigDecimal;
import java.util.List;

public record QuestionDto(
        Long questionId,
        String question,
        BigDecimal score,
        List<OptionDto> options,
        QuestionType type,
        String starterCode,
        List<TestCaseDto> testCases
) {

    public QuestionDto {
        if (score == null) {
            score = BigDecimal.ZERO;
        }
        if (options == null) {
            options = List.of();
        }
        if (type == null) {
            type = QuestionType.MULTIPLE_CHOICE;
        }
    }
}
