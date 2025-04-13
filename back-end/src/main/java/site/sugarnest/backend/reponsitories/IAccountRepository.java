package site.sugarnest.backend.reponsitories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.AccountEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<AccountEntity, Long> {

    Optional<AccountEntity> findByEmail(String email);

}
