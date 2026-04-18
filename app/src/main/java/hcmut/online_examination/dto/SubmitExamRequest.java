package hcmut.online_examination.dto;

import java.util.List;
import java.time.Instant;

public record SubmitExamRequest(
        String examCode,
        Instant startTime, 
        Long examineeId,
        List<QuestionAnswerDto> answers,
        Integer violationCount
) {}