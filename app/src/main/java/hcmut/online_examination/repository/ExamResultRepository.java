package hcmut.online_examination.repository;

import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.ExamResultEntity;
import hcmut.online_examination.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResultEntity, Long> {
    
    long countByExamAndExaminee(ExamEntity exam, User examinee);

    List<ExamResultEntity> findAllByExam(ExamEntity exam);
    List<ExamResultEntity> findAllByExamineeOrderBySubmittedAtDesc(User examinee);
}