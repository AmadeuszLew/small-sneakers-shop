package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SizeAvailability {
    private double size;
    private int availability;
}
