package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import site.laptopshop.backend.entities.ProductEntity;
import site.laptopshop.backend.entities.SizeColorProductEntity;

public interface ISizeColorProductRepository extends JpaRepository<SizeColorProductEntity, Long> {
    void deleteByProductEntity(ProductEntity productEntity);
    SizeColorProductEntity findByProductEntityAndSizeAndColor(ProductEntity product, String size, String color);

    SizeColorProductEntity findByProductEntityIdAndSizeAndColor(Long productId, String size, String color);
}
