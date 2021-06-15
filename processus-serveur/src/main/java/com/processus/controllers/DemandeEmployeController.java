//+++++++++++++++++++++++++++++ Mahamadou Alio / mahamadoualio05@gmail.com  ++++++++++++++++++++++++++++++++++++++++++++

package com.processus.controllers;

import com.processus.dto.DemandeDTO;
import java.util.List;

import javax.validation.Valid;

import com.processus.entities.Demande;
import com.processus.entities.Direction;
import com.processus.entities.EtatDemande;
import com.processus.entities.User;
import com.processus.services.TemplateService;
import com.processus.services.DemandeService;
import com.processus.services.DirectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demandes-employe")
@CrossOrigin("*")
public class DemandeEmployeController {

    @Autowired
    DemandeService service;
    @Autowired
    DirectionService directionService;

    @Autowired
    TemplateService<User, Long> userService;

    @GetMapping
    public List<Demande> getAll() {
        return service.getAll();
    }

    @GetMapping("/managers/{id}")
    public List<Demande> getAllByManager(@PathVariable Long id) {
        System.out.println("Le id du manager" + id);
        return service.findDemandeByManager(id);
    }

    @GetMapping("/directeurs/{id}")
    public List<Demande> getAllByDirecteur(@PathVariable Long id) {
        System.out.println("Le id du directeur" + id);
        return service.findDemandeByDirecteur(id);
    }

    @GetMapping("/demandeurs/{id}")
    public List<Demande> getAllByEmploye(@PathVariable Long id) {
        System.out.println("Le id du demandeur" + id);
//    	return service.getAll();
        return service.findDemandeByDemandeur(id);
    }

    /**
     * Ce service permet d'ajouter une demande
     *
     * @param entity
     * @return
     */
    @PutMapping
    public Demande add(@RequestBody DemandeDTO entity) {

        Demande demande = new Demande();
        if (entity.getId() != null) {
            demande = service.get(entity.getId());
        }
        // Nous allons récuperé l'utilisateur demandeur
        User demandeur = userService.get(entity.getDemandeur_id());
        demande.setDescription(entity.getDescription());
        demande.setDirection(demandeur.getDirection());
        demande.setDirecteur(demandeur.getDirecteur());
        demande.setManager(demandeur.getManager());
        demande.setDemandeur(demandeur);     
        demande.setTypeDemande(demande.getTypeDemande());
        demande.setEtat(EtatDemande.ENCOURS);
        demande.setEtatdirecteur(EtatDemande.ENCOURS);
        demande.setEtatmanager(EtatDemande.ENCOURS);

        return service.add(demande);
    }
//+++++++++++++++++++++++++++++++++++++++++++++++++++ Singature (accepter ou rejeter)++++++++++++++++++++++++++++++++++

    @PutMapping("signature")
    public Demande signature(@Valid @RequestBody DemandeDTO entity) {
        Demande demande = service.get(entity.getId());
        if (entity.getEtatdirecteur() != null) {
            demande.setEtatdirecteur(entity.getEtatdirecteur());
            if (entity.getEtatdirecteur() == EtatDemande.REJETER) {
                demande.setEtat(EtatDemande.REJETER);
            } else {
                demande.setEtat(EtatDemande.ACCEPTER);
            }
        } else if (entity.getEtatmanager() != null) {
            demande.setEtatmanager(entity.getEtatmanager());
            if (entity.getEtatmanager() == EtatDemande.REJETER) {
                demande.setEtat(EtatDemande.REJETER);
            }
        }
//        demande.setEtat(entity.getEtat());
        return service.update(demande);
    }

    /**
     * Nous allons faire une duplication de la demande tout en changeant la
     * direction, le directeur, le manager
     */
    @PutMapping("transfert")
    public Demande transfert(@Valid @RequestBody DemandeDTO entity) {
        Demande demande_old = service.get(entity.getId());
        Demande demande = new Demande();
        demande.setDemandeur(demande_old.getDemandeur());
        demande.setDescription(demande_old.getDescription());
        /**
         * Recupération de la direction avec son identifiant, de meme que le
         * directeur et le manager
         */
        Direction direction = directionService.get(entity.getDirection_id());
        User directeur = userService.get(entity.getDirecteur_id());
        User manager = userService.get(entity.getManager_id());
        demande.setDirection(direction);
        demande.setDirecteur(directeur);
        demande.setManager(manager);
        demande.setEtat(EtatDemande.ENCOURS);
        demande.setEtatdirecteur(EtatDemande.ENCOURS);
        demande.setEtatmanager(EtatDemande.ENCOURS);
        demande_old.setEtat(EtatDemande.TERMINER);
        service.update(demande_old);
//        return service.update(demande);
//        demande.setEtat(entity.getEtat());
        return service.add(demande);
    }

    @PutMapping("modifier-une-demande")
    public Demande update(@Valid @RequestBody DemandeDTO entity) {
        Demande demande = service.get(entity.getId());
        demande.setDescription(entity.getDescription());
        demande.setEtat(EtatDemande.ENCOURS);
        return service.update(demande);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}")
    public Demande get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping("/all")
    public ResponseEntity<List<Demande>> addAll(@RequestBody List<Demande> list) {
        service.saveAll(list);
        return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
    }

}
