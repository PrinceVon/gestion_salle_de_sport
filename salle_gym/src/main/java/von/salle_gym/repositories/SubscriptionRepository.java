package von.salle_gym.repositories;

import von.salle_gym.models.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByCustomerId(Long customerId);

    @Query("SELECT SUM(p.monthlyPrice) FROM Subscription s JOIN s.pack p WHERE s.startDate <= CURRENT_DATE")
    Double calculateMonthlyRevenue();

    List<Subscription> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
}
