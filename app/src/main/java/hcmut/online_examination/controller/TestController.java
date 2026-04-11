package hcmut.online_examination.controller;

import hcmut.online_examination.dto.request.CreateTestRequest;
import hcmut.online_examination.dto.response.TestSummaryResponse;
import hcmut.online_examination.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tests")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping
    public ResponseEntity<?> createTest(@RequestBody CreateTestRequest request) {
        String currentInstructorId = "GV001"; 

        var savedTest = testService.createTest(currentInstructorId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTest);
    }

    @GetMapping
    public ResponseEntity<Page<TestSummaryResponse>> getTests(
            @RequestParam(required = false) String instructorId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String status) {

        String targetInstructorId = (instructorId != null) ? instructorId : "GV001"; // Mock ID

        var pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        
        Page<TestSummaryResponse> response = testService.getTestsByInstructor(targetInstructorId, status, pageable);
        
        return ResponseEntity.ok(response);
    }
}