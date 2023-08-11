package com.skillstorm.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.IncomeSource;
import com.skillstorm.backend.models.TaxReturn;
import com.skillstorm.backend.repositories.IncomeSourceRepository;

import java.util.ArrayList;

@Service
public class IncomeSourceService {

    @Autowired
    IncomeSourceRepository incomeSourceRepo;

    // create a new income source and update the return's income
    public void createIncomeSource(TaxReturn taxReturn) {
        ArrayList<IncomeSource> incomeSourceList = taxReturn.getIncome_sources();
        for (int i = 0; i < incomeSourceList.size(); i++) {
            incomeSourceRepo.save(incomeSourceList.get(i));
            updatingIncome(taxReturn, incomeSourceList.get(i));
            deleteIncomeSource(incomeSourceList.get(i));
        }
    }

    // update the return's income
    public void updatingIncome(TaxReturn taxReturn, IncomeSource incomeSource) {
        double sourceIncome = incomeSource.getIncome();
        double sourceWithheld = incomeSource.getWithheld();
        taxReturn.setIncome(taxReturn.getIncome() + sourceIncome);
        taxReturn.setWithheld(taxReturn.getWithheld() + sourceWithheld);
    }

    // update the return's income and withheld taxes after change in W2/1099
    public void updateReturn(TaxReturn taxReturn) {
        taxReturn.setIncome(0);
        taxReturn.setWithheld(0);
        ArrayList<IncomeSource> incomeSourceList = taxReturn.getIncome_sources();
        for (int i = 0; i < incomeSourceList.size(); i++) {
            updatingIncome(taxReturn, incomeSourceList.get(i));
        }
    }

    // delete an income source
    public void deleteIncomeSource(IncomeSource incomeSource) {
        incomeSourceRepo.delete(incomeSource);
    }
}
