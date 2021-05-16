package com.processus.repository;


import com.processus.entities.Demande;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandeRepository extends JpaRepository<Demande,Long> {
	List<Demande>findDemandeByManager(Long id);
	List<Demande>findDemandeByDemandeur(Long id);
	List<Demande>findDemandeByDirecteur(Long id);
}
