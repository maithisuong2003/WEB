package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.laptopshop.backend.entities.RoleEntity;

@Repository
public interface IRoleRepository extends JpaRepository<RoleEntity,String> {
}
