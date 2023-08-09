package com.skillstorm.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.User;
import com.skillstorm.backend.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    /* INTEND TO DELETE
    // return all users
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }*/

    // return user by their id
    public User findUserById(String id) {
        Optional<User> user = userRepo.findById(id);

        if(user.isPresent()) {
            return user.get();
        }
        else{
            return null;
        }
    }

    // return user by their email
    public User loadUserByUsername(String email) {
        Optional<User> user = userRepo.findByUsername(email);

        if(user.isPresent()) {
            return user.get();
        }
        else{
            return null;
        }
    }

    // create a user
    public String createUser(User user) {
        Optional<User> userExists = userRepo.findByEmail(user.getUsername());
        if (userExists.isPresent()) {
            return "Email account already exists";
        } else {
            // encode ssn
            user.setSsn(passwordEncoder.encode(user.getSsn()));
            // set role to user
            user.setRole("ROLE_USER");
            // save to db
            userRepo.save(user);
            return "User created";
        }
    }

    // create a user with only email
    public String createUserByEmail(String email) {
        Optional<User> userExists = userRepo.findByEmail(email);
        if (userExists.isPresent()) {
            return "Email account already exists";
        } else {
            // save to db
            userRepo.save(new User(email, "ROLE_USER"));
            return "User created";
        }
    }

    /* INTEND TO DELETE
    // delete a user by passing in the user
    public void deleteUser(User user) {
        userRepo.delete(user);
    }*/

    // delete a user by passing in their id
    public void deleteUserById(String id) {
        userRepo.deleteById(id);
    }

    public User updateUser(User user) {

        //Optional<User> userToUpdate = userRepo.findById(user.get_id());
        Optional<User> userToUpdate = userRepo.findByEmail(user.getUsername());

        //Optional<User> userToUpdate = userRepo.findById(id);

        if(userToUpdate.isPresent()) {
            // encode ssn
            user.setSsn(passwordEncoder.encode(user.getSsn()));
            // set role to user
            user.setRole("ROLE_USER");
            // save to db
            userRepo.save(user);            return userRepo.save(user);
        }
        else{
            return null;
        }
    }
}

