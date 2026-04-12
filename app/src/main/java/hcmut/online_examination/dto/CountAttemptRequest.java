package hcmut.online_examination.dto;

public record CountAttemptRequest(
        String examCode,
        Long examineeId
) {}
