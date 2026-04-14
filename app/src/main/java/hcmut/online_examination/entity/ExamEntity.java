package hcmut.online_examination.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(
    name = "exams",
    indexes = {
        @Index(name = "idx_exams_examCode", columnList = "examCode", unique = true),
        @Index(name = "idx_exams_id", columnList = "id", unique = true)
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String examCode;

    private String passcode;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Builder.Default
    private Instant startTime = Instant.now();

    private Instant endTime;

    @Column(nullable = false)
    @Builder.Default
    private Long durationInMinutes = 0L;

    @Column(nullable = false)
    @Builder.Default
    private Integer maxAttempts = 0;

    @ManyToOne
    @JoinColumn(
        name = "owner",
        nullable = false,
        updatable = false
    )
    private User owner;

    @OneToMany(
        mappedBy = "exam",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    @Builder.Default
    private Set<QuestionEntity> questions = new HashSet<>();

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public void addQuestion(QuestionEntity question) {
        this.questions.add(question);
        question.setExam(this); 
    }
}