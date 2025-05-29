package site.sugarnest.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.InventoryEntity;
import site.sugarnest.backend.entities.SizeColorProductEntity;

import java.util.List;

@Repository
public interface IInventoryRepository extends JpaRepository<InventoryEntity, Long> {
    @Query("SELECT i.sizeColorProductEntity FROM InventoryEntity i WHERE i.quantity <= :threshold")
    List<SizeColorProductEntity> findProductsOutOfStock(@Param("threshold") Integer threshold);
}
