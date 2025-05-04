package site.sugarnest.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.PermissionEntity;

@Repository
public interface IPermissionRepository extends JpaRepository<PermissionEntity, String>{
}
