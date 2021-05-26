package com.processus.dto;

public class UserDTO {
	private Long id;
//	private String matricule;
	private String nom;
	private String prenom;
	private String email;
	private String password;
	private Long directeur_id;
	private Long manager_id;
	private Long direction_id;
        private Long administrateur_id;
        private Long departement_id;
	private String poste;
	

	public String getPoste() {
		return poste;
	}

	public void setPoste(String poste) {
		this.poste = poste;
	}

	public Long getDirection_id() {
		return direction_id;
	}

	public void setDirection_id(Long direction_id) {
		this.direction_id = direction_id;
	}

	public Long getDirecteur_id() {
		return directeur_id;
	}

	public void setDirecteur_id(Long directeur_id) {
		this.directeur_id = directeur_id;
	}

	public Long getManager_id() {
		return manager_id;
	}

	public void setManager_id(Long manager_id) {
		this.manager_id = manager_id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public Long getAdministrateur_id() {
        return administrateur_id;
    }

    public void setAdministrateur_id(Long administrateur_id) {
        this.administrateur_id = administrateur_id;
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
//	public String getMatricule() {
//		return matricule;
//	}

//	public void setMatricule(String matricule) {
//		this.matricule = matricule;
//	}

	public void setPassword(String password) {
		this.password = password;
	}

    public Long getDepartement_id() {
        return departement_id;
    }

    public void setDepartement_id(Long departement_id) {
        this.departement_id = departement_id;
    }
        
        
        
        
}
