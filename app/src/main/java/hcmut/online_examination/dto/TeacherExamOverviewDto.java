package hcmut.online_examination.dto;

import java.time.Instant;

public record TeacherExamOverviewDto(
        String examCode,
        String name,
        Long durationInMinutes,
        Instant startTime,
        Instant endTime,
        String status 
) {}