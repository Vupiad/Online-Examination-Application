package hcmut.online_examination.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bank_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankOptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private Boolean isCorrect;
}
