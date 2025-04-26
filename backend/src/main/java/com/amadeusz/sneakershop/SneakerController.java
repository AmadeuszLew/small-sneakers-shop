package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/sneakers")
@AllArgsConstructor
public class SneakerController {

    private final SneakerService sneakerService;

    @GetMapping
    public List<Sneaker> getSneakers() {
        return sneakerService.getAllSneakers();
    }

    @GetMapping("/{sku}")
    public Sneaker getSneakerBySku(@PathVariable String sku) {
        return sneakerService.getSneakerBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Sneaker with SKU " + sku + " not found"));
    }
}
