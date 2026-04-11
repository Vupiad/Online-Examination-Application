package hcmut.online_examination.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import hcmut.online_examination.entity.User;
import hcmut.online_examination.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void registerTeacherCreatesUser() throws Exception {
        String payload = """
                {
                  "username": "teacher",
                  "fullName": "Teacher User",
                  "password": "StrongPass1",
                  "role": "TEACHER"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Registration successful."))
                .andExpect(jsonPath("$.username").value("teacher"))
                .andExpect(jsonPath("$.fullName").value("Teacher User"))
                .andExpect(jsonPath("$.role").value("TEACHER"));

        User savedUser = userRepository.findByUsername("teacher").orElseThrow();
        Assertions.assertThat(savedUser.getFullName()).isEqualTo("Teacher User");
    }

    @Test
    void registerStudentRejectsDuplicateUsername() throws Exception {
        String payload = """
                {
                  "username": "student",
                  "fullName": "Student User",
                  "password": "StrongPass1",
                  "role": "STUDENT"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("Username is already taken"));
    }

    @Test
    void registerRejectsWeakPassword() throws Exception {
        String payload = """
                {
                  "username": "weak",
                  "fullName": "Weak User",
                  "password": "weak",
                  "role": "STUDENT"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").exists());
    }

    @Test
    void loginAcceptsValidCredentialsAndReturnsRole() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "loginuser",
                                  "fullName": "Login User",
                                  "password": "StrongPass1",
                                  "role": "STUDENT"
                                }
                                """))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "loginuser",
                                  "password": "StrongPass1"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login successful"))
                .andExpect(jsonPath("$.role").value("STUDENT"));
    }

    @Test
    void loginReturnsGenericErrorForWrongPassword() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "wrongpassuser",
                                  "fullName": "Wrong Pass User",
                                  "password": "StrongPass1",
                                  "role": "TEACHER"
                                }
                                """))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "wrongpassuser",
                                  "password": "WrongPass1"
                                }
                                """))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Invalid username or password"));
    }
}
