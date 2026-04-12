package hcmut.online_examination.dto;

import java.time.Instant;
import java.util.List;

public record CreateExamRequest(
        Long ownerId,
        String examCode,
        String name,
        List<QuestionDto> questions,
        Long durationInMinutes,
        Instant startTime,
        Instant endTime,
        Integer maxAttempts
) {
    public CreateExamRequest {
        if (maxAttempts == null) {
            maxAttempts = 0;
        }
    }
}
