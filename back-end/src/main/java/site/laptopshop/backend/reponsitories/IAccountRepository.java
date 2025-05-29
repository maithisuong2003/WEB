package site.laptopshop.backend.reponsitories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.AccountEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<site.laptopshop.backend.entities.AccountEntity, Long> {

    Optional<site.laptopshop.backend.entities.AccountEntity> findByEmail(String email);

    Optional<site.laptopshop.backend.entities.AccountEntity> findByPhone(String phone);

    Optional<site.laptopshop.backend.entities.AccountEntity> findByVerificationCode(String verificationCode);

    Optional<site.laptopshop.backend.entities.AccountEntity> findByAccountName(String accountName);

    @Query("SELECT a FROM AccountEntity a LEFT JOIN FETCH a.roles r LEFT JOIN FETCH r.permissions WHERE a.email = :email")
    site.laptopshop.backend.entities.AccountEntity findByEmailWithRolesAndPermissions(@Param("email") String email);

    @Query("SELECT a FROM AccountEntity a ORDER BY a.id DESC")
    List<site.laptopshop.backend.entities.AccountEntity> findNewAccounts(Pageable pageable);
}
