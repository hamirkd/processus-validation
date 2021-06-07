package com.processus.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.logging.Logger;
import org.apache.catalina.Manager;

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
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Direction direction;

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User manager;

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

    public void setId(Long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Direction getDirection() {
        return direction;
    }

    public User getManager() {
        return manager;
    }
    

//    public User getDirecteur() {
//        return directeur;
//    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

//    public void setDirecteur(User directeur) {
//        this.directeur = directeur;
//    }

    public void setUser(Object user) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
