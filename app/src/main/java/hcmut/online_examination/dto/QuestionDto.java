package hcmut.online_examination.dto;

import hcmut.online_examination.entity.QuestionType;
import java.math.BigDecimal;
import java.util.List;

public record QuestionDto(
        Long questionId,
        String content,
        BigDecimal score,
        List<OptionDto> options,
        QuestionType type,
        String starterCode,
        String language,
        List<TestCaseDto> testCases,
        
        // Essay fields
        Integer minWords,
        Integer maxWords,
        String sampleAnswer,
        String gradingRubric
) {

    public QuestionDto {
        if (score == null) {
            score = BigDecimal.ONE;
        }
        if (content == null) {
            content = "";
        }
        if (options == null) {
            options = List.of();
        }
        if (type == null) {
            type = QuestionType.MULTIPLE_CHOICE;
        }
        if (testCases == null) {
            testCases = List.of();
        }
    }
}
