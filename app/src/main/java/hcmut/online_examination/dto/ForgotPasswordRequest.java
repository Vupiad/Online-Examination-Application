package hcmut.online_examination.dto;

public record ForgotPasswordRequest(
    String username,
    String email,
    String newPassword
) {}
