package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.laptopshop.backend.entities.ImageProductEntity;
import site.laptopshop.backend.entities.ProductEntity;

@Repository
public interface IImageProductRepository extends JpaRepository<ImageProductEntity, Long> {
    void deleteByProductEntity(ProductEntity productEntity);
}
