package von.salle_gym.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import von.salle_gym.models.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
