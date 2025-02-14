package von.salle_gym.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import von.salle_gym.models.Customer;
import von.salle_gym.models.Pack;
import von.salle_gym.models.Subscription;
import von.salle_gym.repositories.CustomerRepository;
import von.salle_gym.repositories.PackRepository;
import von.salle_gym.repositories.SubscriptionRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final CustomerRepository customerRepository;
    private final PackRepository packRepository;

    public Optional<Subscription> subscribeCustomer(Long customerId, Long packId) {
        Optional<Customer> customerOpt = customerRepository.findById(customerId);
        Optional<Pack> packOpt = packRepository.findById(packId);

        if (customerOpt.isPresent() && packOpt.isPresent()) {
            Subscription subscription = new Subscription();
            subscription.setCustomer(customerOpt.get());
            subscription.setPack(packOpt.get());
            subscription.setStartDate(LocalDate.now());
            Customer customer = customerOpt.get();
            customer.setActiveSubscription(true);
            customerRepository.save(customer);
            return Optional.of(subscriptionRepository.save(subscription));
        }
        return Optional.empty();
    }

    public Optional<Subscription> getSubscriptionByCustomerId(Long customerId) {
        return subscriptionRepository.findByCustomerId(customerId);
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public void cancelSubscription(Long subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Abonnement non trouvé!!!"));

        Customer customer = subscription.getCustomer();

        customer.setActiveSubscription(false);

        customerRepository.save(customer);

        subscriptionRepository.deleteById(subscriptionId);
    }
}
