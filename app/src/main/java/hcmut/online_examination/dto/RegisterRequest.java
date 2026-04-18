package hcmut.online_examination.dto;

import hcmut.online_examination.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record RegisterRequest(
        @NotBlank
        String username,

        @NotBlank
        String fullName,

        @NotBlank
        @Email
        String email,

        String className, // Optional for teachers, required for students logic can be in service

        @NotBlank
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
                message = "Password must be at least 8 characters and include uppercase, lowercase, and a number"
        )
        String password,

        @NotNull
        UserRole role
) {
}
