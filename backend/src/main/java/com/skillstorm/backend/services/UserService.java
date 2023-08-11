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

    // return user by their email
    public User findUserByEmail(String email) {
        Optional<User> user = userRepo.findByEmail(email);

        if (user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    // create a user
    public User createUser(User user) {
        Optional<User> userExists = userRepo.findByEmail(user.getEmail());
        if (userExists.isPresent()) {
            return userExists.get();
        } else {
            // encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            // set role to user
            user.setRole("ROLE_USER");
            // save to db
            userRepo.save(user);
            return user;
        }
    }

    // delete a user by passing in the user
    public void deleteUser(User user) {
        userRepo.delete(user);
    }

    // update the information of a user
    public User updateUser(User user) {
        Optional<User> userToUpdate = userRepo.findByEmail(user.getEmail());

        if (userToUpdate.isPresent()) {
            // attach id to prevent a new user with the same email being created
            user.set_id(userToUpdate.get().get_id());
            // encode ssn
            user.setSsn(passwordEncoder.encode(user.getSsn()));
            // set role to user
            user.setRole("ROLE_USER");
            // save to db
            return userRepo.save(user);
        } else {
            return null;
        }
    }

    // get the user by email and check password to see if login will be true or false
    public boolean checkLogin(String username, String password) {
        Optional<User> user = userRepo.findByEmail(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return true;
        }
        return false;
    }
}
