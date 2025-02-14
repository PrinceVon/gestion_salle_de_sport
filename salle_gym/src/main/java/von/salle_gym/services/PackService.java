package von.salle_gym.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import von.salle_gym.models.Pack;
import von.salle_gym.repositories.PackRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PackService {
    private final PackRepository packRepository;

    public Pack addPack(Pack pack) {
        return packRepository.save(pack);
    }

    public List<Pack> getAllPacks() {
        return packRepository.findAll();
    }

    public Optional<Pack> updatePack(Long id, Pack packDetails) {
        return packRepository.findById(id).map(pack -> {
            pack.setOfferName(packDetails.getOfferName());
            pack.setDurationMonths(packDetails.getDurationMonths());
            pack.setMonthlyPrice(packDetails.getMonthlyPrice());
            return packRepository.save(pack);
        });
    }

    public void deletePack(Long id) {
        packRepository.deleteById(id);
    }
}
