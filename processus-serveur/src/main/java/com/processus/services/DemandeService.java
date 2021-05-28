package com.processus.services;

import com.processus.entities.*;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.processus.repository.DemandeRepository;
import com.processus.repository.UserRepository;

@Service
@Transactional
public class DemandeService implements TemplateService<Demande, Long> {

    private final DemandeRepository demandeRepository;
    private final DirectionService directionService;
    private final UserRepository userRepository;

    public DemandeService(DemandeRepository demandeRepository,
                          DirectionService directionService,
                          UserRepository userRepository) {
        this.demandeRepository = demandeRepository;
        this.directionService = directionService;
        this.userRepository = userRepository;
    }

    @Override
    public List<Demande> getAll() {
        return demandeRepository.findAll();
    }

    @Override
    public Demande add(Demande demande) {
        return demandeRepository.save(demande);
    }

    @Override
    public Demande get(Long id) {
        return demandeRepository.getOne(id);
    }

    @Override
    public Demande update(Demande demande) {
        return demandeRepository.save(demande);
    }

    @Override
    public void delete(Long id) {
        demandeRepository.deleteById(id);

    }

    @Override
    public List<Demande> saveAll(List<Demande> demandes) {
        return demandeRepository.saveAll(demandes);
    }


    public Direction findDirectionById(Long id) {
        return directionService.get(id);
    }

    public User findUserById(Long id) {
        return userRepository.getOne(id);
    }

    public List<Demande> findDemandeByManager(Long id) {
        return demandeRepository.findDemandeByManagerId(id);
    }

    public List<Demande> findDemandeByDirecteur(Long id) {
        Long directionId = userRepository.findById(id).map(user -> user.getDirection().getId()).orElse(0L);
        List<Demande> demandes = demandeRepository
                .findByStateInAndDirectionId(Arrays.asList(RequestState.APPROVED_MANAGER, RequestState.REDIRECTED, RequestState.REJECTED_DIRECTOR, RequestState.END), directionId);
        demandes.addAll(demandeRepository
                .findByStateInAndTypeDemandeIsNotNullAndTypeDemandeWorkFlowDirectionId(Arrays.asList(RequestState.REDIRECTED, RequestState.REJECTED_REDIRECT_DIRECTOR, RequestState.END), directionId));
        return demandes.stream().distinct().collect(Collectors.toList());
        // return demandeRepository.findDemandeByDirecteurIdAndEtatmanager(id,EtatDemande.ACCEPTER.toString());
    }

    public List<Demande> findDemandeByDemandeur(Long id) {
        return demandeRepository.findDemandeByDemandeurId(id);
    }
}
