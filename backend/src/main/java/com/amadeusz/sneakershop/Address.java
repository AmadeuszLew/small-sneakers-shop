package com.amadeusz.sneakershop;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String street;
    private String postcode;
    private String city;
    private String country;
    private String phoneNumber;
    private boolean main;
}