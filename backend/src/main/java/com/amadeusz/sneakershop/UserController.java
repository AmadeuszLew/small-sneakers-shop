package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable String userId) {
        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user.getAddresses() != null ? user.getAddresses() : List.of());
    }

    @PostMapping("/{userId}/addresses")
    public ResponseEntity<User> addAddress(@PathVariable String userId, @Valid @RequestBody Address address) {
        User updatedUser = userService.addAddress(userId, address);

        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{userId}/addresses/{addressIndex}")
    public ResponseEntity<User> updateAddress(
            @PathVariable String userId,
            @PathVariable int addressIndex,
            @Valid @RequestBody Address address) {
        User updatedUser = userService.updateAddress(userId, addressIndex, address);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{userId}/addresses/{addressIndex}")
    public ResponseEntity<User> deleteAddress(@PathVariable String userId, @PathVariable int addressIndex) {
        User updatedUser = userService.deleteAddress(userId, addressIndex);

        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{userId}/addresses/{addressIndex}/main")
    public ResponseEntity<User> setMainAddress(@PathVariable String userId, @PathVariable int addressIndex) {
        User updatedUser = userService.setMainAddress(userId, addressIndex);

        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserDetails(@PathVariable String userId) {
            User user = userService.getUserDetails(userId);
            
            return ResponseEntity.ok(user);
    }
    
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUserInfo(
            @PathVariable String userId, 
            @Valid @RequestBody UpdateUserRequest updateRequest) {
            User updatedUser = userService.updateUserInfo(userId, updateRequest);
            
            return ResponseEntity.ok(updatedUser);
    }
    
    @PatchMapping("/{userId}/deactivate")
    public ResponseEntity<Void> deactivateAccount(@PathVariable String userId) {
            userService.deactivateAccount(userId);
            
            return ResponseEntity.ok().build();
        
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable String userId) {
            userService.deleteAccount(userId);
            
            return ResponseEntity.ok().build();
    }
}
