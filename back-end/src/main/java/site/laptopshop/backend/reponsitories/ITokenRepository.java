package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import site.laptopshop.backend.entities.TokenEntity;

import java.util.Optional;

public interface ITokenRepository extends JpaRepository<TokenEntity, Long> {
    Optional<TokenEntity> findByToken(String token);
}
