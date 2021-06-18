
//+++++++++++++++++++++++++++++ Mahamadou Alio / mahamadoualio05@gmail.com  ++++++++++++++++++++++++++++++++++++++++++++




package com.processus.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "TypeDemande")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class TypeDemande implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -3785931399738563147L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "nom")
    private String nom;
    
    @Column(name = "description")
    private String description;

    @Column(name = "created_on", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt = new Date();
  
//            +++++++++++++++++++++++++++ workFlow Pour les directions +++++++++++++++++++++++++++++++++++++
    
    @ManyToOne
    @JoinColumn(name = "work_flow_direction_id", referencedColumnName = "id")
    private Direction workFlowDirection;
    
    // +++++++++++++++++++++++++++++++++++++++++ workFlow Pour les departements +++++++++++++++++++++++++++++++++++++
    
    @ManyToOne
    @JoinColumn(name = "work_flow_departement", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Departement workFlowDepartement;
    
    
    public Direction getWorkFlowDirection() {
        return workFlowDirection;
    }

    public void setWorkFlowDirection(Direction workFlowDirection) {
        this.workFlowDirection = workFlowDirection;
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

    public String getNom() {
        return nom;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Departement getWorkFlowDepartement() {
        return workFlowDepartement;
    }

    public void setWorkFlowDepartement(Departement workFlowDepartement) {
        this.workFlowDepartement = workFlowDepartement;
    }





}
