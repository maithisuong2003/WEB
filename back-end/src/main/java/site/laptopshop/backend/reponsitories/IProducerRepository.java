package site.laptopshop.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.laptopshop.backend.entities.ProducerEntity;

@Repository
public interface IProducerRepository extends JpaRepository<ProducerEntity, Long> {
    public boolean existsByNameProducer(String nameProducer);
}
