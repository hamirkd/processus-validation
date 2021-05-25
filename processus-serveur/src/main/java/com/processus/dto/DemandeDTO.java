package com.processus.dto;

import com.processus.entities.Direction;
import com.processus.entities.EtatDemande;
import com.processus.entities.User;


public class DemandeDTO {
	private Long id;
    private Long demandeur_id;
    private Long responsable_id;
    private Long direction_id;
    private String description;
    private EtatDemande etat;
    private EtatDemande etatmanager;

    private EtatDemande etatdirecteur;
    
    private Direction direction;
    private User directeur;
    private User manager;
    
	public Direction getDirection() {
		return direction;
	}
	public void setDirection(Direction direction) {
		this.direction = direction;
	}
	public User getDirecteur() {
		return directeur;
	}
	public void setDirecteur(User directeur) {
		this.directeur = directeur;
	}
	public User getManager() {
		return manager;
	}
	public void setManager(User manager) {
		this.manager = manager;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public EtatDemande getEtat() {
		return etat;
	}
	public void setEtat(EtatDemande etat) {
		this.etat = etat;
	}

	public EtatDemande getEtatmanager() {
		return etatmanager;
	}
	public void setEtatmanager(EtatDemande etatmanager) {
		this.etatmanager = etatmanager;
	}
	public EtatDemande getEtatdirecteur() {
		return etatdirecteur;
	}
	public void setEtatdirecteur(EtatDemande etatdirecteur) {
		this.etatdirecteur = etatdirecteur;
	}
	public Long getDemandeur_id() {
		return demandeur_id;
	}
	public void setDemandeur_id(Long demandeur_id) {
		this.demandeur_id = demandeur_id;
	}
	public Long getResponsable_id() {
		return responsable_id;
	}
	public void setResponsable_id(Long responsable_id) {
		this.responsable_id = responsable_id;
	}
	public Long getDirection_id() {
		return direction_id;
	}
	public void setDirection_id(Long direction_id) {
		this.direction_id = direction_id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
