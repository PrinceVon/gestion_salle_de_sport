package von.salle_gym.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders(
                        "Authorization",
                        "Content-Type",
                        "X-Requested-With")
                .allowCredentials(true)
                .maxAge(3600);
    }
}