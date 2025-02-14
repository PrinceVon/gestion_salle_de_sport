package von.salle_gym.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import von.salle_gym.models.Subscription;
import von.salle_gym.services.SubscriptionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        if (subscriptions.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        return ResponseEntity.ok(subscriptions);  
    }    

    @PostMapping("/{customerId}/{packId}")
    public ResponseEntity<Subscription> subscribeCustomer(@PathVariable Long customerId, @PathVariable Long packId) {
        Optional<Subscription> subscription = subscriptionService.subscribeCustomer(customerId, packId);
        return subscription.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Subscription> getSubscriptionByCustomer(@PathVariable Long customerId) {
        Optional<Subscription> subscription = subscriptionService.getSubscriptionByCustomerId(customerId);
        return subscription.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{subscriptionId}")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long subscriptionId) {
        subscriptionService.cancelSubscription(subscriptionId);
        return ResponseEntity.noContent().build();
    }
}
