package von.salle_gym.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import von.salle_gym.models.Pack;
import von.salle_gym.services.PackService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/packs")
@RequiredArgsConstructor
public class PackController {
    private final PackService packService;

    @PostMapping
    public ResponseEntity<Pack> addPack(@RequestBody Pack pack) {
        return ResponseEntity.ok(packService.addPack(pack));
    }

    @GetMapping
    public ResponseEntity<List<Pack>> getAllPacks() {
        return ResponseEntity.ok(packService.getAllPacks());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pack> updatePack(@PathVariable Long id, @RequestBody Pack packDetails) {
        Optional<Pack> updatedPack = packService.updatePack(id, packDetails);
        return updatedPack.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePack(@PathVariable Long id) {
        packService.deletePack(id);
        return ResponseEntity.noContent().build();
    }
}
