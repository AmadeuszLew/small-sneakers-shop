package com.amadeusz.sneakershop;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public Optional<User> findById(String userId) {
        return userRepository.findById(userId);
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User(
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getFirstName(),
            request.getLastName(),
            request.getAddresses(),
            request.getPhoneNumber()
        );

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());

        return new AuthResponse(
            token,
            savedUser.getEmail(),
            savedUser.getFirstName(),
            savedUser.getLastName(),
            savedUser.getId()
        );
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(
            token,
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getId()
        );
    }

    public User addAddress(String userId, Address address) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        List<Address> addresses = getOrInitAddresses(user);
        if (address.isMain() || addresses.isEmpty()) {
            addresses.forEach(addr -> addr.setMain(false));
            address.setMain(true);
        }
        addresses.add(address);

        return userRepository.save(user);
    }
    
    public User updateAddress(String userId, int addressIndex, Address updatedAddress) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        if (addressIndex < 0 || addressIndex >= user.getAddresses().size()) {
            throw new RuntimeException("Address not found");
        }
        if (updatedAddress.isMain()) {
            user.getAddresses().forEach(addr -> addr.setMain(false));
        }
        user.getAddresses().set(addressIndex, updatedAddress);
        
        return userRepository.save(user);
    }
    
    public User deleteAddress(String userId, int addressIndex) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        if (addressIndex < 0 || addressIndex >= user.getAddresses().size()) {
            throw new RuntimeException("Address not found");
        }
        Address removedAddress = user.getAddresses().remove(addressIndex);
        if (removedAddress.isMain() && !user.getAddresses().isEmpty()) {
            user.getAddresses().getFirst().setMain(true);
        }
        
        return userRepository.save(user);
    }
    
    public User setMainAddress(String userId, int addressIndex) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        if (addressIndex < 0 || addressIndex >= user.getAddresses().size()) {
            throw new RuntimeException("Address not found");
        }
        IntStream.range(0, user.getAddresses().size())
            .forEach(i -> user.getAddresses().get(i).setMain(i == addressIndex));

        return userRepository.save(user);
    }

    private List<Address> getOrInitAddresses(User user) {
        if (user.getAddresses() == null) {
            user.setAddresses(new ArrayList<>());
        }
        return user.getAddresses();
    }
}
