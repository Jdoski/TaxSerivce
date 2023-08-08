package com.skillstorm.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.backend.models.TaxReturn;
import java.util.List;
import java.util.Optional;


public interface TaxReturnRepository extends  MongoRepository<TaxReturn, String> {
    
    // List<TaxReturn> findByUser_id(String user_id);
    List<TaxReturn> findByUserid(String userid);


    // Return one return that matches the userid and returnid
    TaxReturn findByUseridAndId(String userid, String returnid);

    // Return one return that matches the returnid
    Optional<TaxReturn> findById(String returnid);

}
