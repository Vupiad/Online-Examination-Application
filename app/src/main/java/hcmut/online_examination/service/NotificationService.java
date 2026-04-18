package hcmut.online_examination.service;

import hcmut.online_examination.entity.NotificationEntity;
import hcmut.online_examination.entity.User;
import hcmut.online_examination.repository.NotificationRepository;
import hcmut.online_examination.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public List<NotificationEntity> getForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<NotificationEntity> personal = notificationRepository.findAllByRecipientOrderByCreatedAtDesc(user);
        List<NotificationEntity> global = notificationRepository.findAllByRecipientIsNullOrderByCreatedAtDesc();
        return Stream.concat(personal.stream(), global.stream())
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(n -> {
            n.setIsRead(true);
            notificationRepository.save(n);
        });
    }

    @Transactional
    public NotificationEntity notify(Long userId, String title, String message, String type) {
        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;
        NotificationEntity notification = NotificationEntity.builder()
                .recipient(user)
                .title(title)
                .message(message)
                .type(type)
                .build();
        return notificationRepository.save(notification);
    }
}
