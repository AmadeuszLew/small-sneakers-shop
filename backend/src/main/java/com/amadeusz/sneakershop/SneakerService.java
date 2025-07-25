package com.amadeusz.sneakershop;

import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SneakerService {

    private final SneakerRepository sneakerRepository;
    private final MongoTemplate mongoTemplate;
    
    public Optional<Sneaker> getSneakerBySku(String sku) {
        return sneakerRepository.findSneakerBySku(sku);
    }
    
    public List<Sneaker> getSneakers(String brand, String model, Boolean onSale, String search) {
    Query query = new Query();
    
    if (Objects.nonNull(brand) && !brand.isEmpty()) {
        query.addCriteria(Criteria.where("brand").is(brand));
    }

    if (Objects.nonNull(model) && !model.isEmpty()) {
        query.addCriteria(Criteria.where("model").regex(model, "i"));
    }
    
    if (Objects.nonNull(onSale) && onSale) {
        query.addCriteria(Criteria.where("onSale").is(true));
    }

    if (StringUtils.isNotEmpty(search)) {
        Criteria searchCriteria = new Criteria().orOperator(
            Criteria.where("name").regex(search, "i"),
            Criteria.where("model").regex(search, "i"),
            Criteria.where("sku").regex(search, "i")
        );
        query.addCriteria(searchCriteria);
    }
    
    if (query.getQueryObject().isEmpty()) {
        return sneakerRepository.findAll();
    } else {
        return mongoTemplate.find(query, Sneaker.class);
    }
}
}
