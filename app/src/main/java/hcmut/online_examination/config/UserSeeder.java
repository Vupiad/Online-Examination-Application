package hcmut.online_examination.config;

import hcmut.online_examination.entity.User;
import hcmut.online_examination.entity.UserRole;
import hcmut.online_examination.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createIfNotExist("studenttest_4", "voleanhnghia1311N@", "Teacher Test", UserRole.TEACHER);
        createIfNotExist("studenttest_1", "voleanhnghia1311N@", "Student Test", UserRole.STUDENT);
    }

    private void createIfNotExist(String username, String password, String fullName, UserRole role) {
        if (!userRepository.existsByUsername(username)) {
            User user = User.builder()
                    .username(username)
                    .fullName(fullName)
                    .passwordHash(passwordEncoder.encode(password))
                    .role(role)
                    .build();
            userRepository.save(user);
            System.out.println("Seeded user: " + username + " with role: " + role);
        }
    }
}
