package hcmut.online_examination.controller;

import hcmut.online_examination.entity.NotificationEntity;
import hcmut.online_examination.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public List<NotificationEntity> getForUser(@PathVariable Long userId) {
        return notificationService.getForUser(userId);
    }

    @PostMapping("/{id}/read")
    public void markRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }
}
