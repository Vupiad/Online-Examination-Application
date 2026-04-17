package hcmut.online_examination.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GetExamCorrectAnswersRequest(
        @NotBlank(message = "exam code must not be blank")
        String examCode,

        @NotNull(message = "request user id is required")
        Long requestUserId 
) {}