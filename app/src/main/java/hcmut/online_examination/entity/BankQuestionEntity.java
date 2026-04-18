package hcmut.online_examination.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bank_questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankQuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    private BigDecimal defaultScore;

    private String category; // e.g. "Math", "Java", "CS101"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    // For Code Questions
    @Column(columnDefinition = "TEXT")
    private String starterCode;
    private String language;

    // For Essay Questions
    private Integer minWords;
    private Integer maxWords;
    @Column(columnDefinition = "TEXT")
    private String sampleAnswer;
    @Column(columnDefinition = "TEXT")
    private String gradingRubric;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_question_id")
    @Builder.Default
    private List<BankOptionEntity> options = new ArrayList<>();

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public void addOption(BankOptionEntity option) {
        this.options.add(option);
    }
}
