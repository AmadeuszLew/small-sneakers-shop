package com.amadeusz.sneakershop;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Document
@NoArgsConstructor
public class Order {
    @Id
    private String id;
    
    private String userId;
    private String userEmail;
    private String orderNumber;
    private List<OrderItem> items;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private String shippingAddress;
    private String customerName;

    public Order(String userId, String userEmail, List<OrderItem> items, BigDecimal totalAmount, 
                String shippingAddress, String customerName) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.orderNumber = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        this.items = items;
        this.totalAmount = totalAmount;
        this.status = OrderStatus.PENDING;
        this.orderDate = LocalDateTime.now();
        this.shippingAddress = shippingAddress;
        this.customerName = customerName;
    }
}
