package com.vendorhood.backend.controller;

import com.vendorhood.backend.domain.Order;
import com.vendorhood.backend.domain.Product;
import com.vendorhood.backend.domain.Vendor;
import com.vendorhood.backend.repository.OrderRepository;
import com.vendorhood.backend.repository.ProductRepository;
import com.vendorhood.backend.repository.VendorRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/vendors")
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    @PostMapping("/vendors")
    public Vendor createVendor(@RequestBody Vendor vendor) {
        if (vendor.getId() == null || vendor.getId().trim().isEmpty()) {
            vendor.setId("v" + System.currentTimeMillis());
        }
        if (vendor.getLogoUrl() == null || vendor.getLogoUrl().trim().isEmpty()) {
            vendor.setLogoUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=60");
        }
        return vendorRepository.save(vendor);
    }

    @PutMapping("/vendors")
    public Vendor updateVendor(@RequestBody Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    @DeleteMapping("/vendors/{id}")
    @Transactional
    public Map<String, Boolean> deleteVendor(@PathVariable String id) {
        // Cascade delete products and orders natively to bypass Hibernate @TenantId filter
        entityManager.createNativeQuery("DELETE FROM products WHERE tenant_id = :tenantId")
                .setParameter("tenantId", id)
                .executeUpdate();

        entityManager.createNativeQuery("DELETE FROM orders WHERE tenant_id = :tenantId")
                .setParameter("tenantId", id)
                .executeUpdate();

        vendorRepository.deleteById(id);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAllProductsGlobal();
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAllOrdersGlobal();
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("vendorsCount", vendorRepository.count());
        stats.put("productsCount", productRepository.countAllProductsGlobal());
        stats.put("sales", orderRepository.sumTotalAmountGlobal());
        stats.put("commission", orderRepository.sumPlatformCommissionGlobal());
        return stats;
    }
}
