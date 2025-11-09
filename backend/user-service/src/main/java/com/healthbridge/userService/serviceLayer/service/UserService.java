package com.healthbridge.userService.serviceLayer.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.healthbridge.userService.entity.User;

public interface UserService {
	  User registerUser(String name, String email, String password, Set<String> roleNames);
	    Optional<User> getUserByEmail(String email);
	    List<User> getAllUsers();
}
