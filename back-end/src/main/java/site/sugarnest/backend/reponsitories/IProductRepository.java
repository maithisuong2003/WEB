package site.sugarnest.backend.reponsitories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.ProductEntity;

import java.util.List;


@Repository
public interface IProductRepository extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {
    Page<ProductEntity> findAll(Pageable pageable);

    @Query("SELECT p FROM ProductEntity p WHERE p.categoryEntity.id = ?1")
    List<ProductEntity> findProductByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT p FROM ProductEntity p WHERE p.isDelete = :isDelete")
    List<ProductEntity> getProductByAdmin(@Param("isDelete") String isDelete);

    @Query("SELECT od.productEntity FROM OrderDetailEntity od GROUP BY od.productEntity ORDER BY SUM(od.quantity) DESC")
    List<ProductEntity> findTopSellingProducts(Pageable pageable);

    @Query("SELECT p FROM ProductEntity p ORDER BY p.id DESC")
    List<ProductEntity> findLatestProducts(Pageable pageable);

    @Query("SELECT p FROM ProductEntity p ORDER BY p.views DESC")
    List<ProductEntity> findMostViewedProducts(Pageable pageable);

    @Query("SELECT p FROM ProductEntity p WHERE p.categoryEntity.id = :categoryId ORDER BY p.views DESC")
    List<ProductEntity> findRecommendedProducts(@Param("categoryId") Long categoryId, Pageable pageable);

    Page<ProductEntity> findByNameProductContainingIgnoreCase(String nameProduct, Pageable pageable);


}