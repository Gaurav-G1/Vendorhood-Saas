package com.vendorhood.backend.repository;

import com.vendorhood.backend.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT COUNT(*) FROM orders", nativeQuery = true)
    long countAllOrdersGlobal();

    @Query(value = "SELECT COALESCE(SUM(total_amount), 0.0) FROM orders", nativeQuery = true)
    double sumTotalAmountGlobal();

    @Query(value = "SELECT COALESCE(SUM(platform_commission), 0.0) FROM orders", nativeQuery = true)
    double sumPlatformCommissionGlobal();

    @Query(value = "SELECT * FROM orders", nativeQuery = true)
    List<Order> findAllOrdersGlobal();
}
