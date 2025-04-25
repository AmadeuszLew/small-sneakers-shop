package com.amadeusz.sneakershop;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SneakerRepository extends MongoRepository<Sneaker, String> {
    Optional<Sneaker> findSneakerBySku(String sku);
}
