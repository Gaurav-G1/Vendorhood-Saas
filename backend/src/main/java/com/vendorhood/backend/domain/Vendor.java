package com.vendorhood.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String subdomain;

    @Column(name = "custom_domain", unique = true)
    private String customDomain;

    @Column(name = "template_id")
    private Integer templateId;

    @Column(name = "commission_rate")
    private Double commissionRate;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;
}
