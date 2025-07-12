package com.amadeusz.sneakershop;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
@EnableScheduling
public class SneakershopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SneakershopApplication.class, args);
    }    @Bean
    CommandLineRunner runner(SneakerRepository repository, MongoTemplate mongoTemplate) {
        return args -> {
            List<Sneaker> sneakersToAdd = List.of(
                new Sneaker(
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
                ),
                new Sneaker(
                    "HP7870",
                    "Yeezy 350 v2",
                    "Slate",
                    "Yeezy",
                    "Slate",
                    BigDecimal.valueOf(999),
                    "assets/img/list_items/yeezy_350v2_Salte.jpg",
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
                ),
                new Sneaker(
                    "GW6373",
                    "Yeezy 500",
                    "Granite",
                    "Yeezy",
                    "Granite",
                    BigDecimal.valueOf(999),
                    "assets/img/list_items/yeezy_500_granite.jpg",
                    List.of(
                        new SizeAvailability(36, 0),
                        new SizeAvailability(36.5, 0),
                        new SizeAvailability(37, 0),
                        new SizeAvailability(37.5, 0),
                        new SizeAvailability(38, 0),
                        new SizeAvailability(38.5, 0),
                        new SizeAvailability(39, 12),
                        new SizeAvailability(39.5, 0),
                        new SizeAvailability(40, 0),
                        new SizeAvailability(40.5, 2),
                        new SizeAvailability(41, 0),
                        new SizeAvailability(41.5, 1),
                        new SizeAvailability(42, 4),
                        new SizeAvailability(42.5, 0),
                        new SizeAvailability(43, 2),
                        new SizeAvailability(43.5, 1),
                        new SizeAvailability(44, 0),
                        new SizeAvailability(44.5, 0),
                        new SizeAvailability(45, 1),
                        new SizeAvailability(45.5, 0),
                        new SizeAvailability(46, 1)
                    )
                ),
                new Sneaker(
                    "DB2908",
                    "Yeezy 500",
                    "Blush",
                    "Yeezy",
                    "Blush",
                    BigDecimal.valueOf(999),
                    "assets/img/list_items/yeezy_500.png",
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
                    ),
                        true
                ),
                new Sneaker(
                    "FZ5897",
                    "Yeezy Slide",
                    "Bone (2022 restock)",
                    "Yeezy",
                    "Bone",
                    BigDecimal.valueOf(449),
                    "assets/img/list_items/slide_bone.jpg",
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
                ),
                new Sneaker(
                    "H06426",
                    "ADI2000",
                    "Yu-Gi-Oh! Blue Eyes White Dragon",
                    "Adidas",
                    "WHITE/FOOTWEAR WHITE/BOLD BLUE",
                    BigDecimal.valueOf(499),
                    "assets/img/list_items/adi200.png",
                    List.of(
                        new SizeAvailability(36, 1),
                        new SizeAvailability(36.5, 4),
                        new SizeAvailability(37, 0),
                        new SizeAvailability(37.5, 2),
                        new SizeAvailability(38, 6),
                        new SizeAvailability(38.5, 0),
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
                        new SizeAvailability(44.5, 4),
                        new SizeAvailability(45, 6),
                        new SizeAvailability(45.5, 2),
                        new SizeAvailability(46, 1)
                    )
                ),
                new Sneaker(
                    "DX3722-001",
                    "Dunk low",
                    "Wolf Grey Pure Platinum",
                    "Nike",
                    "PURE PLATINUM/WHITE-WOLF GREY",
                    BigDecimal.valueOf(899),
                    "assets/img/list_items/pure_platinium.jpg",
                    List.of(
                        new SizeAvailability(36, 1),
                        new SizeAvailability(36.5, 4),
                        new SizeAvailability(37, 0),
                        new SizeAvailability(37.5, 4),
                        new SizeAvailability(38, 15),
                        new SizeAvailability(38.5, 2),
                        new SizeAvailability(39, 12),
                        new SizeAvailability(39.5, 0),
                        new SizeAvailability(40, 3),
                        new SizeAvailability(40.5, 2),
                        new SizeAvailability(41, 0),
                        new SizeAvailability(41.5, 1),
                        new SizeAvailability(42, 4),
                        new SizeAvailability(42.5, 1),
                        new SizeAvailability(43, 2),
                        new SizeAvailability(43.5, 1),
                        new SizeAvailability(44, 2),
                        new SizeAvailability(44.5, 4),
                        new SizeAvailability(45, 0),
                        new SizeAvailability(45.5, 0),
                        new SizeAvailability(46, 1)
                    )
                ),
                new Sneaker(
                    "304292-601",
                    "Dunk low",
                    "Pure Blood",
                    "Nike",
                    "TRUE RED/BLACK",
                    BigDecimal.valueOf(6889),
                    "assets/img/list_items/pure_blood.jpeg",
                    List.of(
                        new SizeAvailability(36, 0),
                        new SizeAvailability(36.5, 0),
                        new SizeAvailability(37, 0),
                        new SizeAvailability(37.5, 0),
                        new SizeAvailability(38, 0),
                        new SizeAvailability(38.5, 0),
                        new SizeAvailability(39, 0),
                        new SizeAvailability(39.5, 0),
                        new SizeAvailability(40, 0),
                        new SizeAvailability(40.5, 0),
                        new SizeAvailability(41, 0),
                        new SizeAvailability(41.5, 0),
                        new SizeAvailability(42, 4),
                        new SizeAvailability(42.5, 0),
                        new SizeAvailability(43, 0),
                        new SizeAvailability(43.5, 0),
                        new SizeAvailability(44, 0),
                        new SizeAvailability(44.5, 0),
                        new SizeAvailability(45, 0),
                        new SizeAvailability(45.5, 0),
                        new SizeAvailability(46, 1)
                    )
                )
            );

            // Add each sneaker only if it doesn't exist
            for (Sneaker sneaker : sneakersToAdd) {
                repository.findSneakerBySku(sneaker.getSku()).ifPresentOrElse(
                    existingSneaker -> {
                        System.out.println("Sneaker " + sneaker.getSku() + " already exists");
                    },
                    () -> {
                        System.out.println("Adding sneaker: " + sneaker.getSku());
                        repository.insert(sneaker);
                    }
                );
            }
        };
    }
}
