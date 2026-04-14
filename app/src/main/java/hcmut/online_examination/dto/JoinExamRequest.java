package hcmut.online_examination.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record JoinExamRequest(
        @NotNull(message = "user id is required")
        Long userId,

        @NotBlank(message = "exam code must not be blank")
        String examCode,

        @NotBlank(message = "passcode must not be blank")
        String passcode
) {}
