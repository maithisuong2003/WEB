package site.laptopshop.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.request.CartItemRequest;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.dto.response.CartItemResponse;
import site.sugarnest.backend.entities.CartEntity;
import site.sugarnest.backend.entities.CartItemEntity;
import site.sugarnest.backend.service.cart.CartService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/carts")
@AllArgsConstructor
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping({"/", "/all", ""})
    @PreAuthorize("hasAuthority('CART_GET')")
    public ApiResponse<List<CartEntity>> getAllCarts() {
        return ApiResponse.<List<CartEntity>>builder()
                .code(200)
                .result(cartService.getAllCarts())
                .build();
    }

    @PostMapping("/add-item")
    @PreAuthorize("hasAuthority('CART_POST')")
    public ApiResponse<CartItemResponse> addItemToCart(@RequestBody CartItemRequest cartItemDto) {
        return ApiResponse.<CartItemResponse>builder()
                .code(200)
                .result(cartService.addItemToCart(cartItemDto))
                .build();
    }

    @DeleteMapping("/remove-item/{cartItemId}")
    @PreAuthorize("hasAuthority('CART_DELETE')")
    public ApiResponse<Void> removeItemFromCart(@PathVariable("cartItemId") Integer cartItemId) {
        cartService.removeItemFromCart(cartItemId);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Item removed from cart!")
                .build();
    }

    @PutMapping("/increase-quantity/{cartItemId}")
    public ApiResponse<Void> increaseQuantity(@PathVariable("cartItemId") Integer cartItemId) {
        cartService.increaseQuantity(cartItemId);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Quantity increased!")
                .build();
    }

    @PutMapping("/decrease-quantity/{cartItemId}")
    @PreAuthorize("hasAuthority('CART_PUT')")
    public ApiResponse<Void> decreaseQuantity(@PathVariable("cartItemId") Integer cartItemId) {
        cartService.decreaseQuantity(cartItemId);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Quantity decreased!")
                .build();
    }

    @GetMapping("/{accountId}")
    @PreAuthorize("hasAuthority('CART_GET')")
    public ApiResponse<CartEntity> getCart(@PathVariable Long accountId) {
        return ApiResponse.<CartEntity>builder()
                .code(200)
                .result(cartService.getCartByAccountId(accountId))
                .build();
    }

    @GetMapping("/cart-items/{cartId}")
    @PreAuthorize("hasAuthority('CART_GET')")
    public ApiResponse<List<CartItemEntity>> getCartItemsByCartId(@PathVariable Integer cartId) {
        return ApiResponse.<List<CartItemEntity>>builder()
                .code(200)
                .result(cartService.getCartItemsByCartId(cartId))
                .build();
    }

    @GetMapping("/total-items/{accountId}")
    @PreAuthorize("hasAuthority('CART_GET')")
    public Double getTotalItemsInCart(@PathVariable Long accountId) {
        return ApiResponse.<Double>builder()
                .code(200)
                .result(Double.valueOf(cartService.getTotalItemsInCart(accountId)))
                .build().getResult();
    }

    @GetMapping("/my-cart")
    @PreAuthorize("hasAuthority('CART_GET')")
    public ApiResponse<CartEntity> getMyCart() {
        return ApiResponse.<CartEntity>builder()
                .code(200)
                .result(cartService.getMyCart())
                .build();
    }
}
