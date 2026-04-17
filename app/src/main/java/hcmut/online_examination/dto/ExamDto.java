package hcmut.online_examination.dto;

import java.util.List;
import java.time.Instant;

public record ExamDto(
        Long id,  
        String examCode,
        String name,            
        Instant endTime,   
        Instant startTime,       
        Long durationInMinutes,
        List<QuestionDto> questions
) {}