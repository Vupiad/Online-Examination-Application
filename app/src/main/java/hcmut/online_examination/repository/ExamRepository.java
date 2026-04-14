package hcmut.online_examination.repository;

import hcmut.online_examination.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findAllByOrderByCreatedAtDesc();
    long countByStatus(Exam.ExamStatus status);
}
