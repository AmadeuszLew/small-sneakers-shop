package com.amadeusz.sneakershop;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserIdOrderByOrderDateDesc(String userId);
    List<Order> findByUserEmailOrderByOrderDateDesc(String userEmail);
    Optional<Order> findByOrderNumber(String orderNumber);
}
