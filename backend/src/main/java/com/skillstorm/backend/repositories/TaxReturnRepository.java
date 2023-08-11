package com.skillstorm.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.backend.models.TaxReturn;
import java.util.List;
import java.util.Optional;


public interface TaxReturnRepository extends MongoRepository<TaxReturn, String> {
    
    // Return one return that matches the returnid
    Optional<TaxReturn> findById(String returnid);

    // find all returns that match the email
    List<TaxReturn> findByEmail(String email);   
    
    // Return one return that matches the email and returnid
    TaxReturn findByEmailAndId(String email, String returnid);

}
