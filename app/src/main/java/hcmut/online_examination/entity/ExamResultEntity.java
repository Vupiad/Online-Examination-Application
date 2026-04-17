package hcmut.online_examination.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "test_results") 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal score = BigDecimal.ZERO;

    @Column(nullable = false, precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal totalScore = BigDecimal.ZERO;

    @Column(nullable = false)
    @Builder.Default
    private Instant submittedAt = Instant.now();

    @Column(nullable = false)
    @Builder.Default
    private Long timeTaken = 0L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "examinee_id", nullable = false)
    private User examinee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private ExamEntity exam;

    @OneToMany(
        mappedBy = "result",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    @Builder.Default
    private List<ExamineeAnswerEntity> answers = new ArrayList<>();

    public void addAnswer(ExamineeAnswerEntity answer) {
        this.answers.add(answer);
        answer.setResult(this);
    }
}