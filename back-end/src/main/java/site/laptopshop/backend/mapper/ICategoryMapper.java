package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.dto.CategoryDto;
import site.laptopshop.backend.entities.CategoryEntity;

@Mapper(componentModel = "spring")
public interface ICategoryMapper {
    CategoryDto mapToCategoryDto(CategoryEntity category);
    CategoryEntity mapToCategory(CategoryDto category);
}
