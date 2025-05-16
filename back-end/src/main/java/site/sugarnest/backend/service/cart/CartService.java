package site.sugarnest.backend.service.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sugarnest.backend.dto.request.CartItemRequest;
import site.sugarnest.backend.dto.response.CartItemResponse;
import site.sugarnest.backend.entities.*;
import site.sugarnest.backend.exception.AppException;
import site.sugarnest.backend.exception.ErrorCode;
import site.sugarnest.backend.mapper.ICartMapper;
import site.sugarnest.backend.reponsitories.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private ICartRepository cartRepository;

    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private ICartItemRepository cartItemRepository;

    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private ICartMapper cartMapper;

    @Autowired
    private ISizeColorProductRepository sizeColorProductRepository;

    @Transactional
    public CartItemResponse addItemToCart(CartItemRequest cartItemRequest) {
        AccountEntity account = accountRepository.findById(cartItemRequest.getAccountId())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));

        CartEntity cart = cartRepository.findByAccountEntity(account).orElse(null);

        if (cart == null) {
            cart = new CartEntity();
            cart.setAccountEntity(account);
            cart.setCreatedAt(new Date());
            cart.setUpdatedAt(new Date());
            cart.setStatus("active");
            cartRepository.save(cart);
        }

        ProductEntity product = productRepository.findById(cartItemRequest.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        SizeColorProductEntity sizeColorProduct = sizeColorProductRepository.findByProductEntityAndSizeAndColor(
                        product, cartItemRequest.getProductSize(), cartItemRequest.getProductColor());

        Optional<CartItemEntity> existingCartItemOpt = cart.getCartItems().stream()
                .filter(item -> item.getProductEntity().equals(product) &&
                        item.getProductSize().equals(cartItemRequest.getProductSize()) &&
                        item.getProductColor().equals(cartItemRequest.getProductColor()))
                .findFirst();

        CartItemEntity cartItem;

        if (existingCartItemOpt.isPresent()) {
            cartItem = existingCartItemOpt.get();
            int newQuantity = cartItem.getQuantity() + cartItemRequest.getQuantity();
            cartItem.setQuantity(newQuantity);
            cartItem.setPrice(sizeColorProduct.getDiscountPrice() * newQuantity);
        } else {
            cartItem = new CartItemEntity();
            cartItem.setCartEntity(cart);
            cartItem.setProductEntity(product);
            cartItem.setQuantity(cartItemRequest.getQuantity());
            cartItem.setProductSize(cartItemRequest.getProductSize());
            cartItem.setProductColor(cartItemRequest.getProductColor());
            cartItem.setPrice(sizeColorProduct.getDiscountPrice() * cartItemRequest.getQuantity());
            cart.getCartItems().add(cartItem);
        }

        cart.setUpdatedAt(new Date());
        if (cart.getTotalPrice() == null) {
            cart.setTotalPrice(0.0);
        }

        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(CartItemEntity::getPrice)
                .sum();
        cart.setTotalPrice(totalPrice);

        cartRepository.save(cart);

        CartItemResponse cartItemResponse = cartMapper.mapToCartItemDto(cartItem);
        cartItemResponse.setAccountId(cartItemRequest.getAccountId());
        cartItemResponse.setProductId(cartItemRequest.getProductId());
        cartItemResponse.setCartId(cart.getId());
        return cartItemResponse;
    }


    @Transactional
    public void removeItemFromCart(Integer cartItemId) {
        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        AccountEntity account = accountRepository.findByAccountName(accountName).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        CartEntity cart = cartRepository.findByAccountEntity(account).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        CartItemEntity cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        cart.setUpdatedAt(new Date());
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(CartItemEntity::getPrice)
                .sum();
        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);
    }

    @Transactional
    public void increaseQuantity(Integer cartItemId) {
        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        AccountEntity account = accountRepository.findByAccountName(accountName).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        CartEntity cart = cartRepository.findByAccountEntity(account).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        CartItemEntity cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        SizeColorProductEntity sizeColorProduct = sizeColorProductRepository.findByProductEntityAndSizeAndColor(
                cartItem.getProductEntity(), cartItem.getProductSize(), cartItem.getProductColor());
        if (sizeColorProduct != null && cartItem.getQuantity()>sizeColorProduct.getInventoryEntity().getQuantity()) {
            throw new AppException(ErrorCode.SIZE_COLOR_PRODUCT_NOT_FOUND);
        }
        cartItem.setQuantity(cartItem.getQuantity() + 1);
        cartItem.setPrice(sizeColorProduct.getDiscountPrice() * cartItem.getQuantity());
        cartItemRepository.save(cartItem);
        cart.setUpdatedAt(new Date());
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(CartItemEntity::getPrice)
                .sum();
        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);
    }

    @Transactional
    public void decreaseQuantity(Integer cartItemId) {
        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        AccountEntity account = accountRepository.findByAccountName(accountName).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        CartEntity cart = cartRepository.findByAccountEntity(account).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        CartItemEntity cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        int newQuantity = cartItem.getQuantity() - 1;
        if (newQuantity <= 0) {
            cart.getCartItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(newQuantity);
            SizeColorProductEntity sizeColorProduct = sizeColorProductRepository.findByProductEntityAndSizeAndColor(
                    cartItem.getProductEntity(), cartItem.getProductSize(), cartItem.getProductColor());
            cartItem.setPrice(sizeColorProduct.getDiscountPrice() * cartItem.getQuantity());
            cartItemRepository.save(cartItem);
        }

        cart.setUpdatedAt(new Date());
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(CartItemEntity::getPrice)
                .sum();
        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);
    }

    public CartEntity getCartByAccountId(Long accountId) {
        AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        return cartRepository.findByAccountEntity(account).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
    }

    public List<CartItemEntity> getCartItemsByCartId(Integer cartId) {
        return cartItemRepository.findByCartEntityId(cartId);
    }

    public Integer getTotalItemsInCart(Long accountId) {
        AccountEntity account = accountRepository.findById(accountId).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        CartEntity cart = cartRepository.findByAccountEntity(account).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        List<CartItemEntity> cartItems = getCartItemsByCartId(cart.getId());
        return cartItems.stream().mapToInt(CartItemEntity::getQuantity).sum();
    }

    public List<CartEntity> getAllCarts() {
        return cartRepository.findAll();
    }

    public CartEntity getMyCart() {
        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        AccountEntity account = accountRepository.findByAccountName(accountName).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        return cartRepository.findByAccountEntity(account).orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
    }
}
