package com.amadeusz.sneakershop;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateOrderRequest {
    private List<OrderItemRequest> items;
    private String shippingAddress;
    private String customerName;

    @Data
    public static class OrderItemRequest {
        private String sneakerSku;
        private Double size;
        private Integer quantity;
        private BigDecimal price;
    }
}
