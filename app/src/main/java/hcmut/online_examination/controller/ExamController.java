package hcmut.online_examination.controller;

import hcmut.online_examination.dto.DashboardStats;
import hcmut.online_examination.entity.Exam;
import hcmut.online_examination.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @PostMapping("/create")
    public ExamDto createExam(@RequestBody CreateExamRequest request) {
        ExamEntity exam = examService.createExam(
                request.ownerId(),
                request.examCode(),
                request.name(),
                request.durationInMinutes(),
                request.maxAttempts(),
                request.questions(),
                request.startTime(),
                request.endTime()
        );
        return ExamMapper.toExamDto(exam); 
    }

    @PostMapping("/update-passcode")
    public ExamDto updatePasscode(@RequestBody @Valid UpdateExamPasscodeRequest request) {
        ExamEntity exam = examService.setPasscode(
                request.examCode(),
                request.passcode()
        );
        return ExamMapper.toExamDto(exam);
    }

    @PostMapping("/join")
    public ExamDto joinExam(@RequestBody @Valid JoinExamRequest request) {
        ExamEntity exam = examService.joinExam(
                request.examCode(),
                request.userId(),
                request.passcode()
        );
        return ExamMapper.toExamDto(exam);
    }

    @PostMapping("/submit")
    public ExamResultDto submitExam(@RequestBody @Valid SubmitExamRequest request) {
        ExamResultEntity result = examService.submitExam(
                request.examCode(),
                request.examineeId(),
                request.startTime(),
                request.answers()
        );
        return ExamMapper.toExamResultDto(result);
    }

    @GetMapping("/attempt-count")
    public Long countAttempts(
            @RequestParam String examCode,
            @RequestParam Long examineeId
    ) {
        return examService.countAttempts(examCode, examineeId);
    }

    @GetMapping(value = "/results", params = {"examCode", "!userId"})
    public List<ExamResultDto> getExamResults(@RequestParam String examCode) {
        return examService.findAllExamResult(examCode)
                .stream()
                .map(ExamMapper::toExamResultDto)
                .toList(); 
    }

    @GetMapping(value = "/results", params = {"examCode", "userId"})
    public List<ExamResultDto> getExamResultsByUser(
            @RequestParam String examCode,
            @RequestParam Long userId
    ) {
        return examService.findAllExamResultByUser(examCode, userId)
                .stream()
                .map(ExamMapper::toExamResultDto)
                .toList();
    }

    @PostMapping("/correct-answers")
    public List<QuestionWithCorrectAnswersDto> getExamCorrectAnswers(
            @RequestBody @Valid GetExamCorrectAnswersRequest request
    ) {
        return examService.getCorrectOptions(
                request.examCode(),
                request.requestUserId()
        );
    }
}
