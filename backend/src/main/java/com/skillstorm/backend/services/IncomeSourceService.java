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
    /*
     * //create an income source and insert into return
     * public void createIncomeSource(String returnid, IncomeSource incomeSource) {
     * TaxReturn returnToUpdate =
     * taxReturnService.findOneReturnByReturnid(returnid).get();
     * returnToUpdate.setIncomeSource(incomeSource);
     * }
     */

    public void createIncomeSource(TaxReturn taxReturn) {
        ArrayList<IncomeSource> incomeSourceList = taxReturn.getIncome_sources();
        for (int i = 0; i < incomeSourceList.size(); i++) {
            incomeSourceRepo.save(incomeSourceList.get(i));
            updatingIncome(taxReturn, incomeSourceList.get(i));
            deleteIncomeSource(incomeSourceList.get(i));
        }
    }

    public void updatingIncome(TaxReturn taxReturn, IncomeSource incomeSource) {
        double sourceIncome = incomeSource.getIncome();
        double sourceWithheld = incomeSource.getWithheld();
        taxReturn.setIncome(taxReturn.getIncome() + sourceIncome);
        taxReturn.setWithheld(taxReturn.getWithheld() + sourceWithheld);
    }

    public void subtractingIncome(TaxReturn taxReturn) {
        ArrayList<IncomeSource> incomeSourceList = taxReturn.getIncome_sources();

        for (int i = 0; i < incomeSourceList.size(); i++) {
            taxReturn.setIncome(taxReturn.getIncome() - incomeSourceList.get(i).getIncome());
            taxReturn.setWithheld(taxReturn.getWithheld() - incomeSourceList.get(i).getWithheld());
        }
    }

    public void updateReturn(TaxReturn taxReturn) {
        taxReturn.setIncome(0);
        taxReturn.setWithheld(0);
        ArrayList<IncomeSource> incomeSourceList = taxReturn.getIncome_sources();
        for (int i = 0; i < incomeSourceList.size(); i++) {
            updatingIncome(taxReturn, incomeSourceList.get(i));
        }

    }

    public void deleteIncomeSource(IncomeSource incomeSource) {
        incomeSourceRepo.delete(incomeSource);
    }

    // delete an income source off a return
    public void deleteIncomeSourceFromReturn(TaxReturn taxReturn, String deletionId) {

    }

}
