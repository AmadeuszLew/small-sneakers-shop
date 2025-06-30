package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    private String sneakerSku;
    private String sneakerName;
    private String sneakerBrand;
    private Double size;
    private Integer quantity;
    private BigDecimal price;
    private String imagePath;
}
