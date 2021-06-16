
//+++++++++++++++++++++++++++++ Mahamadou Alio / mahamadoualio05@gmail.com  ++++++++++++++++++++++++++++++++++++++++++++

package com.processus.dto;

import com.processus.entities.Direction;
import com.processus.entities.User;

public class DepartementDTO {

    private Long id;
    private String nom;
    private Direction direction ;
    private User user;
    

    public Direction getDirection() {
        return direction;
    }

    public void setUser(User user) {
        this.user = user;
    }

  

  
    public void setDirection(Direction direction) {
        this.direction = direction;
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

    public Object getUser() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

   

   
   
   

   

}
