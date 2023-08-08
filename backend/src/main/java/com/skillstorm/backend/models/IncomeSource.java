package com.skillstorm.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

public class IncomeSource {
    @MongoId
    private String sourceid;
    private String type;
    private int income;
    private int withheld;
    private String employer;
    private String employer_id;

    public IncomeSource() {}

    public IncomeSource(String type, int income, int withheld, String employer, String employer_id) {
        this.type = type;
        this.income = income;
        this.withheld = withheld;
        this.employer = employer;
        this.employer_id = employer_id;
    }

    public IncomeSource(String sourceid, String type, int income, int withheld, String employer, String employer_id) {
        this.sourceid = sourceid;
        this.type = type;
        this.income = income;
        this.withheld = withheld;
        this.employer = employer;
        this.employer_id = employer_id;
    }

    public String getSourceid() {
        return sourceid;
    }

    public void setSourceid(String sourceid) {
        this.sourceid = sourceid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getEmployer() {
        return employer;
    }

    public void setEmployer(String employer) {
        this.employer = employer;
    }

    public String getEmployer_id() {
        return employer_id;
    }

    public void setEmployer_id(String employer_id) {
        this.employer_id = employer_id;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((sourceid == null) ? 0 : sourceid.hashCode());
        result = prime * result + ((type == null) ? 0 : type.hashCode());
        result = prime * result + income;
        result = prime * result + withheld;
        result = prime * result + ((employer == null) ? 0 : employer.hashCode());
        result = prime * result + ((employer_id == null) ? 0 : employer_id.hashCode());
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
        IncomeSource other = (IncomeSource) obj;
        if (sourceid == null) {
            if (other.sourceid != null)
                return false;
        } else if (!sourceid.equals(other.sourceid))
            return false;
        if (type == null) {
            if (other.type != null)
                return false;
        } else if (!type.equals(other.type))
            return false;
        if (income != other.income)
            return false;
        if (withheld != other.withheld)
            return false;
        if (employer == null) {
            if (other.employer != null)
                return false;
        } else if (!employer.equals(other.employer))
            return false;
        if (employer_id == null) {
            if (other.employer_id != null)
                return false;
        } else if (!employer_id.equals(other.employer_id))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "IncomeSource [sourceid=" + sourceid + ", type=" + type + ", income=" + income + ", withheld=" + withheld
                + ", employer=" + employer + ", employer_id=" + employer_id + "]";
    }
    
}
