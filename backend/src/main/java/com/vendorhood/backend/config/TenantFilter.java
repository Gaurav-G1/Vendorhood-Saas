package com.vendorhood.backend.config;

import com.vendorhood.backend.domain.Vendor;
import com.vendorhood.backend.repository.VendorRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class TenantFilter implements Filter {

    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // 1. Check direct X-Tenant-ID header (simulation environment)
        String tenantId = httpRequest.getHeader("X-Tenant-ID");

        if (tenantId == null || tenantId.trim().isEmpty()) {
            // 2. Check X-Simulated-Host header
            String host = httpRequest.getHeader("X-Simulated-Host");
            if (host == null || host.trim().isEmpty()) {
                // 3. Fallback to actual Host header
                host = httpRequest.getHeader("Host");
            }

            if (host != null && !host.trim().isEmpty()) {
                tenantId = resolveTenantByHost(host);
            }
        }

        if (tenantId != null && !tenantId.trim().isEmpty()) {
            TenantContext.setCurrentTenant(tenantId);
        } else {
            // Default context for global routes (like admin endpoints)
            TenantContext.setCurrentTenant(null);
        }

        try {
            chain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }

    private String resolveTenantByHost(String host) {
        String cleanHost = host.toLowerCase().trim().split(":")[0]; // remove port if present

        // Check if cleanHost is a subdomain (e.g., techpulse.vendorhood.com or techpulse.localhost)
        if (cleanHost.endsWith(".vendorhood.com") || cleanHost.endsWith(".localhost")) {
            String subdomain = cleanHost.split("\\.")[0];
            if (!subdomain.equals("www") && !subdomain.equals("vendorhood") && !subdomain.equals("localhost")) {
                Optional<Vendor> v = vendorRepository.findBySubdomain(subdomain);
                if (v.isPresent()) {
                    return v.get().getId();
                }
            }
        }

        // Check if cleanHost matches a custom domain mapping
        Optional<Vendor> v = vendorRepository.findByCustomDomain(cleanHost);
        if (v.isPresent()) {
            return v.get().getId();
        }

        return null;
    }
}
