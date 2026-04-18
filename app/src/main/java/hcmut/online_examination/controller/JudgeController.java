package hcmut.online_examination.controller;

import hcmut.online_examination.entity.QuestionEntity;
import hcmut.online_examination.entity.TestCaseEntity;
import hcmut.online_examination.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/judge")
@RequiredArgsConstructor
public class JudgeController {

    private final QuestionRepository questionRepository;

    @PostMapping("/run")
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<Map<String, Object>> runTests(@RequestBody Map<String, Object> request) {
        if (request.get("questionId") == null) {
            throw new RuntimeException("Missing questionId");
        }
        
        Long questionId = Long.valueOf(request.get("questionId").toString());
        String code = request.get("code") != null ? request.get("code").toString() : "";
        
        QuestionEntity question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        List<Map<String, Object>> results = new ArrayList<>();
        
        // Simulating code execution for the demo
        // In a real system, this would call Judge0 or a Docker sandbox
        for (TestCaseEntity tc : question.getTestCases()) {
            boolean passed = false;
            String actualOutput = "Error or No Output";
            
            // Basic simulation: if code contains the expected output as a string (very basic mock)
            // or if it's a known sample question, we simulate success
            if (code.contains(tc.getExpectedOutput()) || code.toLowerCase().contains("return") || code.toLowerCase().contains("print")) {
                passed = true;
                actualOutput = tc.getExpectedOutput();
            }

            results.add(Map.of(
                "input", tc.getInput(),
                "expectedOutput", tc.getExpectedOutput(),
                "actualOutput", actualOutput,
                "passed", passed
            ));
        }

        return results;
    }
}
