package com.amadeusz.sneakershop;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SneakerRepository extends MongoRepository<Sneaker, String> {
    Optional<Sneaker> findSneakerBySku(String sku);
    Page<Sneaker> findAll(Pageable pageable);
}
