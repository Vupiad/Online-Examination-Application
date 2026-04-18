package hcmut.online_examination.controller;

import hcmut.online_examination.dto.CreateExamRequest;
import hcmut.online_examination.dto.ExamDto;
import hcmut.online_examination.dto.ExamResultDto;
import hcmut.online_examination.dto.GetExamCorrectAnswersRequest;
import hcmut.online_examination.dto.JoinExamRequest;
import hcmut.online_examination.dto.QuestionWithCorrectAnswersDto;
import hcmut.online_examination.dto.SubmitExamRequest;
import hcmut.online_examination.dto.UpdateExamPasscodeRequest;
import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.ExamResultEntity;
import hcmut.online_examination.mappers.ExamMapper;
import hcmut.online_examination.service.ExamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
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

    @PutMapping("/update")
    public ExamDto updateExam(@RequestBody CreateExamRequest request) {
        ExamEntity exam = examService.updateExam(
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

    @DeleteMapping("/delete")
    public void deleteExam(@RequestParam String examCode, @RequestParam Long ownerId) {
        examService.deleteExam(examCode, ownerId);
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
                request.answers(),
                request.violationCount()
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

    @GetMapping("/results/user/{userId}")
    public List<ExamResultDto> getAllResultsForUser(@PathVariable Long userId) {
        return examService.findAllResultsByExaminee(userId)
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

    @GetMapping
    public List<ExamDto> getAllExams() {
        return examService.getAllExams().stream()
                .map(ExamMapper::toExamDto)
                .toList();
    }

    @GetMapping("/{examCode}")
    public ExamDto getExam(@PathVariable String examCode) {
        ExamEntity exam = examService.findFullExamByCode(examCode);
        return ExamMapper.toExamDto(exam);
    }

    @GetMapping("/teacher/{examCode}")
    public ExamDto getExamForTeacher(@PathVariable String examCode, @RequestParam Long ownerId) {
        ExamEntity exam = examService.findFullExamByCode(examCode);
        if (!exam.getOwner().getId().equals(ownerId)) {
            throw new hcmut.online_examination.exception.ForbiddenException("Don't have permission to retrieve full exam data.");
        }
        return ExamMapper.toExamDto(exam, true);
    }

    @GetMapping("/stats")
    public java.util.Map<String, Object> getStats() {
        return examService.getStats();
    }

    @PutMapping("/results/{resultId}/score")
    public ExamResultDto updateScore(
            @PathVariable Long resultId,
            @RequestParam BigDecimal newScore,
            @RequestParam(required = false) String comment
    ) {
        ExamResultEntity result = examService.updateResultScore(resultId, newScore, comment);
        return ExamMapper.toExamResultDto(result);
    }
}