package com.skillstorm.backend.repositories;

import java.util.Optional;

import javax.jws.soap.SOAPBinding.Use;
import javax.swing.text.html.Option;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.skillstorm.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    
}
