package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.laptopshop.backend.entities.SizeColorProductEntity;
import site.laptopshop.backend.entities.InventoryEntity;

import java.util.List;

@Repository
public interface IInventoryRepository extends JpaRepository<site.laptopshop.backend.entities.InventoryEntity, Long> {
    @Query("SELECT i.sizeColorProductEntity FROM InventoryEntity i WHERE i.quantity <= :threshold")
    List<SizeColorProductEntity> findProductsOutOfStock(@Param("threshold") Integer threshold);
}
