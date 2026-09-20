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
@Table(name = "products")
public class Product {

    @Id
    private String id;

    @TenantId
    @Column(name = "tenant_id", nullable = false)
    private String tenantId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(length = 1000)
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "hover_image_url", length = 500)
    private String hoverImageUrl;

    @Column(name = "size_preview", length = 255)
    private String sizePreview;

    @Column(name = "is_trending")
    private Boolean isTrending;

    @Column(name = "is_limited")
    private Boolean isLimited;

    @Column(name = "is_streetwear")
    private Boolean isStreetwear;

    @Column(name = "is_best_seller")
    private Boolean isBestSeller;

    @Column(length = 255)
    private String origin;

    @Column(length = 255)
    private String weight;

    @Column(length = 255)
    private String cuisine;
}
