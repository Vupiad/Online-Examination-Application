package hcmut.online_examination.dto;

import java.math.BigDecimal;
import java.util.List;

public record QuestionDto(
        Long questionId,
        String question,
        BigDecimal score,
        List<OptionDto> options
) {

    public QuestionDto {
        if (score == null) {
            score = BigDecimal.ZERO;
        }
        if (options == null) {
            options = List.of();
        }
    }
}
