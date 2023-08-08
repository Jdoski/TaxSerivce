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

    @Autowired
    TaxReturnService taxReturnService;
/*
    //create an income source and insert into return
    public void createIncomeSource(String returnid, IncomeSource incomeSource) {
        TaxReturn returnToUpdate = taxReturnService.findOneReturnByReturnid(returnid).get();
        returnToUpdate.setIncomeSource(incomeSource);
    }*/
}
