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

import java.util.List;

@RestController
@RequestMapping("/api/vendor")
public class VendorController {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/products")
    public List<Product> getProducts() {
        // Enforced by Hibernate @TenantId automatically
        return productRepository.findAll();
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        if (product.getId() == null || product.getId().trim().isEmpty()) {
            product.setId("p" + System.currentTimeMillis());
        }
        // tenantId is populated by Hibernate context
        return productRepository.save(product);
    }

    @PutMapping("/products")
    public Product updateProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        // Enforced by Hibernate @TenantId automatically
        return orderRepository.findAll();
    }

    @PutMapping("/orders/{id}/status")
    public Order updateOrderStatus(@PathVariable String id, @RequestParam String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @PutMapping("/profile")
    public Vendor updateProfile(@RequestBody Vendor updatedProfile) {
        String activeTenantId = TenantContext.getCurrentTenant();
        if (activeTenantId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No active tenant context found");
        }
        Vendor vendor = vendorRepository.findById(activeTenantId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tenant profile not found"));
        
        vendor.setName(updatedProfile.getName());
        vendor.setTemplateId(updatedProfile.getTemplateId());
        vendor.setLogoUrl(updatedProfile.getLogoUrl());
        vendor.setCustomDomain(updatedProfile.getCustomDomain());
        
        return vendorRepository.save(vendor);
    }
}
