package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.SupplierEntity;

@Repository
public interface ISupplierRepository extends JpaRepository<SupplierEntity, Long> {
    public boolean existsByNameSupplier(String nameSupplier);
}
