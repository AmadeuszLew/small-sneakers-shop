package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/sneakers")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class SneakerController {

    private final SneakerService sneakerService;

    @GetMapping
    public List<Sneaker> getSneakers() {
        return sneakerService.getAllSneakers();
    }
}
