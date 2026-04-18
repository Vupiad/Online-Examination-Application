package hcmut.online_examination.dto;

import hcmut.online_examination.entity.UserRole;

public record UserDto(
        Long id,
        String fullName,
        String username,
        String email,
        String className,
        UserRole role,
        boolean isTeacher
) {}