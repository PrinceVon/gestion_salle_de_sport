package von.salle_gym.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import von.salle_gym.models.User;

public interface UserRepositorydetails extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
