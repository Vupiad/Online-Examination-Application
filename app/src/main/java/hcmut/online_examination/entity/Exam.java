package hcmut.online_examination.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer durationInMinutes;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String passcode;

    @Enumerated(EnumType.STRING)
    private ExamStatus status; // OPEN, CLOSED, DRAFT

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<Question> questions = new ArrayList<>();

    private LocalDateTime createdAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User creator;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = ExamStatus.DRAFT;
    }

    public void addQuestion(Question question) {
        questions.add(question);
        question.setExam(this);
    }

    public enum ExamStatus {
        OPEN, CLOSED, DRAFT
    }
}
