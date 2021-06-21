package com.processus.controllers;

import com.processus.dto.DemandeDTO;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.validation.Valid;

import com.processus.dto.TypeDemandeDTO;
import com.processus.entities.*;
import com.processus.services.TemplateService;
import com.processus.services.DemandeService;
import com.processus.services.DirectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.processus.entities.RequestState.*;
import com.processus.services.MailService;

@RestController
@RequestMapping("/api/demandes")
@CrossOrigin("*")
public class DemandeController {

    private final DemandeService service;
    private final DirectionService directionService;
    private final TemplateService<User, Long> userService;
 
    
    private JavaMailSender emailSender;

    public DemandeController(DemandeService service, DirectionService directionService, TemplateService<User, Long> userService,JavaMailSender emailSender) {
        this.service = service;
        this.directionService = directionService;
        this.userService = userService;
        this.emailSender = emailSender;
    }

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
    public Demande add(@RequestBody Demande entity) {
        return newRequest(entity);
    }

    private Demande newRequest(Demande entity) {
        Demande demande = new Demande();
        if (entity.getId() != null) demande = service.get(entity.getId());
        // Nous allons récuperé l'utilisateur demandeur
//        User demandeur = userService.get(entity.getDemandeur_id());
//        demande.setDescription(entity.getDescription());
//        demande.setDirection(demandeur.getDirection());
//        demande.setDirecteur(demandeur.getDirecteur());
//        demande.setManager(demandeur.getManager());
//        demande.setDemandeur(demandeur);
        demande.setDemandeur(entity.getDemandeur());
//        demande.setTypeDemande(entity.getTypeDemande());
        demande.setDirecteur(entity.getDirecteur());
        demande.setDescription(entity.getDescription());
        demande.setTypeDemande(entity.getTypeDemande());
        demande.setManager(entity.getManager());
        demande.setEtatdirecteur(EtatDemande.ENCOURS);
        demande.setEtatmanager(EtatDemande.ENCOURS);

        demande.setState(Optional.ofNullable(entity.getState()).orElse(INITIAL));
        demande.setDirection(Optional.ofNullable(entity.getDirecteur()).map(User::getDirection).orElse(null));

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
            
// ++++++++++++++++++++++++++++++    ENVOI DE MAIL AUTOMATIQUE AU DIRECTEUR  ET AU MANAGER  +++++++++++++++++++++++++++++++++++++++++++
            
            else {

                String emailDirecteur = demande.getDirecteur().getEmail();
                String  emailDemandeur = demande.getDemandeur().getEmail();
                String nomManager = demande.getManager().getNom();
                String nomDemandeur = demande.getDemandeur().getNom();
                System.out.println("++++++++++++++++ Envoie e-mail "+emailDirecteur);
                System.out.println("+++++++++++++++++ Envoie e-mail "+emailDemandeur);
         
                
//   ++++++++++++++++++++++++++++++++++++++++ ENVOI DE MAIL AU DIRECTEUR +++++++++++++++++++++++ 
                 try {
                SimpleMailMessage message = new SimpleMailMessage();

                message.setTo(emailDirecteur);

                message.setSubject("Notification");
                message.setText("Monsieur "+nomManager+" vient d'approuver la demande de monsieur " + nomDemandeur );
         
                // Send Message!
                this.emailSender.send(message);
                }
                catch(Exception e) { 
                	System.err.println(e);
                }
               
    //   ++++++++++++++++++++++++++++++++++++++++ ENVOI DE MAIL AU MANAGER +++++++++++++++++++++++        
                try {
                SimpleMailMessage message = new SimpleMailMessage();

                message.setTo(emailDemandeur);

                message.setSubject("Notification");
                message.setText("Monsieur "+nomManager+" vient d'approuver la demande de monsieur " + nomDemandeur );
         
                // Send Message!
                this.emailSender.send(message);
                }
                catch(Exception e) { 
                	System.err.println(e);
                }
                
                
            }       
        
    }
//        demande.setEtat(entity.getEtat());
        return service.update(demande);
    }

    @PutMapping("signature-update")
    public Demande signature(@RequestBody UpdateRequestStateWrapper wrapper) {
        Demande demande = service.get(wrapper.getRequestId());
        if (Objects.isNull(demande)) return null;
        RequestState state = demande.getState();
        switch (demande.getState()) {
            case INITIAL:
            case REJECTED_MANAGER:
                state = wrapper.isApproved() ? RequestState.APPROVED_MANAGER : RequestState.REJECTED_MANAGER;
                break;
            case APPROVED_MANAGER:
            case REJECTED_DIRECTOR:
                state = wrapper.isApproved()
                        ? Optional.ofNullable(demande.getTypeDemande())
                        .map(TypeDemande::getWorkFlowDirection)
                        .map(Direction::getId)
                        .map(id -> id.equals(Optional.ofNullable(demande.getDirection()).map(Direction::getId).orElse(id)))
                        .orElse(true)
                        ? END
                        : Optional.ofNullable(demande.getTypeDemande().getWorkFlowDepartement()).map(dep -> REDIRECTED_MANAGER).orElse(REDIRECTED_DIRECTOR)
                        : REJECTED_DIRECTOR;
                break;

            case REDIRECTED_MANAGER:
            case REJECTED_REDIRECT_MANAGER:
                state = wrapper.isApproved() ? APPROVED_REDIRECT_MANAGER : REJECTED_REDIRECT_MANAGER;
                break;

            case APPROVED_REDIRECT_MANAGER:
            case REDIRECTED_DIRECTOR:
            case REJECTED_REDIRECT_DIRECTOR:
                state = wrapper.isApproved() ? END : REJECTED_REDIRECT_DIRECTOR;
                break;
//                
//               case REDIRECTED_DIRECTORR:  
                   
        }
        demande.setState(state);
        return service.update(demande);
    }

    /**
     * Nous allons faire une duplication de la demande tout en changeant la direction,
     * le directeur, le manager
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
