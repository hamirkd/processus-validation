package com.processus.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.io.Serializable;
import java.util.Date;

@EqualsAndHashCode(callSuper = false)
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "demandes")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class Demande implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -3785931399738563147L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "demandeur_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User demandeur;

    @ManyToOne
    @JoinColumn(name = "direction_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Direction direction;

    @Column(name = "description")
    private String description;

    @Column(name = "etat")
    private String etat = EtatDemande.ENCOURS.toString();

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private RequestState state = RequestState.INITIAL;

    @Column(name = "etatmanager")
    private String etatmanager = EtatDemande.ENCOURS.toString();

    @Column(name = "etatdirecteur")
    private String etatdirecteur = EtatDemande.ENCOURS.toString();

    @ManyToOne
    @JoinColumn(name = "typedemande_id", nullable = true)
    private TypeDemande typeDemande;
    
    
    
    @ManyToOne
    @JoinColumn(name = "departement_id", nullable = true)
    private Departement departement;


    @Column(name = "created_on", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt = new Date();

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt = new Date();

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User manager;

    @ManyToOne
    @JoinColumn(name = "directeur_id", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User directeur;

    public User getDemandeur() {
        return demandeur;
    }

    public void setDemandeur(User demandeur) {
        this.demandeur = demandeur;
    }

    public EtatDemande getEtat() {
        return EtatDemande.valueOf(etat);

    }

    public void setEtat(EtatDemande etat) {
        this.etat = etat.toString();
    }

    public EtatDemande getEtatmanager() {
        return EtatDemande.valueOf(etatmanager);
    }

    public void setEtatmanager(EtatDemande etatmanager) {
        this.etatmanager = etatmanager.toString();
    }

    public EtatDemande getEtatdirecteur() {
        return EtatDemande.valueOf(etatdirecteur);
    }

    public void setEtatdirecteur(EtatDemande etatdirecteur) {
        this.etatdirecteur = etatdirecteur.toString();
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

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public static long getSerialversionuid() {
        return serialVersionUID;
    }
    
    
    

}
