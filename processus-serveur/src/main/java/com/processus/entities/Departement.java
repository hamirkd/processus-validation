package com.processus.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.logging.Logger;

@Entity
@Table(name = "Departement")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Departement implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -3785931399738563147L;

    @Id
    @GeneratedValue
    private Long id;


    @Column(name = "nom")
    private String nom;


   @ManyToOne
	@JoinColumn(name = "direction_id", nullable = true)
      private Direction direction;

    @Column(name = "manager")
    private String manager;


    @Column(name = "directeur")
    private String directeur;

    

    @Column(name = "created_on", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt = new Date();

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public Direction getDirection() {
        return direction;
    }



    public String getManager() {
        return manager;
    }

    public String getDirecteur() {
        return directeur;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }



    public void setManager(String manager) {
        this.manager = manager;
    }

    public void setDirecteur(String directeur) {
        this.directeur = directeur;
    }
    
    
    

    public Date getCreatedAt() {
        return createdAt;
    }
 
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    
    
}
