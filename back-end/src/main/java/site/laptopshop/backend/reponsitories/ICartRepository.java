package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import site.laptopshop.backend.entities.AccountEntity;
import site.laptopshop.backend.entities.CartEntity;

import java.util.Optional;

public interface ICartRepository extends JpaRepository<CartEntity, Integer> {
    Optional<CartEntity> findByAccountEntity(AccountEntity accountEntity);

}