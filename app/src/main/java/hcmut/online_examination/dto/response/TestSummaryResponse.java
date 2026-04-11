package hcmut.online_examination.dto.response;

import java.time.LocalDateTime;

public record TestSummaryResponse(
    String testId,
    String title,
    Integer durationMinutes,
    String status,
    Integer questionCount,
    LocalDateTime createdAt
) {}