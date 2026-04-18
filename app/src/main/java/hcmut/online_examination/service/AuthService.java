package hcmut.online_examination.service;

import hcmut.online_examination.dto.AuthResponse;
import hcmut.online_examination.dto.LoginRequest;
import hcmut.online_examination.dto.RegisterRequest;
import hcmut.online_examination.dto.RegisterResponse;
import hcmut.online_examination.entity.User;
import hcmut.online_examination.exception.DuplicateEmailException;
import hcmut.online_examination.exception.InvalidCredentialsException;
import hcmut.online_examination.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final String INVALID_CREDENTIALS_MESSAGE = "Invalid username or password";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        String username = request.username();
        if (userRepository.existsByUsername(username)) {
            throw new DuplicateEmailException("Username is already taken");
        }

        User user = new User();
        user.setUsername(username);
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setClassName(request.className());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(request.role());
        User savedUser = userRepository.save(user);

        return new RegisterResponse("Registration successful.", savedUser.getId(), savedUser.getUsername(), savedUser.getFullName(), savedUser.getRole());
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException(INVALID_CREDENTIALS_MESSAGE);
        }

        return new AuthResponse("Login successful", user.getId(), user.getUsername(), user.getFullName(), user.getRole());
    }

    @Transactional
    public void resetPassword(hcmut.online_examination.dto.ForgotPasswordRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new hcmut.online_examination.exception.UserNotFoundException());

        if (!user.getEmail().equalsIgnoreCase(request.email())) {
            throw new InvalidCredentialsException("Email does not match our records for this username.");
        }

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }
}
