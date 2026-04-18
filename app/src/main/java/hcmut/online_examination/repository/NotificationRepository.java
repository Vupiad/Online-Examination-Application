package hcmut.online_examination.repository;

import hcmut.online_examination.entity.NotificationEntity;
import hcmut.online_examination.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByRecipientOrderByCreatedAtDesc(User recipient);
    List<NotificationEntity> findAllByRecipientIsNullOrderByCreatedAtDesc(); // Global ones
}
