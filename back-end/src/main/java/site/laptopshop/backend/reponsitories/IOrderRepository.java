package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.laptopshop.backend.entities.AccountEntity;
import site.laptopshop.backend.entities.OrderEntity;

import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> findByAccountEntity(AccountEntity accountEntity);
}

