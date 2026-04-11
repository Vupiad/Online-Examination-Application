package hcmut.online_examination.dto.response;

public record TestSummaryResponse(
    Long testId,
    String title,
    Integer durationMinutes,
    Integer totalQuestions
) {}