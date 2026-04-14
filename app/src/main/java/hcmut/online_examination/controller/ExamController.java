package hcmut.online_examination.controller;

import hcmut.online_examination.dto.DashboardStats;
import hcmut.online_examination.entity.Exam;
import hcmut.online_examination.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@CrossOrigin
public class ExamController {
    private final ExamService examService;

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(examService.createExam(exam));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(examService.getDashboardStats());
    }
}
