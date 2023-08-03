package com.skillstorm.backend.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.User;
import com.skillstorm.backend.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    // return all users
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    // return user by their id
    public User findUserById(ObjectId id) {
        Optional<User> user = userRepo.findById(id);

        if(user.isPresent()) {
            return user.get();
        }
        else{
            return null;
        }
    }

    // create a user
    public User createUser(User user) {
        return userRepo.save(user);
    }

    // delete a user by passing in the user
    public void deleteUser(User user) {
        userRepo.delete(user);
    } 

    // delete a user by passing in their id
    public void deleteUserById(ObjectId id) {
        userRepo.deleteById(id);
    }

<<<<<<< Updated upstream
    // update a user by their id
    public User updateUserById(ObjectId id, User user) {
        Optional<User> userToUpdate = userRepo.findById(id);

        if(userToUpdate.isPresent()) {
            User updatedUser = userToUpdate.get();
            return userRepo.save(updatedUser);
        }
        else{
            return null;
        }
=======
    // update a user by passing in the user
    public User updateUser(User user) {
        return userRepo.save(user);
>>>>>>> Stashed changes
    }
}

