package hcmut.online_examination.repository;

import hcmut.online_examination.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Long> {
}