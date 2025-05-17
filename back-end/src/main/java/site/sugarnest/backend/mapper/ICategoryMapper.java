package site.sugarnest.backend.mapper;

import org.mapstruct.Mapper;
import site.sugarnest.backend.dto.dto.CategoryDto;
import site.sugarnest.backend.entities.CategoryEntity;

@Mapper(componentModel = "spring")
public interface ICategoryMapper {
    CategoryDto mapToCategoryDto(CategoryEntity category);
    CategoryEntity mapToCategory(CategoryDto category);
}
