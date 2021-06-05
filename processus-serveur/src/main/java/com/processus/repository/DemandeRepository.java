package com.processus.repository;


import com.processus.entities.Demande;

import java.util.List;

import com.processus.entities.RequestState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandeRepository extends JpaRepository<Demande, Long> {
    List<Demande> findDemandeByManagerId(Long id);

    List<Demande> findDemandeByDemandeurId(Long id);

    List<Demande> findDemandeByDirecteurId(Long id);

    List<Demande> findDemandeByDirecteurIdAndEtatmanager(Long id, String etatmanager);

    List<Demande> findByStateInAndDirectionId(List<RequestState> states, Long directionId);

    List<Demande> findByStateInAndTypeDemandeIsNotNullAndTypeDemandeWorkFlowDirectionId(List<RequestState> states, Long directionId);

}
