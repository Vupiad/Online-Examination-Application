package hcmut.online_examination.controller;

import hcmut.online_examination.dto.UserDto;
import hcmut.online_examination.entity.UserRole;
import hcmut.online_examination.mappers.ExamMapper;
import hcmut.online_examination.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/students")
    public List<UserDto> getStudents(@RequestParam(required = false) String className) {
        if (className != null && !className.isEmpty()) {
            return userRepository.findAllByRoleAndClassName(UserRole.STUDENT, className).stream()
                    .map(ExamMapper::toUserDto)
                    .collect(Collectors.toList());
        }
        return userRepository.findAllByRole(UserRole.STUDENT).stream()
                .map(ExamMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/classes")
    public List<String> getClasses() {
        return userRepository.findAllByRole(UserRole.STUDENT).stream()
                .map(u -> u.getClassName())
                .filter(c -> c != null && !c.isEmpty())
                .distinct()
                .collect(Collectors.toList());
    }
}
