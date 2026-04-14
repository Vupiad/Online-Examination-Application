package hcmut.online_examination.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record ExamResultDto(
        UserDto examinee, 
        BigDecimal score,
        BigDecimal totalScore,
        Instant submittedAt
) {}