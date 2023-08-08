package com.skillstorm.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.backend.models.TaxReturn;
import com.skillstorm.backend.services.TaxReturnService;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/users/returns")
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
public class TaxReturnController {
    @Autowired
    TaxReturnService taxReturnService;
    
    //return all returns
    @GetMapping
    public ResponseEntity<List<TaxReturn>> getAllReturns() {
        List<TaxReturn> returns = taxReturnService.findAllReturnsInDb();
        
        return new ResponseEntity<List<TaxReturn>>(returns, HttpStatus.OK);
    }

    //return all returns for a user
    @GetMapping("/{id}")
    public ResponseEntity<List<TaxReturn>> getAllReturnsForUser(@PathVariable String id) {
        List<TaxReturn> returns = taxReturnService.findAllReturns(id);
        
        return new ResponseEntity<List<TaxReturn>>(returns, HttpStatus.OK);
    }

    //find a single return by id
    @GetMapping("/{userid}/{returnId}")
    public ResponseEntity<TaxReturn> getReturnById(@PathVariable String userid, @PathVariable String returnId) {
        TaxReturn returnById = taxReturnService.findOneReturn(userid, returnId);
        
        return new ResponseEntity<TaxReturn>(returnById, HttpStatus.OK);
    }


    @GetMapping("/return/{returnId}")
    public ResponseEntity<TaxReturn> getReturnById(@PathVariable String returnId) {
        Optional<TaxReturn> returnById = taxReturnService.findOneReturnByReturnid(returnId);
        
        if(returnById.isPresent())
            return new ResponseEntity<TaxReturn>(returnById.get(), HttpStatus.OK);
        else
            return new ResponseEntity<TaxReturn>(HttpStatus.NOT_FOUND);
    }

    //create a return
    @PostMapping("/{id}/create")
    public ResponseEntity<TaxReturn> createReturn(@PathVariable String userid, @RequestBody TaxReturn taxReturn) {
        taxReturn.setUserid(userid);
        TaxReturn createdReturn = taxReturnService.createReturn(taxReturn);
        
        return new ResponseEntity<TaxReturn>(createdReturn, HttpStatus.OK);
    }

    //create a return by passing in the return
    @PostMapping("/create")
    public ResponseEntity<TaxReturn> newReturn(@RequestBody TaxReturn taxReturn) {
        TaxReturn createdReturn = taxReturnService.createReturn(taxReturn);
        
        return new ResponseEntity<TaxReturn>(createdReturn, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReturnById(@PathVariable String id) {
        taxReturnService.deleteReturnById(id);
    }
/*  @PutMapping("/update")
    public TaxReturn updateReturn(@RequestBody TaxReturn taxReturn) {
        return taxReturnService.updateReturn(taxReturn);
    }*/

    @PutMapping("/update")
    public ResponseEntity<TaxReturn> updateReturn(@RequestBody TaxReturn taxReturn) {
        TaxReturn updatedReturn = taxReturnService.updateReturn(taxReturn);
        
        return new ResponseEntity<TaxReturn>(updatedReturn, HttpStatus.OK);
    }
}


    

