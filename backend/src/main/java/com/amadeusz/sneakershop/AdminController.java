package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class AdminController {
    
    private final StockResetService stockResetService;

    @PostMapping("/reset-stock")
    public ResponseEntity<String> resetStock() {
        stockResetService.manualReset();
        return ResponseEntity.ok("Stock reset successfully");
    }
}
