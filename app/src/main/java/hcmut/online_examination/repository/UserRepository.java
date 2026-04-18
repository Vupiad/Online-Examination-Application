package hcmut.online_examination.repository;

import hcmut.online_examination.entity.User;
import hcmut.online_examination.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    List<User> findAllByRole(UserRole role);
    List<User> findAllByRoleAndClassName(UserRole role, String className);
}
