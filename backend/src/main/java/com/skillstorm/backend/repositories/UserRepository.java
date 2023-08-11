package com.skillstorm.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {


    // required for spring security, returns the email
    User findByUsername(String username);

    // returns a user by their email if an account exists
    Optional<User> findByEmail(String email);
    
}
