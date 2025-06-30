package com.amadeusz.sneakershop;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@NoArgsConstructor
public class User {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    private String password; // Will be hashed
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private LocalDateTime createdAt;

    public User(String email, String password, String firstName, String lastName, String address, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.createdAt = LocalDateTime.now();
    }
}
