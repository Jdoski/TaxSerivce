package com.skillstorm.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.skillstorm.backend.repositories.UserRepository;

@SpringBootApplication
@EnableMongoRepositories
public class BackendApplication implements CommandLineRunner {

	@Autowired
	UserRepository userRepo;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	
	}

	public void showAllUsersHere(){
		userRepo.findAll().forEach(user -> System.out.println(user.toString()));
	}

	public void run(String... args){
		// System.out.println("-------SHOW ALL USERS----");
		// showAllUsersHere();
		System.out.println("-------THANKS--------");
	}

}
