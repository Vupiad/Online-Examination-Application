package hcmut.online_examination.config;

import hcmut.online_examination.entity.*;
import hcmut.online_examination.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ExamRepository examRepository;
    private final ExamResultRepository examResultRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // 1. Seed Users
        if (!userRepository.existsByUsername("studenttest_4")) {
            User teacher = User.builder()
                    .username("studenttest_4")
                    .fullName("Prof. An Nguyen")
                    .email("an.nguyen@hcmut.edu.vn")
                    .passwordHash(passwordEncoder.encode("voleanhnghia1311N@"))
                    .role(UserRole.TEACHER)
                    .build();
            userRepository.save(teacher);
        }

        if (!userRepository.existsByUsername("studenttest_1")) {
            User student1 = User.builder()
                    .username("studenttest_1")
                    .fullName("Le Van Tam")
                    .email("tam.le@hcmut.edu.vn")
                    .className("KMT2021")
                    .passwordHash(passwordEncoder.encode("voleanhnghia1311N@"))
                    .role(UserRole.STUDENT)
                    .build();
            userRepository.save(student1);
        }

        if (!userRepository.existsByUsername("studenttest_2")) {
            User student2 = User.builder()
                    .username("studenttest_2")
                    .fullName("Tran Thi Buoi")
                    .email("buoi.tran@hcmut.edu.vn")
                    .className("KMT2021")
                    .passwordHash(passwordEncoder.encode("voleanhnghia1311N@"))
                    .role(UserRole.STUDENT)
                    .build();
            userRepository.save(student2);
        }

        if (!userRepository.existsByUsername("studenttest_3")) {
            User student3 = User.builder()
                    .username("studenttest_3")
                    .fullName("Nguyen Cong Phuong")
                    .email("phuong.nguyen@hcmut.edu.vn")
                    .className("CNTT2022")
                    .passwordHash(passwordEncoder.encode("voleanhnghia1311N@"))
                    .role(UserRole.STUDENT)
                    .build();
            userRepository.save(student3);
        }

        // 2. Seed Sample Coding Exam
        if (examRepository.findByExamCode("CODE123").isEmpty()) {
            User owner = userRepository.findByUsername("studenttest_4").orElse(null);
            if (owner != null) {
                ExamEntity exam = ExamEntity.builder()
                        .examCode("CODE123")
                        .name("Lập trình Python - Chuyên sâu")
                        .passcode("123456")
                        .durationInMinutes(60L)
                        .maxAttempts(3)
                        .startTime(Instant.now().minus(1, ChronoUnit.DAYS))
                        .endTime(Instant.now().plus(7, ChronoUnit.DAYS))
                        .status(ExamEntity.ExamStatus.OPEN)
                        .owner(owner)
                        .build();

                QuestionEntity q1 = QuestionEntity.builder()
                        .question("Viết hàm sum_array(arr) để tính tổng các phần tử trong một mảng số nguyên.")
                        .type(QuestionType.CODE)
                        .language("Python")
                        .score(BigDecimal.valueOf(10))
                        .starterCode("def sum_array(arr):\n    # Code here\n    pass")
                        .exam(exam)
                        .build();

                q1.addTestCase(TestCaseEntity.builder().input("[1,2,3]").expectedOutput("6").question(q1).build());
                exam.addQuestion(q1);
                examRepository.save(exam);

                // 3. Seed some results for this exam
                User s1 = userRepository.findByUsername("studenttest_1").get();
                User s2 = userRepository.findByUsername("studenttest_2").get();

                examResultRepository.save(ExamResultEntity.builder()
                        .exam(exam).examinee(s1).score(BigDecimal.valueOf(8.5)).violationCount(3)
                        .submittedAt(Instant.now().minus(1, ChronoUnit.HOURS))
                        .timeTaken(3600L) // 1 hour
                        .build());

                examResultRepository.save(ExamResultEntity.builder()
                        .exam(exam).examinee(s2).score(BigDecimal.valueOf(9.0)).violationCount(0)
                        .submittedAt(Instant.now().minus(2, ChronoUnit.HOURS))
                        .timeTaken(3600L) // 1 hour
                        .build());
                
                System.out.println("Seeded example exam CODE123 with test results.");
            }
        }
    }
}
