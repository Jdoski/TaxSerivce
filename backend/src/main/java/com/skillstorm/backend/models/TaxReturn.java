package com.skillstorm.backend.models;

import java.util.Arrays;
import java.util.HashMap;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "returns")
public class TaxReturn {

    @MongoId
    private String id;
    private String userid;
    private String tax_year;
    private String filing_status;
    private int deduction;
    private int income;
    private int withheld;
    private int taxable_income;
    private int tax_bill;
    private int tax_due;
    private Object[] income_sources;

    public TaxReturn() {
    }

    public TaxReturn(String id, String tax_year, String filing_status) {
        this.id = id;
        this.tax_year = tax_year;
        this.filing_status = filing_status;
        this.deduction = deduction(filing_status);
        this.income = 0;
        this.withheld = 0;
        this.taxable_income = 0;
        this.tax_bill = 0;
        this.tax_due = 0;
    }

    public TaxReturn(String id, String userid, String tax_year, String filing_status, int deduction, int income,
            int withheld, int taxable_income, int tax_bill, int tax_due, Object[] income_sources) {
        this.id = id;
        this.userid = userid;
        this.tax_year = tax_year;
        this.filing_status = filing_status;
        this.deduction = deduction(filing_status);
        this.income = income;
        this.withheld = withheld;
        this.taxable_income = taxable_income;
        this.tax_bill = tax_bill;
        this.tax_due = tax_due;
        this.income_sources = income_sources;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getTax_year() {
        return tax_year;
    }

    public void setTax_year(String tax_year) {
        this.tax_year = tax_year;
    }

    public String getFiling_status() {
        return filing_status;
    }

    public void setFiling_status(String filing_status) {
        this.filing_status = filing_status;
    }

    public int getDeduction() {
        return deduction;
    }

    public void setDeduction(int deduction) {
        this.deduction = deduction;
    }

    public int getIncome() {
        return income;
    }

    public void setIncome(int income) {
        this.income = income;
    }

    public int getWithheld() {
        return withheld;
    }

    public void setWithheld(int withheld) {
        this.withheld = withheld;
    }

    public int getTaxable_income() {
        return taxable_income;
    }

    public void setTaxable_income(int taxable_income) {
        this.taxable_income = taxable_income;
    }

    public int getTax_bill() {
        return tax_bill;
    }

    public void setTax_bill(int tax_bill) {
        this.tax_bill = tax_bill;
    }

    public int getTax_due() {
        return tax_due;
    }

    public void setTax_due(int tax_due) {
        this.tax_due = tax_due;
    }

    public Object[] getIncome_sources() {
        return income_sources;
    }

    public void setIncome_sources(Object[] income_sources) {
        this.income_sources = income_sources;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((userid == null) ? 0 : userid.hashCode());
        result = prime * result + ((tax_year == null) ? 0 : tax_year.hashCode());
        result = prime * result + ((filing_status == null) ? 0 : filing_status.hashCode());
        result = prime * result + deduction;
        result = prime * result + income;
        result = prime * result + withheld;
        result = prime * result + taxable_income;
        result = prime * result + tax_bill;
        result = prime * result + tax_due;
        result = prime * result + Arrays.deepHashCode(income_sources);
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        TaxReturn other = (TaxReturn) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (userid == null) {
            if (other.userid != null)
                return false;
        } else if (!userid.equals(other.userid))
            return false;
        if (tax_year == null) {
            if (other.tax_year != null)
                return false;
        } else if (!tax_year.equals(other.tax_year))
            return false;
        if (filing_status == null) {
            if (other.filing_status != null)
                return false;
        } else if (!filing_status.equals(other.filing_status))
            return false;
        if (deduction != other.deduction)
            return false;
        if (income != other.income)
            return false;
        if (withheld != other.withheld)
            return false;
        if (taxable_income != other.taxable_income)
            return false;
        if (tax_bill != other.tax_bill)
            return false;
        if (tax_due != other.tax_due)
            return false;
        if (!Arrays.deepEquals(income_sources, other.income_sources))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "TaxReturn [id=" + id + ", userid=" + userid + ", tax_year=" + tax_year + ", filing_status="
                + filing_status + ", deduction=" + deduction + ", income=" + income + ", withheld=" + withheld
                + ", taxable_income=" + taxable_income + ", tax_bill=" + tax_bill + ", tax_due=" + tax_due
                + ", income_sources=" + Arrays.toString(income_sources) + "]";
    }

    public int deduction(String filing_status) {
        // hashmap to get deduction
        HashMap<String, Integer> deductionMap = new HashMap<>();

        deductionMap.put("single", 12950);
        deductionMap.put("married, filing separately", 12950);
        deductionMap.put("married, filing jointly", 25900);
        deductionMap.put("widow", 25900);
        deductionMap.put("head of household", 19400);
        return deductionMap.get(filing_status);
    }

}