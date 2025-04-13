package site.sugarnest.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.RoleEntity;

@Repository
public interface IRoleRepository extends JpaRepository<RoleEntity,String> {
}
