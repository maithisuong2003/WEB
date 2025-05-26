package site.sugarnest.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.PromotionEntity;

import java.util.List;

@Repository
public interface IPromotionRepository extends JpaRepository<PromotionEntity, Long> {
    public PromotionEntity findByCode(String code);
    List<PromotionEntity> findByApplicableAccountId(Long accountId);

}
