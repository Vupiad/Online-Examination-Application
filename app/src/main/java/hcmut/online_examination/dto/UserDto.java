package hcmut.online_examination.dto;


public record UserDto(
        Long id, 
        String email,
        String username,
        Boolean hasVerifiedEmail
) {}