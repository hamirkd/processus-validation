package com.processus.repository;


import com.processus.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
	User findByEmailAndPassword(String email,String password);
}
