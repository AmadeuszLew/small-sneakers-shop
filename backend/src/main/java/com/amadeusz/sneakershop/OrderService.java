package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final SneakerRepository sneakerRepository;

    public Order createOrder(String userEmail, CreateOrderRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();
        
        List<OrderItem> orderItems = request.getItems().stream()
            .map(itemRequest -> {
                Optional<Sneaker> sneakerOpt = sneakerRepository.findSneakerBySku(itemRequest.getSneakerSku());
                if (sneakerOpt.isEmpty()) {
                    throw new RuntimeException("Sneaker not found: " + itemRequest.getSneakerSku());
                }
                
                Sneaker sneaker = sneakerOpt.get();
                
                // Check if size is available
                boolean sizeAvailable = sneaker.getSizesOfShoe().stream()
                    .anyMatch(size -> size.getSize() == itemRequest.getSize() && size.getAvailability() >= itemRequest.getQuantity());
                
                if (!sizeAvailable) {
                    throw new RuntimeException("Size " + itemRequest.getSize() + " not available for " + sneaker.getModel());
                }

                return new OrderItem(
                    sneaker.getSku(),
                    sneaker.getBrand() + " " + sneaker.getModel() + " " + sneaker.getName(),
                    sneaker.getBrand(),
                    itemRequest.getSize(),
                    itemRequest.getQuantity(),
                    sneaker.getPrice(),
                    sneaker.getImagePath()
                );
            })
            .collect(Collectors.toList());

        BigDecimal totalAmount = orderItems.stream()
            .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order(
            user.getId(),
            user.getEmail(),
            orderItems,
            totalAmount,
            request.getShippingAddress(),
            request.getCustomerName()
        );

        // Update sneaker inventory
        updateInventory(orderItems);

        return orderRepository.save(order);
    }

    private void updateInventory(List<OrderItem> orderItems) {
        for (OrderItem item : orderItems) {
            Optional<Sneaker> sneakerOpt = sneakerRepository.findSneakerBySku(item.getSneakerSku());
            if (sneakerOpt.isPresent()) {
                Sneaker sneaker = sneakerOpt.get();
                sneaker.getSizesOfShoe().stream()
                    .filter(size -> size.getSize() == item.getSize())
                    .findFirst()
                    .ifPresent(size -> {
                        size.setAvailability(size.getAvailability() - item.getQuantity());
                        sneakerRepository.save(sneaker);
                    });
            }
        }
    }

    public List<Order> getUserOrders(String userEmail) {
        return orderRepository.findByUserEmailOrderByOrderDateDesc(userEmail);
    }

    public Optional<Order> getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
