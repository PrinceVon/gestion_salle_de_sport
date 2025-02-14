package von.salle_gym.repositories;

import von.salle_gym.models.Pack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackRepository extends JpaRepository<Pack, Long> {
}
