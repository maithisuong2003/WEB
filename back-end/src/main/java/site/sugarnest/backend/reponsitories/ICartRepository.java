package site.sugarnest.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sugarnest.backend.entities.AccountEntity;
import site.sugarnest.backend.entities.CartEntity;

import java.util.Optional;

public interface ICartRepository extends JpaRepository<CartEntity, Integer> {
    Optional<CartEntity> findByAccountEntity(AccountEntity accountEntity);

}