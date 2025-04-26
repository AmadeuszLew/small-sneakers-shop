package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sneakers")
@AllArgsConstructor
public class SneakerController {

    private final SneakerService sneakerService;

    @GetMapping
    public Page<Sneaker> getSneakers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return sneakerService.getSneakersWithPagination(page, size);
    }

    @GetMapping("/{sku}")
    public Sneaker getSneakerBySku(@PathVariable String sku) {
        return sneakerService.getSneakerBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Sneaker with SKU " + sku + " not found"));
    }
}
