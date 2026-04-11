package hcmut.online_examination.dto.request;

import java.time.LocalDateTime;
import java.util.List;

public record CreateTestRequest(
    String title,
    Integer durationMinutes,
    LocalDateTime startTime,
    LocalDateTime endTime,
    String status,
    List<QuestionDto> questions
) {
    public record QuestionDto(
        Integer orderIndex,
        String questionType,
        String content,
        String essaySuggestion,
        List<OptionDto> options
    ) {}

    public record OptionDto(
        String content,
        Boolean isCorrect
    ) {}
}

