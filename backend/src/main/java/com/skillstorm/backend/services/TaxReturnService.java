package com.skillstorm.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.TaxReturn;
import com.skillstorm.backend.repositories.TaxReturnRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class TaxReturnService {

    @Autowired
    TaxReturnRepository taxReturnRepo;

    @Autowired
    IncomeSourceService incomeSourceService;


    // show all returns in the db
    public List<TaxReturn> findAllReturnsInDb() {
        return taxReturnRepo.findAll();
    }

    // show all returns for a user
    public List<TaxReturn> findAllReturns(String email) {
        return taxReturnRepo.findByEmail(email);
    }
    
    // show one return
    public TaxReturn findOneReturn(String email, String returnid) {
        return taxReturnRepo.findByEmailAndId(email, returnid);
    }

    // show one return by returnid
    public Optional<TaxReturn> findOneReturnByReturnid(String returnid) {
        return taxReturnRepo.findById(returnid);
    }

    // create a return
    public TaxReturn createReturn(TaxReturn taxReturn) {
        //set the deduction
        taxReturn.setDeduction(deduction(taxReturn.getFiling_status()));
        //set the income sources
        incomeSourceService.createIncomeSource(taxReturn);
        //set the taxes
        setTaxes(taxReturn);

        return taxReturnRepo.save(taxReturn);
    }
    
    // delete a return by passing in the id
    public void deleteReturnById(String _id) {
        taxReturnRepo.deleteById(_id);
    }

    // delete a return by passing in the return
    public void deleteReturn(TaxReturn taxReturn) {
        TaxReturn returnToDelete = taxReturnRepo.findByEmailAndId(taxReturn.getEmail(), taxReturn.getId());
        taxReturnRepo.delete(returnToDelete);
    }

    // update a return by passing in the return
    public TaxReturn updateReturn(TaxReturn taxReturn) {
        // find the return
        Optional<TaxReturn> returnToUpdate = taxReturnRepo.findById(taxReturn.getId());

        // update a return if it exists otherwise ignore since that belongs in creating a new return
        if(returnToUpdate.isPresent()) {
            //use hashmap for deduction
            taxReturn.setDeduction(deduction(taxReturn.getFiling_status()));
            //update the income sources
            incomeSourceService.updateReturn(taxReturn);
            //set the taxes
            setTaxes(taxReturn);

            return taxReturnRepo.save(taxReturn);
        }
        else {
            return null;
        }
    }

    // Determines the deduction about by filing status
    public double deduction(String filing_status) {
        // hashmap to get deduction
        HashMap<String, Integer> deductionMap = new HashMap<>();

        deductionMap.put("single", 13850);
        deductionMap.put("married filing separately", 13850);
        deductionMap.put("married filing jointly", 27700);
        deductionMap.put("widow", 27700);
        deductionMap.put("head of household", 20800);

        return deductionMap.get(filing_status);
    }

    // Get the fields related to taxes
    public void setTaxes(TaxReturn taxReturn){
        taxReturn.setTaxable_income(taxReturn.getIncome() - taxReturn.getDeduction());
        taxReturn.setTax_bill(taxRate(taxReturn));
        taxReturn.setTax_due(taxReturn.getTax_bill() - taxReturn.getWithheld());
    }

    // Get the tax rate for a given tax return
    public double taxRate(TaxReturn taxReturn) {

        double number = taxReturn.getTaxable_income();
        String filing = taxReturn.getFiling_status();
        double tax = 0;

        switch (filing) {
            case "single":
                if (number <= 11000) {
                    tax = number * .1;
                } else if (number <= 44725) {
                    tax = 1100 + (number - 11000) * .12;
                } else if (number <= 95375) {
                    tax = 5147 + (number - 44725) * .22;
                } else if (number <= 182100) {
                    tax = 16290 + (number - 95375) * .24;
                } else if (number <= 231250) {
                    tax = 37104 + (number - 182100) * .32;
                } else if (number <= 578125) {
                    tax = 52832 + (number - 231250) * .35;
                } else {
                    tax = 174238.25 + (number - 578125) * .37;
                }
                break;
            case "married filing separately":
                if (number <= 11000) {
                    tax = number * .1;
                } else if (number <= 44725) {
                    tax = 1100 + (number - 11000) * .12;
                } else if (number <= 95375) {
                    tax = 5147 + (number - 44725) * .22;
                } else if (number <= 182100) {
                    tax = 16290 + (number - 95375) * .24;
                } else if (number <= 231250) {
                    tax = 37104 + (number - 182100) * .32;
                } else if (number <= 346875) {
                    tax = 52832 + (number - 231250) * .35;
                } else {
                    tax = 93300.75 + (number - 346875) * .37;
                }
                break;
            case "married filing jointly":
                if (number <= 22000) {
                    tax = number * .1;
                } else if (number <= 89450) {
                    tax = 2200 + (number - 22000) * .12;
                } else if (number <= 190750) {
                    tax = 10294 + (number - 89450) * .22;
                } else if (number <= 364200) {
                    tax = 32580 + (number - 190750) * .24;
                } else if (number <= 462500) {
                    tax = 74208 + (number - 364200) * .32;
                } else if (number <= 693750) {
                    tax = 105664 + (number - 462500) * .35;
                } else {
                    tax = 186601.5 + (number - 693750) * .37;
                }
                break;
            case "widow":
                if (number <= 22000) {
                    tax = number * .1;
                } else if (number <= 89450) {
                    tax = 2200 + (number - 22000) * .12;
                } else if (number <= 190750) {
                    tax = 10294 + (number - 89450) * .22;
                } else if (number <= 364200) {
                    tax = 32580 + (number - 190750) * .24;
                } else if (number <= 462500) {
                    tax = 74208 + (number - 364200) * .32;
                } else if (number <= 693750) {
                    tax = 105664 + (number - 462500) * .35;
                } else {
                    tax = 186601.5 + (number - 693750) * .37;
                }
                break;
            case "head of household":
                if (number <= 15700) {
                    tax = number * .1;
                } else if (number <= 59850) {
                    tax = 1570 + (number - 15700) * .12;
                } else if (number <= 95350) {
                    tax = 6868 + (number - 59850) * .22;
                } else if (number <= 182100) {
                    tax = 14678 + (number - 95350) * .24;
                } else if (number <= 231250) {
                    tax = 35498 + (number - 182100) * .32;
                } else if (number <= 578125) {
                    tax = 51226 + (number - 231250) * .35;
                } else {
                    tax = 172623.5 + (number - 578125) * .37;
                }
                break;
        }
        return tax;
    }
/* 
    public void removeIncomeSource(TaxReturn taxReturn, String deleteId){

        Query query = Query.query(Criteria.where("_id").is(taxReturn.getId()));
        //Update update = Update.update(taxReturn.getIncome_sources(), deleteId);

        mongoTemplate.updateFirst(query, new Update().pull("income_sources", deleteId), "returns");
    }*/
}
