package site.laptopshop.backend.configuration;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import site.sugarnest.backend.constant.PredefinedRole;
import site.sugarnest.backend.constant.PredefinedPermission;
import site.sugarnest.backend.entities.AccountEntity;
import site.sugarnest.backend.entities.RoleEntity;
import site.sugarnest.backend.entities.PermissionEntity;
import site.sugarnest.backend.reponsitories.IAccountRepository;
import site.sugarnest.backend.reponsitories.IPermissionRepository;
import site.sugarnest.backend.reponsitories.IRoleRepository;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    static final String ADMIN_USER_NAME = "admin";
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(IAccountRepository userRepository, IRoleRepository roleRepository, IPermissionRepository permissionRepository) {
        log.info("Initializing application.....");
        return args -> {
            if (userRepository.findByAccountName(ADMIN_USER_NAME).isEmpty()) {

                // Initialize permissions

                PermissionEntity adminPanelPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ADMIN_PANEL, "Admin panel"));

                // Product permissions

                PermissionEntity getProductsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.PRODUCTS_GET, "Xem danh sách sản phẩm"));
                PermissionEntity putProductsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.PRODUCTS_PUT, "Chỉnh sửa sản phẩm"));
                PermissionEntity postProductsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.PRODUCTS_POST, "Thêm sản phẩm"));
                PermissionEntity deleteProductsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.PRODUCTS_DELETE, "Xóa sản phẩm"));
                // Order permissions

                PermissionEntity getOrdersPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ORDERS_GET, "Xem danh sách đơn hàng"));
                PermissionEntity putOrdersPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ORDERS_PUT, "Chỉnh sửa đơn hàng"));
                PermissionEntity postOrdersPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ORDERS_POST, "Thêm đơn hàng"));
                PermissionEntity deleteOrdersPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ORDERS_DELETE, "Xóa đơn hàng"));
                // Sales permissions

                PermissionEntity getSalesPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.SALES_GET, "Xem danh sách doanh số"));
                PermissionEntity putSalesPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.SALES_PUT, "Chỉnh sửa doanh số"));
                PermissionEntity postSalesPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.SALES_POST, "Thêm doanh số"));
                PermissionEntity deleteSalesPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.SALES_DELETE, "Xóa doanh số"));
                // Cart permissions

                PermissionEntity getCartPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.CART_GET, "Xem danh sách giỏ hàng"));
                PermissionEntity putCartPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.CART_PUT, "Chỉnh sửa giỏ hàng"));
                PermissionEntity postCartPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.CART_POST, "Thêm giỏ hàng"));
                PermissionEntity deleteCartPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.CART_DELETE, "Xóa giỏ hàng"));
                // Account permissions
                PermissionEntity postAccountsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ACCOUNTS_POST, "Thêm tài khoản"));
                PermissionEntity putAccountsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ACCOUNTS_PUT, "Chỉnh sửa tài khoản"));
                PermissionEntity getAccountsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ACCOUNTS_GET, "Xem danh sách tài khoản"));
                PermissionEntity deleteAccountsPermission = permissionRepository.save(new PermissionEntity(PredefinedPermission.ACCOUNTS_DELETE, "Xóa Quản lý tài khoản"));

                // Create roles and assign permissions
                RoleEntity adminRole = roleRepository.save(new RoleEntity(PredefinedRole.ADMIN_ROLE, "Quản trị viên", Set.of(
                        getProductsPermission, putProductsPermission, postProductsPermission, deleteProductsPermission,
                        getOrdersPermission, putOrdersPermission, postOrdersPermission, deleteOrdersPermission,
                        getSalesPermission, putSalesPermission, postSalesPermission, deleteSalesPermission,
                        getCartPermission, putCartPermission, postCartPermission, deleteCartPermission,
                        postAccountsPermission, putAccountsPermission, getAccountsPermission, deleteAccountsPermission,adminPanelPermission
                )));
                RoleEntity userRole = roleRepository.save(new RoleEntity(PredefinedRole.USER_ROLE, "Người dùng", Set.of(getCartPermission, putCartPermission, postCartPermission, deleteCartPermission)));
                RoleEntity productManagerRole = roleRepository.save(new RoleEntity(PredefinedRole.PRODUCT_MANAGER_ROLE, "Quản lý sản phẩm", new HashSet<>()));
                RoleEntity orderManagerRole = roleRepository.save(new RoleEntity(PredefinedRole.ORDER_MANAGER_ROLE, "Quản lý đơn hàng", new HashSet<>()));
                RoleEntity salesManagerRole = roleRepository.save(new RoleEntity(PredefinedRole.SALES_MANAGER_ROLE, "Quản lý doanh số", new HashSet<>()));

                // Create admin account
                AccountEntity adminUser = AccountEntity.builder()
                        .accountName(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .currentPassword(passwordEncoder.encode(ADMIN_PASSWORD))
                        .fullName("Admin")
                        .address("Admin address")
                        .email("admin@gmail.com")
                        .phone("123456789")
                        .isActive("true")
                        .enabled("true")
                        .isDelete("false")
                        .number_login_fail(0)
                        .birthday(new Date())
                        .roles(Set.of(adminRole))
                        .build();

                userRepository.save(adminUser);
                log.warn("Admin user has been created with default password: admin, please change it");
            }
            log.info("Application initialization completed .....");
        };
    }
}
