package von.salle_gym.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import von.salle_gym.configuration.JwtUtils;
import von.salle_gym.models.User;
import von.salle_gym.repositories.UserRepositorydetails;
import von.salle_gym.services.AuthService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final UserRepositorydetails userRepositorydetails;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepositorydetails.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Nom d'utilisateur déjà utilisé!!!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(userRepositorydetails.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                Map<String, Object> authData = new HashMap<>();
                User user_ = userRepositorydetails.findByUsername(user.getUsername());
                authData.put("role", user_.getRole());
                authData.put("username", user_.getUsername());
                authData.put("token", jwtUtils.generateToken(user.getUsername()));
                authData.put("type", "Bearer");
                return ResponseEntity.ok(authData);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Informations non valides!!!");
        } catch (AuthenticationException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Informations non valides!!!");
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<User> user = authService.getUserByUsername(username);
        
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> data) {
        boolean success = authService.changePassword(data.get("username"),
                data.get("oldPassword"),
                data.get("newPassword"));
        return success ? ResponseEntity.ok("Mot de passe modifié avec succès")
                : ResponseEntity.status(400).body("Échec de la modification du mot depasse");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        boolean success = authService.updateUser(id, updatedUser);
        return success ? ResponseEntity.ok("Utilisateur mis à jour avec succès")
                : ResponseEntity.status(400).body("Échec de la mise à jour");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        boolean success = authService.deleteUserById(id);
        return success ? ResponseEntity.ok("Compte supprimé avec succès")
                : ResponseEntity.status(400).body("Échec de la suppression");
    }

}
