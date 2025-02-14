package von.salle_gym.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.*;
import von.salle_gym.services.StatisticsService;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/clients/actifs")
    public ResponseEntity<Long> getActiveClients() {
        long count = statisticsService.getActiveClientsCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/clients/inactifs")
    public ResponseEntity<Long> getInactiveClients() {
        long count = statisticsService.getInactiveClientsCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/revenu-mensuel")
    public ResponseEntity<Double> getMonthlyRevenue() {
        double revenue = statisticsService.getMonthlyRevenue();
        return ResponseEntity.ok(revenue);
    }

    @GetMapping("/export-abonnements")
    public ResponseEntity<InputStreamResource> exportSubscriptions(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        ByteArrayInputStream stream = statisticsService.exportSubscriptions(startDate, endDate);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=abonnements.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(new InputStreamResource(stream));
    }
}
