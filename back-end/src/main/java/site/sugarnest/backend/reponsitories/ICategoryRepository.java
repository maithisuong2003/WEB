package site.sugarnest.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.CategoryEntity;
@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long>{
    public boolean existsByNameCategory(String name);
}
