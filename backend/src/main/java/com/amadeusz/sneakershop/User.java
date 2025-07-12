package com.amadeusz.sneakershop;

import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Data
@Document
@NoArgsConstructor
public class User {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    private String firstName;
    private String lastName;
    private List<Address> addresses;
    private String phoneNumber;
    private LocalDateTime createdAt;
    private boolean active = true;

    public User(String email, String password, String firstName, String lastName, List<Address> addresses, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.addresses = addresses;
        this.phoneNumber = phoneNumber;
        this.createdAt = LocalDateTime.now();
    }

    public Address getMainAddress() {
        return Optional.ofNullable(this.addresses)
                .flatMap(addresses -> addresses.stream()
                        .filter(Address::isMain)
                        .findFirst())
                .orElse(null);
    }
}
