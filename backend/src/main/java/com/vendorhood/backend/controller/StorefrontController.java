package com.vendorhood.backend.controller;

import com.vendorhood.backend.config.TenantContext;
import com.vendorhood.backend.domain.Order;
import com.vendorhood.backend.domain.Product;
import com.vendorhood.backend.domain.Vendor;
import com.vendorhood.backend.repository.OrderRepository;
import com.vendorhood.backend.repository.ProductRepository;
import com.vendorhood.backend.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/storefront")
public class StorefrontController {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/info")
    public Vendor getStorefrontInfo() {
        String activeTenantId = TenantContext.getCurrentTenant();
        if (activeTenantId == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No storefront DNS resolved");
        }
        return vendorRepository.findById(activeTenantId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Storefront vendor not found"));
    }

    @GetMapping("/products")
    public List<Product> getStorefrontProducts() {
        // Automatically isolated by Hibernate @TenantId
        return productRepository.findAll();
    }

    @PostMapping("/orders")
    public Order createStorefrontOrder(@RequestBody Order orderInput) {
        String activeTenantId = TenantContext.getCurrentTenant();
        if (activeTenantId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tenant context resolution failed");
        }
        Vendor vendor = vendorRepository.findById(activeTenantId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found"));

        double totalAmount = orderInput.getTotalAmount();
        double commissionRate = vendor.getCommissionRate();
        
        // Calculate transaction payment split
        double platformCommission = Math.round(totalAmount * (commissionRate / 100.0) * 100.0) / 100.0;
        double vendorShare = Math.round((totalAmount - platformCommission) * 100.0) / 100.0;

        Order order = Order.builder()
                .id("o" + System.currentTimeMillis())
                .customerName(orderInput.getCustomerName())
                .totalAmount(totalAmount)
                .platformCommission(platformCommission)
                .vendorShare(vendorShare)
                .status("Pending")
                .date(new SimpleDateFormat("yyyy-MM-dd").format(new Date()))
                .build();

        // Save order and deduct stock locally (simulated)
        Order savedOrder = orderRepository.save(order);
        return savedOrder;
    }

    @GetMapping("/customer-orders")
    public List<Order> getCustomerOrders(@RequestParam String customerName) {
        // Fetch orders for this resolved tenant and customer
        // Hibernate filters by tenant_id under the hood
        return orderRepository.findAll().stream()
                .filter(o -> o.getCustomerName().equalsIgnoreCase(customerName.trim()))
                .toList();
    }
}
