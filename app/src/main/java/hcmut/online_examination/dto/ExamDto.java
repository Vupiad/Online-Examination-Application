package hcmut.online_examination.dto;

import java.util.List;

public record ExamDto(
        Long id,
        String examCode,
        String title,
        Long durationInMinutes,
        List<QuestionDto> questions
) {}
