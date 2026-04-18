package hcmut.online_examination.repository;

import hcmut.online_examination.entity.ExamEntity;
import hcmut.online_examination.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ExamRepository extends JpaRepository<ExamEntity, Long> {

    Optional<ExamEntity> findByPasscodeAndId(String passcode, UUID id);

    Optional<ExamEntity> findByExamCode(String examCode);

    boolean existsByExamCodeAndOwner(String examCode, User owner);

    Optional<ExamEntity> findByExamCodeAndOwner(String examCode, User user);

    // @Query("""
    // SELECT e FROM ExamEntity e
    // JOIN FETCH e.questions q
    // JOIN FETCH q.answers
    // WHERE e.examCode = :examCode
    // """)
    // Optional<ExamEntity> findFullExamByExamCode(@Param("examCode") String examCode);

    // @Query("""
    //     SELECT e FROM ExamEntity e
    //     JOIN FETCH e.questions
    //     WHERE e.examCode = :examCode
    // """)
    // Optional<ExamEntity> findFullExamWithQuestions(@Param("examCode") String examCode);

    @EntityGraph(attributePaths = {"questions", "questions.options"})
    @Query("SELECT e FROM ExamEntity e WHERE e.examCode = :examCode")
    Optional<ExamEntity> findFullExam(@Param("examCode") String examCode);
    List<ExamEntity> findAllByOwnerOrderByStartTimeDesc(User owner);
}