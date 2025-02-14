package von.salle_gym.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import von.salle_gym.repositories.CustomerRepository;
import von.salle_gym.repositories.SubscriptionRepository;
import von.salle_gym.models.Subscription;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final CustomerRepository customerRepository;
    private final SubscriptionRepository subscriptionRepository;

    public long getActiveClientsCount() {
        return customerRepository.countByActiveSubscription(true);
    }
    public long getInactiveClientsCount() {
        return customerRepository.countByInactiveSubscription(false);
    }

    public double getMonthlyRevenue() {
        return subscriptionRepository.calculateMonthlyRevenue();
    }

    public ByteArrayInputStream exportSubscriptions(LocalDate startDate, LocalDate endDate) {
        List<Subscription> subscriptions = subscriptionRepository.findByStartDateBetween(startDate, endDate);
    
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             OutputStreamWriter osw = new OutputStreamWriter(out, StandardCharsets.UTF_8);
             PrintWriter writer = new PrintWriter(osw)) {
    
            out.write(0xEF);
            out.write(0xBB);
            out.write(0xBF);
    
            writer.println("ID;Client;Offre;Durée par mois;Prix;Date de début");
    
            for (Subscription s : subscriptions) {
                writer.println(
                        s.getId() + ";" +
                        "\"" + s.getCustomer().getLastName() + " " + s.getCustomer().getFirstName() + "\";" +
                        "\"" + s.getPack().getOfferName() + "\";" +
                        "\"" + s.getPack().getDurationMonths() + "\";" +
                        s.getPack().getMonthlyPrice() + ";" +
                        s.getStartDate()
                );
            }
    
            writer.flush();
            return new ByteArrayInputStream(out.toByteArray());
    
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'export", e);
        }
    }
    
}
