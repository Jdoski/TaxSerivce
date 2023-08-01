package com.skillstorm.backend.models;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "users")
public class User {

    // Mongo will generate _id
    @MongoId
    private ObjectId _id;
    private String firstName;
    private String lastName;
    private int ssn;
    private String dateOfBirth;
    private String email;
    private String password;
    private String streetPrimary;
    private String streetSecondary;
    private String city;
    private String state;
    private int zipcode;

    public User(String firstName, String lastName, int ssn, String dateOfBirth, String email, String password,
            String streetPrimary, String streetSecondary, String city, String state, int zipcode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.streetPrimary = streetPrimary;
        this.streetSecondary = streetSecondary;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
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

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public ObjectId getId() {
        return _id;
    }

    public void setId(ObjectId id) {
        this._id = id;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((_id == null) ? 0 : _id.hashCode());
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ssn;
        result = prime * result + ((dateOfBirth == null) ? 0 : dateOfBirth.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((password == null) ? 0 : password.hashCode());
        result = prime * result + ((streetPrimary == null) ? 0 : streetPrimary.hashCode());
        result = prime * result + ((streetSecondary == null) ? 0 : streetSecondary.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((state == null) ? 0 : state.hashCode());
        result = prime * result + zipcode;
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
        if (_id == null) {
            if (other._id != null)
                return false;
        } else if (!_id.equals(other._id))
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
        if (dateOfBirth == null) {
            if (other.dateOfBirth != null)
                return false;
        } else if (!dateOfBirth.equals(other.dateOfBirth))
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
        if (zipcode != other.zipcode)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "User [_id=" + _id + ", firstName=" + firstName + ", lastName=" + lastName + ", ssn=" + ssn
                + ", dateOfBirth=" + dateOfBirth + ", email=" + email + ", password=" + password + ", streetPrimary="
                + streetPrimary + ", streetSecondary=" + streetSecondary + ", city=" + city + ", state=" + state
                + ", zipcode=" + zipcode + "]";
    }

}
