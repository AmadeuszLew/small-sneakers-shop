package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SneakerService {

    private final SneakerRepository sneakerRepository;

    public List<Sneaker> getAllSneakers(){
        return sneakerRepository.findAll();
    }

    public Optional<Sneaker> getSneakerBySku(String sku) {
        return sneakerRepository.findSneakerBySku(sku);
    }
}
