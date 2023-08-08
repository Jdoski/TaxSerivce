package com.skillstorm.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.TaxReturn;
import com.skillstorm.backend.repositories.TaxReturnRepository;
import java.util.List;
import java.util.Optional;

@Service
public class TaxReturnService {
    @Autowired
    TaxReturnRepository taxReturnRepo;


    // show all returns in the db
    public List<TaxReturn> findAllReturnsInDb() {
        return taxReturnRepo.findAll();
    }

    // show all returns for a user
    public List<TaxReturn> findAllReturns(String user_id) {
        return taxReturnRepo.findByUserid(user_id);
    }
    
    // show one return
    public TaxReturn findOneReturn(String userid, String returnid) {
        return taxReturnRepo.findByUseridAndId(userid, returnid);
    }

    // show one return by returnid
    public Optional<TaxReturn> findOneReturnByReturnid(String returnid) {
        return taxReturnRepo.findById(returnid);
    }

    // create a return
    public TaxReturn createReturn(TaxReturn taxReturn) {
        return taxReturnRepo.save(taxReturn);
    }
    
    // delete a return by passing in the id
    public void deleteReturnById(String _id) {
        taxReturnRepo.deleteById(_id);
    }

    // update a return by passing in the return
    public TaxReturn updateReturn(TaxReturn taxReturn) {
        // find the return
        Optional<TaxReturn> returnToUpdate = taxReturnRepo.findById(taxReturn.getId());

        // update a return if it exists otherwise ignore since that belongs in creating a new return
        if(returnToUpdate.isPresent()) {
            //use hashmap for deduction
            taxReturn.setDeduction(taxReturn.deduction(taxReturn.getFiling_status()));
            return taxReturnRepo.save(taxReturn);
        }
        else {
            return null;
        }
    }
}
