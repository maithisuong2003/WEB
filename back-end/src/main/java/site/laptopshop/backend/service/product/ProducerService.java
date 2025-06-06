package site.laptopshop.backend.service.product;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import site.laptopshop.backend.dto.dto.ProducerDto;
import site.laptopshop.backend.entities.ProducerEntity;
import site.laptopshop.backend.exception.AppException;
import site.laptopshop.backend.exception.ErrorCode;
import site.laptopshop.backend.mapper.IProducerMapper;
import site.laptopshop.backend.reponsitories.IProducerRepository;

import java.util.List;
@AllArgsConstructor
@Service
public class ProducerService {
    IProducerRepository producerRepository;
    IProducerMapper producerMapper;

    public boolean checkProducerExistByName(String name) {
        return producerRepository.existsByNameProducer(name);
    }
    public ProducerDto createProducer(ProducerDto producerDto) {
        ProducerEntity producerEntity = producerMapper.mapToProducer(producerDto);
        return producerMapper.mapToProducerDto(producerRepository.save(producerEntity));
    }

    public List<ProducerDto> getAllProducers() {
        return producerRepository.findAll().stream().map(producerMapper::mapToProducerDto).toList();
    }

    public ProducerDto getProducerById(Long id) {
        return producerMapper.mapToProducerDto(producerRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCER_NOT_EXITED)));
    }

    public ProducerDto updateProducer(ProducerDto producerDto) {
        ProducerEntity producerEntity = producerMapper.mapToProducer(producerDto);
        return producerMapper.mapToProducerDto(producerRepository.save(producerEntity));
    }

    public void deleteProducer(Long id) {
        producerRepository.deleteById(id);
    }
}
