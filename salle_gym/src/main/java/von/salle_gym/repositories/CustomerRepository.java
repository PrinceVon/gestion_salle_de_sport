package von.salle_gym.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import von.salle_gym.models.Customer;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByLastNameContainingIgnoreCase(String lastName);

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.activeSubscription = true")
    long countByActiveSubscription(boolean active);

    @Query("SELECT COUNT(c) FROM Customer c WHERE c.activeSubscription = false")
    long countByInactiveSubscription(boolean active);
    
}
