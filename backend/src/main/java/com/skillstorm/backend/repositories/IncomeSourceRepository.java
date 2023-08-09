package com.skillstorm.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.backend.models.IncomeSource;

public interface IncomeSourceRepository extends MongoRepository<IncomeSource, String>{
    
}
