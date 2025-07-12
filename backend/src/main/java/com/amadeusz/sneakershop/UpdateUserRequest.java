package com.amadeusz.sneakershop;

import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class UpdateUserRequest {
    @NotBlank
    private String firstName;
    
    @NotBlank
    private String lastName;
    
    @NotBlank
    @Email
    private String email;
    
    private String phoneNumber;
    private String currentPassword; // For validation when updating email or password
    private String newPassword;     // Optional, for password updates
}
