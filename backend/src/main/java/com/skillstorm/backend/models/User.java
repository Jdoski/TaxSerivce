package com.skillstorm.backend.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "ssn")
    private int ssn;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "filing_status")
    private String filingStatus;

    @Column(name = "street_primary")
    private String streetPrimary;

    @Column(name = "street_secondary")
    private String streetSecondary;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_code")
    private int zipCode;

    public User() {

    }

    /*
     * Creating a new user will always require
     * firstName, lastName, ssn, email, password, dateOfBirth, filingStatus,
     * streetPrimary, city, state, zipCode
     * streetSecondary is the only optional parameter
     */
    public User(String firstName, String lastName, int ssn, String email, String password, Date dateOfBirth,
            String filingStatus, String streetPrimary, String city, String state, int zipCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.filingStatus = filingStatus;
        this.streetPrimary = streetPrimary;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public User(String firstName, String lastName, int ssn, String email, String password, Date dateOfBirth,
            String filingStatus, String streetPrimary, String streetSecondary, String city, String state, int zipCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.filingStatus = filingStatus;
        this.streetPrimary = streetPrimary;
        this.streetSecondary = streetSecondary;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getSsn() {
        return ssn;
    }

    public void setSsn(int ssn) {
        this.ssn = ssn;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getFilingStatus() {
        return filingStatus;
    }

    public void setFilingStatus(String filingStatus) {
        this.filingStatus = filingStatus;
    }

    public String getStreetPrimary() {
        return streetPrimary;
    }

    public void setStreetPrimary(String streetPrimary) {
        this.streetPrimary = streetPrimary;
    }

    public String getStreetSecondary() {
        return streetSecondary;
    }

    public void setStreetSecondary(String streetSecondary) {
        this.streetSecondary = streetSecondary;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ssn;
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((password == null) ? 0 : password.hashCode());
        result = prime * result + ((dateOfBirth == null) ? 0 : dateOfBirth.hashCode());
        result = prime * result + ((filingStatus == null) ? 0 : filingStatus.hashCode());
        result = prime * result + ((streetPrimary == null) ? 0 : streetPrimary.hashCode());
        result = prime * result + ((streetSecondary == null) ? 0 : streetSecondary.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((state == null) ? 0 : state.hashCode());
        result = prime * result + zipCode;
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
        User other = (User) obj;
        if (id != other.id)
            return false;
        if (firstName == null) {
            if (other.firstName != null)
                return false;
        } else if (!firstName.equals(other.firstName))
            return false;
        if (lastName == null) {
            if (other.lastName != null)
                return false;
        } else if (!lastName.equals(other.lastName))
            return false;
        if (ssn != other.ssn)
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (password == null) {
            if (other.password != null)
                return false;
        } else if (!password.equals(other.password))
            return false;
        if (dateOfBirth == null) {
            if (other.dateOfBirth != null)
                return false;
        } else if (!dateOfBirth.equals(other.dateOfBirth))
            return false;
        if (filingStatus == null) {
            if (other.filingStatus != null)
                return false;
        } else if (!filingStatus.equals(other.filingStatus))
            return false;
        if (streetPrimary == null) {
            if (other.streetPrimary != null)
                return false;
        } else if (!streetPrimary.equals(other.streetPrimary))
            return false;
        if (streetSecondary == null) {
            if (other.streetSecondary != null)
                return false;
        } else if (!streetSecondary.equals(other.streetSecondary))
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        if (state == null) {
            if (other.state != null)
                return false;
        } else if (!state.equals(other.state))
            return false;
        if (zipCode != other.zipCode)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", ssn=" + ssn + ", email="
                + email + ", password=" + password + ", dateOfBirth=" + dateOfBirth + ", filingStatus=" + filingStatus
                + ", streetPrimary=" + streetPrimary + ", streetSecondary=" + streetSecondary + ", city=" + city
                + ", state=" + state + ", zipCode=" + zipCode + "]";
    }

}
