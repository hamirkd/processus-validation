package com.processus.services;

import com.processus.entities.Direction;
import com.processus.entities.User;
import com.processus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService implements TemplateService<User,Long> {

    @Autowired
    UserRepository userRepository;
    @Autowired
    DirectionService directionService;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User add(User user) {
        return userRepository.save(user);
    }

    @Override
    public User get(Long id) {
        return userRepository.getOne(id);
    }

    public Direction findDirectionById(Long id) {
      return directionService.get(id);
    }


	public User findUserById(Long id) {
		return get(id);
	}
 
    
    @Override
    public User update(User user) {
    	
        return userRepository.save(user);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);

    }

    @Override
    public List<User> saveAll(List<User> users) {
        return userRepository.saveAll(users);
    }
    public User login(String email,String password){
    	return userRepository.findByEmailAndPassword(email,password);
    }
}
