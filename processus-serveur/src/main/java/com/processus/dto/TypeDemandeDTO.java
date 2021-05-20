package com.processus.dto;


public class TypeDemandeDTO {
   
	private Long id;
        private String nom;
        private String direction;
        private String manager;
        private String directeur;
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

    public String getDirection() {
        return direction;
    }

    public String getManager() {
        return manager;
    }

    public String getDirecteur() {
        return directeur;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public void setDirecteur(String directeur) {
        this.directeur = directeur;
    }
        
        
        

}
