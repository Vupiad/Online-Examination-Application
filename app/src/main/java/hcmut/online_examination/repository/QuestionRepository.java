package hcmut.online_examination.repository;

import hcmut.online_examination.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> { 
    
    List<QuestionEntity> findAllByExamId(Long examId);
}
