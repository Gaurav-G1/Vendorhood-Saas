package com.vendorhood.backend.repository;

import com.vendorhood.backend.domain.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {
    Optional<Vendor> findBySubdomain(String subdomain);
    Optional<Vendor> findByCustomDomain(String customDomain);
}
