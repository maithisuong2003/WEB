package site.sugarnest.backend.reponsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.sugarnest.backend.entities.ProducerEntity;

@Repository
public interface IProducerRepository extends JpaRepository<ProducerEntity, Long> {
    public boolean existsByNameProducer(String nameProducer);
}
