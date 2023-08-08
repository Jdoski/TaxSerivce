package com.skillstorm.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.IncomeSource;
import com.skillstorm.backend.models.TaxReturn;
import com.skillstorm.backend.repositories.IncomeSourceRepository;

@Service
public class IncomeSourceService {

    @Autowired
    IncomeSourceRepository incomeSourceRepo;
/*
    //create an income source and insert into return
    public void createIncomeSource(String returnid, IncomeSource incomeSource) {
        TaxReturn returnToUpdate = taxReturnService.findOneReturnByReturnid(returnid).get();
        returnToUpdate.setIncomeSource(incomeSource);
    }*/

    public void createIncomeSource(TaxReturn taxReturn) {
        IncomeSource[] incomeSource = taxReturn.getIncome_sources();
        System.out.println(incomeSource);
        for(int i = 0; i < incomeSource.length; i++) {
            incomeSourceRepo.save(incomeSource[i]);
            updatingIncome(taxReturn, incomeSource[i]);
        }
    }

    public void updatingIncome(TaxReturn taxReturn, IncomeSource incomeSource) {
        double sourceIncome = incomeSource.getIncome();
        double sourceWithheld = incomeSource.getWithheld();
        taxReturn.setIncome(taxReturn.getIncome() + sourceIncome);
        taxReturn.setWithheld(taxReturn.getWithheld() + sourceWithheld);
    }

}
