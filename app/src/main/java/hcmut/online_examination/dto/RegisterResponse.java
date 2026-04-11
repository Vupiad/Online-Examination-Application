package hcmut.online_examination.dto;

import hcmut.online_examination.entity.UserRole;

public record RegisterResponse(
        String message,
        String username,
        String fullName,
        UserRole role
) {
}
