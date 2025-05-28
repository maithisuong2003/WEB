package site.laptopshop.backend.service.order;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.laptopshop.backend.dto.request.OrderRequest;
import site.laptopshop.backend.dto.response.OrderResponse;
import site.laptopshop.backend.entities.*;
import site.laptopshop.backend.mapper.IOrderMapper;
import site.laptopshop.backend.reponsitoties.*;
import site.laptopshop.backend.service.account.IAccountService;
import site.laptopshop.backend.service.cart.CartService;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IAccountService iaccountService;

    @Autowired
    private ICartRepository iCartRepository;

    @Autowired
    private ICartItemRepository iCartItemRepository;

    @Autowired
    private IOrderDetailRepository iOrderDetailRepository;

    @Autowired
    private IOrderRepository iorderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ICartRepository cartRepository;


    @Autowired
    private IOrderMapper orderMapper;

    @Autowired
    private IInventoryRepository iInventoryRepository;

    @Autowired
    ISizeColorProductRepository iSizeColorProductRepository;

    @Override
    @Transactional
    public OrderResponse saveOrder(OrderRequest orderRequest) {
        CartEntity cart = cartService.getMyCart();
        List<CartItemEntity> cartItems = cart.getCartItems();
        OrderEntity order = getOrderEntity(orderRequest, cart);
        if (orderRequest.getStatusPay()!=null && orderRequest.getStatusPay().equals("Đã thanh toán")){
            order.setStatusPay("Đã thanh toán");
        }else {
            order.setStatusPay("Chưa thanh toán");
        }
        iorderRepository.save(order);

        for (CartItemEntity cartItem : cartItems) {
            OrderDetailEntity orderDetail = new OrderDetailEntity();
            orderDetail.setPrice(cartItem.getPrice());
            orderDetail.setProductColor(cartItem.getProductColor());
            orderDetail.setProductSize(cartItem.getProductSize());
            orderDetail.setQuantity(cartItem.getQuantity());
            orderDetail.setProductEntity(cartItem.getProductEntity());
            orderDetail.setOrderEntity(order);
            order.getOrderItems().add(orderDetail);
            Long productId = cartItem.getProductEntity().getId();
            SizeColorProductEntity sizeColorProduct = iSizeColorProductRepository.findByProductEntityIdAndSizeAndColor(productId, cartItem.getProductSize(), cartItem.getProductColor());
            InventoryEntity inventory = sizeColorProduct.getInventoryEntity();
            if(inventory.getQuantity() < cartItem.getQuantity()){
                return null;
            }
            inventory.setQuantity(inventory.getQuantity() - cartItem.getQuantity());
            iInventoryRepository.save(inventory);
            iOrderDetailRepository.save(orderDetail);
            iCartItemRepository.delete(cartItem);
        }
        cart.getCartItems().removeAll(cartItems);
        cart.setUpdatedAt(new Date());
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
        return orderMapper.toOrderEntity(order);
    }

    private OrderEntity getOrderEntity(OrderRequest orderRequest, CartEntity cart) {
        OrderEntity order = new OrderEntity();
        order.setAddress(orderRequest.getAddress());
        order.setDeliveryAt(orderRequest.getDeliveryAt());
        order.setNote(orderRequest.getNote());
        order.setSale(orderRequest.getSale());
        order.setCreateAt(new Date());
        order.setUpdateAt(new Date());
        order.setFree_ship(40000.0);
        order.setAccountEntity(cart.getAccountEntity());
        order.setStatus("Chờ xác nhận");
        order.setTotalPrice(cart.getTotalPrice());
        return order;
    }

    @Override
    public List<OrderResponse> getOrders() {
        AccountEntity accountEntity = iaccountService.getAccount();
        List<OrderEntity> orderEntitieslist = iorderRepository.findByAccountEntity(accountEntity);
        List<OrderResponse> orderResponseListlist = new ArrayList<>();
        for (OrderEntity order : orderEntitieslist) {
            OrderResponse orderResponse = orderMapper.toOrderEntity(order);
            orderResponseListlist.add(orderResponse);
        }
        return orderResponseListlist;
    }

    @Override
    public List<OrderResponse> getOrdersByAdmin() {
        List<OrderEntity> orderEntitieslist = iorderRepository.findAll();
        List<OrderResponse> orderResponseListlist = new ArrayList<>();
        for (OrderEntity order : orderEntitieslist) {
            OrderResponse orderResponse = orderMapper.toOrderEntity(order);
            orderResponseListlist.add(orderResponse);
        }
        return orderResponseListlist;
    }

    @Override
    public OrderResponse getOrderById(Integer orderId) {
        Optional<OrderEntity> orderEntity = iorderRepository.findById(orderId);
        if (orderEntity.isPresent()) {
            OrderEntity order = orderEntity.get();
            return orderMapper.toOrderEntity(order);
        }
        return null;
    }

    @Override
    public void updateOrderStatus(Integer orderId, String status) {
        Optional<OrderEntity> orderEntity = iorderRepository.findById(orderId);
        if (orderEntity.isPresent()) {
            OrderEntity order = orderEntity.get();
            order.setStatus(status);
            iorderRepository.save(order);
        }
    }

    @Override
    public void cancelOrder(Integer orderId) {
        AccountEntity accountEntity = iaccountService.getAccount();
        List<OrderEntity> orderEntitieslist = iorderRepository.findByAccountEntity(accountEntity);
        for (OrderEntity order : orderEntitieslist) {
            if (order.getId().equals(orderId) && order.getStatus().equals("Chờ xác nhận")) {
                order.setStatus("Đã hủy");
                iorderRepository.save(order);
            }
        }
    }

    @Override
    public Long getTotalOrders() {
        return iorderRepository.count();
    }

    @Override
    public Double getTotalAmount() {
        List<OrderEntity> orderEntitieslist = iorderRepository.findAll();
        Double totalAmount = 0.0;
        for (OrderEntity order : orderEntitieslist) {
            totalAmount += order.getTotalPrice();
        }
        return totalAmount;
    }

    @Override
    public Map<String, Double> getMonthlyRevenue(int startMonth, int startYear, int endMonth, int endYear) {
        Calendar startCal = Calendar.getInstance();
        startCal.set(Calendar.MONTH, startMonth - 1);
        startCal.set(Calendar.YEAR, startYear);
        startCal.set(Calendar.DAY_OF_MONTH, 1);

        Calendar endCal = Calendar.getInstance();
        endCal.set(Calendar.MONTH, endMonth - 1);
        endCal.set(Calendar.YEAR, endYear);
        endCal.set(Calendar.DAY_OF_MONTH, endCal.getActualMaximum(Calendar.DAY_OF_MONTH));

        List<OrderEntity> orders = iorderRepository.findAll();

        List<OrderEntity> filteredOrders = orders.stream()
                .filter(order -> !order.getCreateAt().before(startCal.getTime()) && !order.getCreateAt().after(endCal.getTime()))
                .collect(Collectors.toList());

        Map<String, Double> monthlyRevenue = filteredOrders.stream().collect(Collectors.groupingBy(
                order -> {
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(order.getCreateAt());
                    return cal.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());
                },
                Collectors.summingDouble(OrderEntity::getTotalPrice)
        ));

        return monthlyRevenue;
    }

    @Override
    public Map<String, Double> getRevenueByCategoryForMonth(int month, int year) {
        List<OrderEntity> orders = iorderRepository.findAll();
        Map<String, Double> revenueByCategory = new HashMap<>();

        for (OrderEntity order : orders) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(order.getCreateAt());
            int orderMonth = cal.get(Calendar.MONTH) + 1; // Calendar.MONTH is zero-based
            int orderYear = cal.get(Calendar.YEAR);

            if (orderMonth == month && orderYear == year) {
                for (OrderDetailEntity detail : order.getOrderItems()) {
                    String category = detail.getProductEntity().getCategoryEntity().getNameCategory();
                    Double revenue = detail.getPrice() * detail.getQuantity();
                    revenueByCategory.put(category, revenueByCategory.getOrDefault(category, 0.0) + revenue);
                }
            }
        }

        return revenueByCategory;
    }
}
