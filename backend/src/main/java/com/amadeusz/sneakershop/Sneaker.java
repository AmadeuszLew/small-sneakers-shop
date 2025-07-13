package com.amadeusz.sneakershop;

import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;
@Data
@Document
@NoArgsConstructor
public class Sneaker {
    @Id
    private String id;
    @Indexed(unique = true)
    private String sku;
    private String model;
    private String name;
    private String brand;
    private String colorway;
    private BigDecimal price;
    private String imagePath;
    private List<SizeAvailability> sizesOfShoe;
    private boolean onSale = false;

    public Sneaker(String sku, String model, String name, String brand, String colorway, BigDecimal price, String imagePath, List<SizeAvailability> sizesOfShoe) {
        this.sku = sku;
        this.model = model;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.imagePath = imagePath;
        this.sizesOfShoe = sizesOfShoe;
        this.colorway = colorway;
    }

    public Sneaker(String sku, String model, String name, String brand, String colorway, BigDecimal price,
                   String imagePath, List<SizeAvailability> sizesOfShoe, boolean onSale) {
        this(sku, model, name, brand, colorway, price, imagePath, sizesOfShoe);
        this.onSale = onSale;
    }
}
