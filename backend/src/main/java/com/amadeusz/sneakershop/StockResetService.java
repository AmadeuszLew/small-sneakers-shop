package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class StockResetService {
    
    private final SneakerRepository sneakerRepository;

    // Reset stock every day at midnight
    @Scheduled(cron = "0 0 0 * * *")
    public void resetDailyStock() {
        System.out.println("Resetting daily stock...");
        
        // Clear existing sneakers
        sneakerRepository.deleteAll();
        
        // Re-initialize with original stock
        initializeStock();
        
        System.out.println("Stock reset completed!");
    }

    public void initializeStock() {
        Sneaker sneaker = new Sneaker(
                "555088-711",
                "Jordan 1",
                "Taxi",
                "Jordan",
                "TAXI/BLACK-SAIL",
                BigDecimal.valueOf(999),
                "assets/img/list_items/jordan_1_taxi.jpeg",
                List.of(
                        new SizeAvailability(36, 1),
                        new SizeAvailability(36.5, 4),
                        new SizeAvailability(37, 0),
                        new SizeAvailability(37.5, 22),
                        new SizeAvailability(38, 15),
                        new SizeAvailability(38.5, 11),
                        new SizeAvailability(39, 12),
                        new SizeAvailability(39.5, 0),
                        new SizeAvailability(40, 3),
                        new SizeAvailability(40.5, 2),
                        new SizeAvailability(41, 0),
                        new SizeAvailability(41.5, 1),
                        new SizeAvailability(42, 4),
                        new SizeAvailability(42.5, 0),
                        new SizeAvailability(43, 2),
                        new SizeAvailability(43.5, 1),
                        new SizeAvailability(44, 2),
                        new SizeAvailability(44.5, 0),
                        new SizeAvailability(45, 0),
                        new SizeAvailability(45.5, 0),
                        new SizeAvailability(46, 1)
                )
        );

        sneakerRepository.findSneakerBySku("555088-711").ifPresentOrElse(
                existingSneaker -> System.out.println("Sneaker already exists: " + existingSneaker),
                () -> {
                    System.out.println("Adding new sneaker to stock");
                    sneakerRepository.save(sneaker);
                }
        );

        // Add more sneakers here based on your frontend data
        // This is just an example - you can add all the sneakers from your frontend service
    }

    // Manual reset endpoint for testing
    public void manualReset() {
        resetDailyStock();
    }
}
