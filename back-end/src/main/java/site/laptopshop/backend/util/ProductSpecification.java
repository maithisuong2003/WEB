package site.laptopshop.backend.util;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import site.sugarnest.backend.dto.dto.ProductFilterDto;
import site.sugarnest.backend.entities.CategoryEntity;
import site.sugarnest.backend.entities.ProducerEntity;
import site.sugarnest.backend.entities.ProductEntity;
import site.sugarnest.backend.entities.SizeColorProductEntity;

import java.util.*;

public class ProductSpecification {

    public static Specification<ProductEntity> getSpecifications(ProductFilterDto filter, Pageable pageable) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Lọc theo các loại sản phẩm
            if (filter.getCategories() != null && !filter.getCategories().isEmpty()) {
                Join<ProductEntity, CategoryEntity> categoryJoin = root.join("categoryEntity");
                predicates.add(categoryJoin.get("nameCategory").in(filter.getCategories()));
            }

            // Lọc theo giá (giá tối thiểu và tối đa)
            if (filter.getMinPrice() != null || filter.getMaxPrice() != null) {
                Subquery<Double> subquery = query.subquery(Double.class);
                Root<SizeColorProductEntity> sizeColorRoot = subquery.from(SizeColorProductEntity.class);
                subquery.select(sizeColorRoot.get("listPrice"))
                        .where(cb.equal(sizeColorRoot.get("productEntity").get("id"), root.get("id")));

                if (filter.getMinPrice() != null && filter.getMaxPrice() != null) {
                    subquery.where(
                            cb.and(
                                    cb.equal(sizeColorRoot.get("productEntity").get("id"), root.get("id")),
                                    cb.between(sizeColorRoot.get("listPrice"), filter.getMinPrice(), filter.getMaxPrice())
                            )
                    );
                } else if (filter.getMinPrice() != null) {
                    subquery.where(
                            cb.and(
                                    cb.equal(sizeColorRoot.get("productEntity").get("id"), root.get("id")),
                                    cb.greaterThanOrEqualTo(sizeColorRoot.get("listPrice"), filter.getMinPrice())
                            )
                    );
                } else if (filter.getMaxPrice() != null) {
                    subquery.where(
                            cb.and(
                                    cb.equal(sizeColorRoot.get("productEntity").get("id"), root.get("id")),
                                    cb.lessThanOrEqualTo(sizeColorRoot.get("listPrice"), filter.getMaxPrice())
                            )
                    );
                }

                predicates.add(cb.exists(subquery));
            }

            // Lọc theo các nhà sản xuất
            if (filter.getSuppliers() != null && !filter.getSuppliers().isEmpty()) {
                Join<ProductEntity, ProducerEntity> producerJoin = root.join("supplierEntity");
                predicates.add(producerJoin.get("nameSupplier").in(filter.getSuppliers()));
            }
            // Sắp xếp theo giá listPrice thấp nhất
            if (filter.getSortBy().equals("listPrice")) {
                Subquery<Double> subquery = query.subquery(Double.class);
                Root<SizeColorProductEntity> sizeColorRoot = subquery.from(SizeColorProductEntity.class);
                subquery.select(cb.least(sizeColorRoot.<Double>get("listPrice")))
                        .where(cb.equal(sizeColorRoot.get("productEntity").get("id"), root.get("id")));
                query.orderBy(filter.getSortDirection().equalsIgnoreCase("ASC") ? cb.asc(subquery) : cb.desc(subquery));
            } else {
                query.orderBy(filter.getSortDirection().equalsIgnoreCase("ASC") ? cb.asc(root.get(filter.getSortBy())) : cb.desc(root.get(filter.getSortBy())));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

