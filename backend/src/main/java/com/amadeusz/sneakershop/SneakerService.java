package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SneakerService {

    private final SneakerRepository sneakerRepository;

    public List<Sneaker> getAllSneakers(){
        return sneakerRepository.findAll();
    }
}
