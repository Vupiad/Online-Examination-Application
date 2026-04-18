package hcmut.online_examination.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateExamPasscodeRequest(
        @NotBlank(message = "exam code must not be blank")
        String examCode,

        @NotBlank(message = "passcode must not be blank")
        String passcode
) {}