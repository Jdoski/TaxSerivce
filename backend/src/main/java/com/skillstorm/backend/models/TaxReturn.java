package com.skillstorm.backend.models;

import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "returns")
public class TaxReturn {

    @MongoId
    private String id;
    private String userid;
    private String tax_year;
    private String filing_status;
    private double deduction;
    private double income;
    private double withheld;
    private double taxable_income;
    private double tax_bill;
    private double tax_due;
    private ArrayList<IncomeSource> income_sources;

    public TaxReturn() {
    }

    public TaxReturn(String id, String tax_year, String filing_status) {
        this.id = id;
        this.tax_year = tax_year;
        this.filing_status = filing_status;
    }

    public TaxReturn(String id, String userid, String tax_year, String filing_status, double deduction, double income,
            double withheld, double taxable_income, double tax_bill, double tax_due,
            ArrayList<IncomeSource> income_sources) {
        this.id = id;
        this.userid = userid;
        this.tax_year = tax_year;
        this.filing_status = filing_status;
        this.deduction = deduction;
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

    public double getDeduction() {
        return deduction;
    }

    public void setDeduction(double deduction) {
        this.deduction = deduction;
    }

    public double getIncome() {
        return income;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public double getWithheld() {
        return withheld;
    }

    public void setWithheld(double withheld) {
        this.withheld = withheld;
    }

    public double getTaxable_income() {
        return taxable_income;
    }

    public void setTaxable_income(double taxable_income) {
        this.taxable_income = taxable_income;
    }

    public double getTax_bill() {
        return tax_bill;
    }

    public void setTax_bill(double tax_bill) {
        this.tax_bill = tax_bill;
    }

    public double getTax_due() {
        return tax_due;
    }

    public void setTax_due(double tax_due) {
        this.tax_due = tax_due;
    }
    
    public ArrayList<IncomeSource> getIncome_sources() {
        return income_sources;
    }

    public void setIncome_sources(ArrayList<IncomeSource> income_sources) {
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
        long temp;
        temp = Double.doubleToLongBits(deduction);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(income);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(withheld);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(taxable_income);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(tax_bill);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(tax_due);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((income_sources == null) ? 0 : income_sources.hashCode());
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
        if (Double.doubleToLongBits(deduction) != Double.doubleToLongBits(other.deduction))
            return false;
        if (Double.doubleToLongBits(income) != Double.doubleToLongBits(other.income))
            return false;
        if (Double.doubleToLongBits(withheld) != Double.doubleToLongBits(other.withheld))
            return false;
        if (Double.doubleToLongBits(taxable_income) != Double.doubleToLongBits(other.taxable_income))
            return false;
        if (Double.doubleToLongBits(tax_bill) != Double.doubleToLongBits(other.tax_bill))
            return false;
        if (Double.doubleToLongBits(tax_due) != Double.doubleToLongBits(other.tax_due))
            return false;
        if (income_sources == null) {
            if (other.income_sources != null)
                return false;
        } else if (!income_sources.equals(other.income_sources))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "TaxReturn [id=" + id + ", userid=" + userid + ", tax_year=" + tax_year + ", filing_status="
                + filing_status + ", deduction=" + deduction + ", income=" + income + ", withheld=" + withheld
                + ", taxable_income=" + taxable_income + ", tax_bill=" + tax_bill + ", tax_due=" + tax_due
                + ", income_sources=" + income_sources + "]";
    }
    
}