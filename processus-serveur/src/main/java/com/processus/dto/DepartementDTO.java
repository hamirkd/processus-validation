package com.processus.dto;

import com.processus.entities.Direction;
import com.processus.entities.User;

public class DepartementDTO {

    private Long id;
    private String nom;
    private Direction direction ;
    private User manager;
    private User Directeur;

    public Direction getDirection() {
        return direction;
    }

    public User getManager() {
        return manager;
    }

    public User getDirecteur() {
        return Directeur;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    public void setDirecteur(User Directeur) {
        this.Directeur = Directeur;
    }
    
    
    
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

   

   
   
   

   

}
