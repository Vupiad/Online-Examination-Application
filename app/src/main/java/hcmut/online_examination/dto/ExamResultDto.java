package hcmut.online_examination.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record ExamResultDto(
        String examName,
        String examCode,
        UserDto examinee, 
        Long timeTaken,       
        BigDecimal score,
        BigDecimal totalScore,
        Instant submittedAt,
        List<ExamineeAnswerDto> detailedQuestions 
) {}