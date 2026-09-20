package com.vendorhood.backend.repository;

import com.vendorhood.backend.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    @Query(value = "SELECT COUNT(*) FROM products", nativeQuery = true)
    long countAllProductsGlobal();

    @Query(value = "SELECT * FROM products", nativeQuery = true)
    List<Product> findAllProductsGlobal();
}
