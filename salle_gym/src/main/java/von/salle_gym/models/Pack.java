package von.salle_gym.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pack")
public class Pack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String offerName;

    @Column(nullable = false)
    private int durationMonths;

    @Column(nullable = false)
    private double monthlyPrice;
}
