package com.amadeusz.sneakershop;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class SneakershopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SneakershopApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Pasuje do wszystkich endpointów
                        .allowedOrigins("http://localhost:4200") // Adres frontendu
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dozwolone metody HTTP
                        .allowedHeaders("*") // Zezwól na wszystkie nagłówki
                        .allowCredentials(true); // Obsługa ciasteczek, jeśli potrzebne
            }
        };
    }

    @Bean
    CommandLineRunner runner(SneakerRepository repository, MongoTemplate mongoTemplate) {
        return args -> {
            // First sneaker - Jordan 1 Taxi
            Sneaker jordan1Taxi = new Sneaker(
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

            // Second sneaker - Yeezy 350 v2 Slate
            Sneaker yeezy350v2Slate = new Sneaker(
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
            );

            // Third sneaker - Yeezy 500 Granite
            Sneaker yeezy500Granite = new Sneaker(
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
            );

            // Fourth sneaker - Yeezy 500 Blush
            Sneaker yeezy500Blush = new Sneaker(
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
                    )
            );

            // Fifth sneaker - Yeezy Slide Bone
            Sneaker yeezySlide = new Sneaker(
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
            );

            // Sixth sneaker - ADI2000 Yu-Gi-Oh
            Sneaker adi2000 = new Sneaker(
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
            );

            // Seventh sneaker - Dunk Low Wolf Grey
            Sneaker dunkLowWolfGrey = new Sneaker(
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
            );

            // Eighth sneaker - Dunk Low Pure Blood
            Sneaker dunkLowPureBlood = new Sneaker(
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
            );

            List<Sneaker> sneakers = List.of(
                    jordan1Taxi,
                    yeezy350v2Slate,
                    yeezy500Granite,
                    yeezy500Blush,
                    yeezySlide,
                    adi2000,
                    dunkLowWolfGrey,
                    dunkLowPureBlood
            );

            for (Sneaker sneaker : sneakers) {
                repository.findSneakerBySku(sneaker.getSku()).ifPresentOrElse(
                        existingSneaker -> {
                            System.out.println(existingSneaker.getSku() + " - " + existingSneaker.getModel() + " " + existingSneaker.getColorway() + " found");
                        },
                        () -> {
                            System.out.println("Adding " + sneaker.getSku() + " - " + sneaker.getModel() + " " + sneaker.getColorway());
                            repository.insert(sneaker);
                        }
                );
            }
        };
    }

}
