package com.amadeusz.sneakershop;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SneakerRepository extends MongoRepository<Sneaker, String> {
}
