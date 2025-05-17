package site.sugarnest.backend.service.product;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import site.sugarnest.backend.dto.dto.SupplierDto;
import site.sugarnest.backend.entities.SupplierEntity;
import site.sugarnest.backend.mapper.ISupplierMapper;
import site.sugarnest.backend.reponsitories.ISupplierRepository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SupplierService {
    ISupplierMapper supplierMapper;
    ISupplierRepository supplierRepository;


    public boolean checkSupplierExistByName(String name) {
        return supplierRepository.existsByNameSupplier(name);
    }

    public SupplierDto createSupplier(SupplierDto supplierDto) {
        SupplierEntity supplierEntity = supplierMapper.mapToSupplier(supplierDto);
        return supplierMapper.mapToSupplierDto(supplierRepository.save(supplierEntity));
    }

    public SupplierDto getSupplierById(Long id) {
        return supplierMapper.mapToSupplierDto(supplierRepository.findById(id).orElse(null));
    }

    public SupplierDto updateSupplier(SupplierDto supplierDto) {
        SupplierEntity supplierEntity = supplierMapper.mapToSupplier(supplierDto);
        return supplierMapper.mapToSupplierDto(supplierRepository.save(supplierEntity));
    }

    public void deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
    }

    public List<SupplierDto> getAllSuppliers() {
        return supplierRepository.findAll().stream().map(supplierMapper::mapToSupplierDto).collect(Collectors.toList());
    }

}
