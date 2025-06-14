package site.laptopshop.backend.service.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.laptopshop.backend.dto.dto.RateDto;
import site.laptopshop.backend.entities.RateEntity;
import site.laptopshop.backend.exception.AppException;
import site.laptopshop.backend.exception.ErrorCode;
import site.laptopshop.backend.reponsitories.*;

import java.util.List;

@Service
public class RatingService {
    @Autowired
    private IRateRepository rateRepository;

    @Autowired
    private IAccountRepository iAccountRepository;

    @Autowired
    private IProductRepository iProductRepository;

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    public boolean checkPurchase(Long accountId, Long productId) {
        return orderDetailRepository.existsByOrderEntity_AccountEntity_IdAndProductEntity_Id(accountId, productId);
    }

    public RateDto getRating(Long accountId, Long productId) {
        return rateRepository.findByAccountEntity_IdAndProductEntity_Id(accountId, productId).map(rate -> new RateDto(rate.getId(), rate.getAccountEntity().getId(), rate.getProductEntity().getId(), rate.getNumberStar())).orElse(null);
    }

    public Double getAvgRating(Long productId) {
        List<RateEntity> rateEntities = rateRepository.findByProductEntity_Id(productId);
        return rateEntities.stream().mapToDouble(RateEntity::getNumberStar).average().orElse(0);
    }

    public RateDto createRating(RateDto rate) {
        System.out.println(rate.getNumberStar());
        var account = iAccountRepository.findById(rate.getAccountId())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        var product = iProductRepository.findById(rate.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXITED));
        if (orderDetailRepository.existsByOrderEntity_AccountEntity_IdAndProductEntity_Id(rate.getAccountId(), rate.getProductId())) {
            RateEntity rateEntity = new RateEntity();
            rateEntity.setProductEntity(product);
            rateEntity.setAccountEntity(account);
            rateEntity.setNumberStar(rate.getNumberStar());
            rateEntity.setStatus("ACTIVE");
            rateEntity.setNumberEdit(0);
            return new RateDto(rateRepository.save(rateEntity).getId(), rateEntity.getAccountEntity().getId(), rateEntity.getProductEntity().getId(), rateEntity.getNumberStar());
        } else {
            return null;
        }
    }

    public RateDto updateRating(RateDto rate) {
        RateEntity rateEntity = rateRepository.findByAccountEntity_IdAndProductEntity_Id(rate.getAccountId(), rate.getProductId()).orElseThrow(() -> new AppException(ErrorCode.RATE_NOT_EXITED));
        if(rateEntity.getNumberEdit() >= 3) {
            throw new AppException(ErrorCode.RATE_EDIT_LIMIT);
        }else {
            rateEntity.setNumberStar(rate.getNumberStar());
            rateEntity.setNumberEdit(rateEntity.getNumberEdit() + 1);
        }
        return new RateDto(rateRepository.save(rateEntity).getId(), rateEntity.getAccountEntity().getId(), rateEntity.getProductEntity().getId(), rateEntity.getNumberStar());
    }

}
