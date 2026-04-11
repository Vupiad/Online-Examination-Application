package hcmut.online_examination.repository;

import hcmut.online_examination.entity.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
    Page<Test> findByInstructorId(String instructorId, Pageable pageable);
    
    Page<Test> findByInstructorIdAndStatus(String instructorId, String status, Pageable pageable);
}