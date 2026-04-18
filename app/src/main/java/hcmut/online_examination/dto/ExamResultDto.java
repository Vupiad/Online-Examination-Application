package hcmut.online_examination.dto;

import java.util.List;
import java.math.BigDecimal;
import java.time.Instant;

public record ExamResultDto(
        Long id,
        String examName,
        String examCode,
        UserDto examinee,
        Long timeTaken,
        BigDecimal score,
        BigDecimal totalScore,
        Instant submittedAt,
        List<ExamineeAnswerDto> answers,
        Integer violationCount
) {}