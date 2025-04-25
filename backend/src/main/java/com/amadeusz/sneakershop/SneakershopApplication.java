package com.amadeusz.sneakershop;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class SneakershopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SneakershopApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(SneakerRepository repository, MongoTemplate mongoTemplate) {
        return args -> {
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

            repository.findSneakerBySku("555088-711").ifPresentOrElse(
                    sneaker1 -> {
                        System.out.println(sneaker1 + "found");
                    },
                    () -> {
                        System.out.println("adding");
                        repository.insert(sneaker);
                    }
            );
            //check if something exist
//            Query query = new Query();
//            query.addCriteria(Criteria.where("sku").is("555088-711"));
//
//            List<Sneaker> sneakers = mongoTemplate.find(query, Sneaker.class);
//            if (sneakers.size() > 1) {
//                throw new IllegalStateException("found duplicated shoes with sku" + "555088-711");
//            }
//
//            if (sneakers.isEmpty()) {
//                System.out.println("adding sneaker test");
//                repository.insert(sneaker);
//            } else {
//                System.out.println("sneaker exist already ");
//            }
        };

    }
}
