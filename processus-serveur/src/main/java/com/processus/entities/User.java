package com.processus.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class User implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -3785931399738563146L;

    @Id
    @GeneratedValue
    private Long id;

//    @Column(name = "matricule",unique = true)
//    private String matricule;
    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User manager;

    @ManyToOne
    @JoinColumn(name = "adminstrateur_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User administrateur;
    
//    
//      @ManyToOne
//    @JoinColumn(name = "ressource_id", nullable = true)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    private User ressource ;

    @ManyToOne
    @JoinColumn(name = "directeur_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User directeur;
    
    
     @ManyToOne
    @JoinColumn(name = "department_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Departement departement;


    @Column(name = "poste", nullable = true, length = 20)
    private String poste = TypePoste.EMPLOYE.toString();

    @ManyToOne
    @JoinColumn(name = "direction_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Direction direction;
    
    @Column(name = "created_on", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt = new Date();

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt = new Date();


    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAdministrateur() {
        return administrateur;
    }

    public void setAdministrateur(User administrateur) {
        this.administrateur = administrateur;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    public User getDirecteur() {
        return directeur;
    }

    public void setDirecteur(User directeur) {
        this.directeur = directeur;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Departement getDepartement() {
        return departement;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }

    
    
}
