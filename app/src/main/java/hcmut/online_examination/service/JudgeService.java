package hcmut.online_examination.service;

import hcmut.online_examination.entity.TestCaseEntity;
import lombok.Builder;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class JudgeService {

    @Getter
    @Builder
    public static class JudgeResult {
        private boolean success;
        private int passedCount;
        private int totalCount;
        private String message;
    }

    public JudgeResult judge(String code, String language, Set<TestCaseEntity> testCases) {
        // In a real application, this would call Judge0 API or a local sandbox (Docker)
        // For demonstration, we simulate success if the code is not empty
        
        if (code == null || code.trim().isEmpty()) {
            return JudgeResult.builder()
                    .success(false)
                    .passedCount(0)
                    .totalCount(testCases.size())
                    .message("No code provided")
                    .build();
        }

        // Simulating judging logic:
        // Pass if testCases exist, otherwise fail
        int total = testCases.size();
        if (total == 0) return JudgeResult.builder().success(true).passedCount(0).totalCount(0).message("No test cases").build();

        // Placeholder for real Judge0 integration:
        // 1. Submit code to Judge0
        // 2. Get tokens
        // 3. Poll for results
        // 4. Compare with expected outputs

        return JudgeResult.builder()
                .success(true)
                .passedCount(total) // Simulate all pass
                .totalCount(total)
                .message("All test cases passed (Simulated)")
                .build();
    }
}
