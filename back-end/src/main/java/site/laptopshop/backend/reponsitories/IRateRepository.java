package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.laptopshop.backend.entities.RateEntity;

import java.util.List;
import java.util.Optional;


@Repository
public interface IRateRepository extends JpaRepository<RateEntity, Long> {
    Optional<RateEntity> findByAccountEntity_IdAndProductEntity_Id(Long accountId, Long productId);
    List<RateEntity> findByProductEntity_Id(Long productId);
}
