package hcmut.online_examination.controller;

import hcmut.online_examination.dto.CreateExamRequest;
import hcmut.online_examination.dto.ExamDto;
import hcmut.online_examination.dto.ExamResultDto;
import hcmut.online_examination.dto.JoinExamRequest;
import hcmut.online_examination.dto.SubmitExamRequest;
import hcmut.online_examination.dto.TeacherExamOverviewDto;
import hcmut.online_examination.dto.UpdateExamPasscodeRequest;
import hcmut.online_examination.dto.GetExamCorrectAnswersRequest;
import hcmut.online_examination.dto.QuestionWithCorrectAnswersDto;
import hcmut.online_examination.mappers.ExamMapper;
import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.ExamResultEntity;
import hcmut.online_examination.service.ExamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
public class ExamController {

        private final ExamService examService;

        @GetMapping("/owner/{ownerId}")
        public List<ExamDto> getExamsByOwner(@PathVariable Long ownerId) {
                return examService.findExamsByOwner(ownerId)
                                .stream()
                                .map(ExamMapper::toExamDto)
                                .toList();
        }

        @GetMapping("/info/{examCode}")
        public ExamDto getExamInfo(@PathVariable String examCode) {
                // Returns exam info without correct answers
                return ExamMapper.toExamDto(examService.getExamByCode(examCode), false);
        }

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
                                request.endTime());
                return ExamMapper.toExamDto(exam);
        }

        @PostMapping("/update-passcode")
        public ExamDto updatePasscode(@RequestBody @Valid UpdateExamPasscodeRequest request) {
                ExamEntity exam = examService.setPasscode(
                                request.examCode(),
                                request.passcode());
                return ExamMapper.toExamDto(exam);
        }

        @PostMapping("/join")
        public ExamDto joinExam(@RequestBody @Valid JoinExamRequest request) {
                ExamEntity exam = examService.joinExam(
                                request.examCode(),
                                request.userId(),
                                request.passcode());
                return ExamMapper.toExamDto(exam);
        }

        @PostMapping("/submit")
        public ExamResultDto submitExam(@RequestBody @Valid SubmitExamRequest request) {
                ExamResultEntity result = examService.submitExam(
                                request.examCode(),
                                request.examineeId(),
                                request.startTime(),
                                request.answers());
                return ExamMapper.toExamResultDto(result);
        }

        @GetMapping("/attempt-count")
        public Long countAttempts(
                        @RequestParam String examCode,
                        @RequestParam Long examineeId) {
                return examService.countAttempts(examCode, examineeId);
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

    @GetMapping("/history")
    public List<ExamResultDto> getExamHistory(@RequestParam Long userId) {
        return examService.getExamHistoryByUser(userId)
                .stream()
                .map(ExamMapper::toExamResultDto) 
                .toList();
    }

    @GetMapping("/teacher/list")
    public List<TeacherExamOverviewDto> getExamsByTeacher(@RequestParam Long teacherId) {
        return examService.getExamsCreatedByTeacher(teacherId);
    }
        @GetMapping(value = "/results", params = { "examCode", "!userId" })
        public List<ExamResultDto> getExamResults(@RequestParam String examCode) {
                return examService.findAllExamResult(examCode)
                                .stream()
                                .map(ExamMapper::toExamResultDto)
                                .toList();
        }

        @GetMapping(value = "/results", params = { "examCode", "userId" })
        public List<ExamResultDto> getExamResultsByUser(
                        @RequestParam String examCode,
                        @RequestParam Long userId) {
                return examService.findAllExamResultByUser(examCode, userId)
                                .stream()
                                .map(ExamMapper::toExamResultDto)
                                .toList();
        }

}