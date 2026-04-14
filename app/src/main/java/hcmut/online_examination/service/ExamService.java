package hcmut.online_examination.service;

import hcmut.online_examination.dto.DashboardStats;
import hcmut.online_examination.entity.Exam;
import hcmut.online_examination.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;

    public List<Exam> getAllExams() {
        return examRepository.findAllByOrderByCreatedAtDesc();
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    public Exam createExam(Exam exam) {
        if (exam.getQuestions() != null) {
            exam.getQuestions().forEach(question -> {
                question.setExam(exam);
                if (question.getOptions() != null) {
                    question.getOptions().forEach(option -> option.setQuestion(question));
                }
            });
        }
        return examRepository.save(exam);
    }

    public DashboardStats getDashboardStats() {
        long openExams = examRepository.countByStatus(Exam.ExamStatus.OPEN);
        // These would normally be calculated from actual student sessions/results
        // For now, we return mock data based on existing exams
        return DashboardStats.builder()
                .openExamsCount(openExams)
                .studentsTestingCount(458) // Mock
                .completionRateToday(89.0) // Mock
                .build();
    }
}
