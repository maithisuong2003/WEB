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

    public PromotionResponse createPromotion(PromotionRequest promotionRequest) {
        return promotionMapper.mapToPromotionDto(promotionRepository.save(promotionMapper.mapToPromotionEntity(promotionRequest)));
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

    public PromotionResponse updatePromotion(PromotionRequest promotionRequest) {

        PromotionEntity promotionEntity = promotionRepository.findById(promotionRequest.getId()).orElse(null);
        if (promotionEntity == null) {
            throw new AppException(ErrorCode.PROMOTION_NOT_FOUND);
        }
        if (promotionRequest.getEndTime().before(promotionRequest.getStartTime())) {
            throw new AppException(ErrorCode.INVALID_TIME);
        }
        promotionEntity.setName(promotionRequest.getName());
        promotionEntity.setDescription(promotionRequest.getDescription());
        promotionEntity.setCode(promotionRequest.getCode());
        promotionEntity.setPercentageDiscount(promotionRequest.getPercentageDiscount());
        promotionEntity.setFixedDiscount(promotionRequest.getFixedDiscount());
        promotionEntity.setQuantity(promotionRequest.getQuantity());
        promotionEntity.setStartTime(promotionRequest.getStartTime());
        promotionEntity.setEndTime(promotionRequest.getEndTime());
        promotionEntity.setStatus(promotionRequest.getStatus());
        promotionEntity.setIsDelete(promotionRequest.getIsDelete());
        promotionEntity.setApplicableCondition(promotionRequest.getApplicableCondition());
        promotionEntity.setUsageLimit(promotionRequest.getUsageLimit());
        promotionEntity.setApplicableAccount(promotionRequest.getApplicableAccount());
        promotionEntity.setApplicableProducts(promotionRequest.getApplicableProducts());
        promotionEntity.setPromotionType(promotionRequest.getPromotionType());
        promotionEntity.setCreatedBy(promotionRequest.getCreatedBy());
        return promotionMapper.mapToPromotionDto(promotionRepository.save(promotionEntity));

    }
    public void deletePromotion(Long id) {
        promotionRepository.deleteById(id);
    }
    public PromotionResponse getPromotionByCode(String code) {
        return promotionMapper.mapToPromotionDto(promotionRepository.findByCode(code));
    }
    public PromotionResponse getPromotionById(Long id) {
        return promotionMapper.mapToPromotionDto(promotionRepository.findById(id).orElse(null));
    }
}
