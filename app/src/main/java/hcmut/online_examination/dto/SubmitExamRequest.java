package hcmut.online_examination.dto;

import java.time.Instant;
import java.util.List;

public record SubmitExamRequest(
        String examCode,
        Instant startTime,
        Long examineeId,
        List<QuestionAnswerDto> answers
) {}
