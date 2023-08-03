package com.skillstorm.backend.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.skillstorm.backend.models.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    
}
