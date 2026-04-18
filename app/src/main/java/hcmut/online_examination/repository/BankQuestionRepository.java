package hcmut.online_examination.repository;

import hcmut.online_examination.entity.BankQuestionEntity;
import hcmut.online_examination.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankQuestionRepository extends JpaRepository<BankQuestionEntity, Long> {
    List<BankQuestionEntity> findAllByOwner(User owner);
    List<BankQuestionEntity> findAllByOwnerAndCategory(User owner, String category);
}
