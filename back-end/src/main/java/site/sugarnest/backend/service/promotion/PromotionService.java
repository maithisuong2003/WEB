package site.sugarnest.backend.service.promotion;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.sugarnest.backend.dto.request.PromotionRequest;
import site.sugarnest.backend.dto.response.PromotionResponse;
import site.sugarnest.backend.entities.AccountEntity;
import site.sugarnest.backend.entities.ProductEntity;
import site.sugarnest.backend.entities.PromotionEntity;
import site.sugarnest.backend.exception.AppException;
import site.sugarnest.backend.exception.ErrorCode;
import site.sugarnest.backend.mapper.IPromotionMapper;
import site.sugarnest.backend.reponsitories.IAccountRepository;
import site.sugarnest.backend.reponsitories.IProductRepository;
import site.sugarnest.backend.reponsitories.IPromotionRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class PromotionService {

    private IPromotionRepository promotionRepository;
    private IPromotionMapper promotionMapper;
    private IProductRepository productRepository;
    private IAccountRepository accountRepository;


    public List<PromotionResponse> getAllPromotions() {
        List<PromotionEntity> promotionEntities = promotionRepository.findAll();
        return promotionEntities.stream().map(promotionMapper::mapToPromotionDto).toList();
    }

    public void addProductToPromotion(Long promotionId, Long productId) {
        Optional<PromotionEntity> promotion = promotionRepository.findById(promotionId);
        Optional<ProductEntity> product = productRepository.findById(productId);

        if (promotion.isPresent() && product.isPresent()) {
            PromotionEntity promotionEntity = promotion.get();
            ProductEntity productEntity = product.get();

            promotionEntity.getApplicableProducts().add(productEntity);
            promotionRepository.save(promotionEntity);
        } else {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
    }

    public List<PromotionResponse> getSavedPromotions(Long accountId) {
        List<PromotionEntity> savedPromotions = promotionRepository.findByApplicableAccountId(accountId);
        return savedPromotions.stream()
                .map(this::mapToPromotionResponse)
                .collect(Collectors.toList());
    }

    public void addAccountToPromotion(Long promotionId, Long accountId) {
        PromotionEntity promotion = promotionRepository.findById(promotionId)
                .orElseThrow(() -> new AppException(ErrorCode.PROMOTION_NOT_FOUND));

        boolean alreadySaved = promotion.getApplicableAccount().stream()
                .anyMatch(account -> account.getId().equals(accountId));
        if (alreadySaved) {
            throw new AppException(ErrorCode.PROMOTION_ALREADY_SAVED);
        }

        AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        promotion.getApplicableAccount().add(account);
        promotionRepository.save(promotion);
    }
    private PromotionResponse mapToPromotionResponse(PromotionEntity promotion) {
        return PromotionResponse.builder()
                .id(promotion.getId())
                .code(promotion.getCode())
                .description(promotion.getDescription())
                .percentageDiscount(promotion.getPercentageDiscount())
                .fixedDiscount(promotion.getFixedDiscount())
                .startTime(promotion.getStartTime())
                .endTime(promotion.getEndTime())
                .status(promotion.getStatus())
                .applicableCondition(promotion.getApplicableCondition())
                .usageLimit(promotion.getUsageLimit())
                .promotionType(promotion.getPromotionType())
                .build();
    }
    public boolean isPromotionApplicableToProduct(Long promotionId, Long productId) {
        Optional<PromotionEntity> promotion = promotionRepository.findById(promotionId);
        if (promotion.isPresent()) {
            PromotionEntity promo = promotion.get();
            return promo.getApplicableProducts().stream().anyMatch(product -> product.getId().equals(productId));
        }
        return false;
    }

    public boolean isPromotionApplicableToAccount(Long promotionId, Long accountId) {
        Optional<PromotionEntity> promotion = promotionRepository.findById(promotionId);
        if (promotion.isPresent()) {
            PromotionEntity promo = promotion.get();
            return promo.getApplicableAccount().stream().anyMatch(account -> account.getId().equals(accountId));
        }
        return false;
    }

    public boolean applyPromotionToOrder(Long promotionId, Long accountId, Long productId) {
        boolean isProductApplicable = isPromotionApplicableToProduct(promotionId, productId);
        boolean isAccountApplicable = isPromotionApplicableToAccount(promotionId, accountId);
        return isProductApplicable && isAccountApplicable;
    }
}
