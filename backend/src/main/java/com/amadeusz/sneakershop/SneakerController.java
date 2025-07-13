package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sneakers")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class SneakerController {

    private final SneakerService sneakerService;

    @GetMapping
    public List<Sneaker> getSneakers(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Boolean onSale,
            @RequestParam(required = false) String search) {
        
        return sneakerService.getSneakers(brand, model, onSale, search);
    }

    @GetMapping("/{sku}")
    public Sneaker getSneakerBySku(@PathVariable String sku) {
        return sneakerService.getSneakerBySku(sku)
            .orElseThrow(() -> new RuntimeException("Sneaker not found"));
    }
}
