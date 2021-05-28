package com.processus.dto;


import com.processus.entities.Direction;

import java.util.Date;

public class TypeDemandeDTO {

    private Long id;
    private String nom;
    private String description;

	public Direction getWorkFlowDirection() {
		return workFlowDirection;
	}

	public void setWorkFlowDirection(Direction workFlowDirection) {
		this.workFlowDirection = workFlowDirection;
	}

	private Direction workFlowDirection;


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
        
        
        
        
        
}
