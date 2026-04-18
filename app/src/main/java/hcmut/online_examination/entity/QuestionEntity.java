package hcmut.online_examination.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String question; 

    @Column(precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal score = BigDecimal.ONE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private QuestionType type = QuestionType.MULTIPLE_CHOICE;

    @Column(columnDefinition = "TEXT")
    private String starterCode;

    @Column(length = 50)
    private String language;

    // Các trường đặc thù cho Essay
    private Integer minWords;
    private Integer maxWords;
    
    @Column(columnDefinition = "TEXT")
    private String sampleAnswer;
    
    @Column(columnDefinition = "TEXT")
    private String gradingRubric;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id")
    private ExamEntity exam;

    @OneToMany(
        mappedBy = "question",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    @Builder.Default
    private Set<OptionEntity> options = new HashSet<>();

    @OneToMany(
        mappedBy = "question",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    @Builder.Default
    private Set<TestCaseEntity> testCases = new HashSet<>();

    public void addOption(OptionEntity option) {
        this.options.add(option);
        option.setQuestion(this);
    }

    public void addTestCase(TestCaseEntity testCase) {
        this.testCases.add(testCase);
        testCase.setQuestion(this);
    }
}