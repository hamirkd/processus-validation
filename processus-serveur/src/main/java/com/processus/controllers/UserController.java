package com.processus.controllers;

import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import com.processus.dto.UserDTO;
import com.processus.entities.Direction;
import com.processus.entities.User;
import com.processus.services.DirectionService;
import com.processus.services.TemplateService;
import com.processus.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    TemplateService<User, Long> service;
    @Autowired
    DirectionService directionService;

    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    @PostMapping
    public User add(@RequestBody UserDTO entity) {
//        
//        ++++++++++++++++++++++++  Nous allons recuperé les directeurs  ++++++++++++++++++++++++++++++++++++
        User user = new User();
        
        if (entity.getDirecteur_id() != null && entity.getDirecteur_id() != 0) {
            try {
                User u = service.get(entity.getDirecteur_id());
                user.setDirecteur(u);
                System.out.println("Passage ici" + entity.getDirecteur_id());

            } catch (EntityNotFoundException e) {
                // TODO: handle exception

            }
        }
        
//        ++++++++++++++++++++++++++ Nous allons recuperé les managers +++++++++++++++++++++++++++++++++++++++++++

        if (entity.getManager_id() != null && entity.getManager_id() != 0) {
            try {
                User u = service.get(entity.getManager_id());
                user.setManager(u);

            } catch (EntityNotFoundException e) {
              

            }
        }
        
//        
//       +++++++++++++++++++++++++++++++ Nous allons recuperé les directions +++++++++++++++++++++++++++++++
               
        if (entity.getDirection_id() != null && entity.getDirection_id() != 0) {
            try {
                Direction u = directionService.get(entity.getDirection_id());
                user.setDirection(u);
                System.out.println("Passage ici");

            } catch (EntityNotFoundException e) {
                // TODO: handle exception
            }
        }

        if (entity.getAdministrateur_id() != null && entity.getAdministrateur_id() != 0) {
            try {
                Direction u = directionService.get(entity.getAdministrateur_id());
                user.setDirection(u);
                System.out.println("Passage ici");

            } catch (EntityNotFoundException e) {
                // TODO: handle exception
            }
        }

        user.setId(entity.getId());
        user.setNom(entity.getNom());
        user.setPrenom(entity.getPrenom());
        user.setEmail(entity.getEmail());
        user.setPassword(entity.getPassword());
        user.setPoste(entity.getPoste());
        return service.add(user);
    }

    @PutMapping
    public User update(@Valid @RequestBody UserDTO entity) {
        User user = service.get(entity.getId());
        if (entity.getDirecteur_id() != null && entity.getDirecteur_id() != 0) {
            try {
                User u = service.get(entity.getDirecteur_id());
                user.setDirecteur(u);
                System.out.println("Passage ici" + entity.getDirecteur_id());

            } catch (EntityNotFoundException e) {
                // TODO: handle exception

            }
        }
        if (entity.getManager_id() != null && entity.getManager_id() != 0) {
            try {
                User u = service.get(entity.getManager_id());
                user.setManager(u);

            } catch (EntityNotFoundException e) {
                // TODO: handle exception

            }
        }
        if (entity.getDirection_id() != null && entity.getDirection_id() != 0) {
            try {
                Direction u = directionService.get(entity.getDirection_id());
                user.setDirection(u);
                System.out.println("Passage ici");

            } catch (EntityNotFoundException e) {
                // TODO: handle exception
            }
        }
        user.setId(entity.getId());
        user.setNom(entity.getNom());
        user.setPrenom(entity.getPrenom());
        user.setEmail(entity.getEmail());
        user.setPassword(entity.getPassword());
        user.setPoste(entity.getPoste());
        return service.update(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return ((UserService) service).login(user.getEmail(), user.getPassword());
    }

    @PostMapping("/all")
    public ResponseEntity<List<User>> addAll(@RequestBody List<User> list) {
        service.saveAll(list);
        return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
    }

}
