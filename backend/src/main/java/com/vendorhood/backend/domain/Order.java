package com.vendorhood.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.TenantId;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    @TenantId
    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "platform_commission", nullable = false)
    private Double platformCommission;

    @Column(name = "vendor_share", nullable = false)
    private Double vendorShare;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String date;
}
