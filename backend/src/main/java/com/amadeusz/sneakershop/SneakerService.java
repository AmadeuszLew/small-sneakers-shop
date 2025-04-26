package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SneakerService {

    private final SneakerRepository sneakerRepository;

    public Optional<Sneaker> getSneakerBySku(String sku) {
        return sneakerRepository.findSneakerBySku(sku);
    }

    public Page<Sneaker> getSneakersWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return sneakerRepository.findAll(pageable);
    }
}
