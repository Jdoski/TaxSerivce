package com.skillstorm.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);
    
}
