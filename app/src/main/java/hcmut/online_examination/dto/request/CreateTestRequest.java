package hcmut.online_examination.dto.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record CreateTestRequest(
    String title,
    Integer durationMinutes,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String passcode,
    List<QuestionDto> questions
) {

    public record QuestionDto(
        String content,
        BigDecimal points,
        List<OptionDto> options
    ) {}

    public record OptionDto(
        String content,
        Boolean isCorrect
    ) {}
}