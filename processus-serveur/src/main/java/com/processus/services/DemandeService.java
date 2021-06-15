
//+++++++++++++++++++++++++++++ Mahamadou Alio / mahamadoualio05@gmail.com  ++++++++++++++++++++++++++++++++++++++++++++
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

import static com.processus.entities.RequestState.*;

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

//     ++++++++++++++++++++++++++++++++++++++++++++++ Redirection departement +++++++++++++++++++++++++++++
        Long departementId = 12L;

        List<Demande> demandes = demandeRepository.findDemandeByManagerIdOrDemandeurId(id, id);
        demandes.addAll(demandeRepository
                .findByStateInAndTypeDemandeIsNotNullAndTypeDemandeWorkFlowDepartementId(Arrays
                                .asList(REDIRECTED_MANAGER, APPROVED_REDIRECT_MANAGER, REJECTED_REDIRECT_MANAGER, REJECTED_REDIRECT_DIRECTOR, END),
                        departementId));
        return demandes.stream().distinct().collect(Collectors.toList());

    }

    public List<Demande> findDemandeByDirecteur(Long id) {
        Long directionId = userRepository.findById(id).map(User::getDirection).map(Direction::getId).orElse(0L);
        List<Demande> demandes = demandeRepository
                .findByStateInAndDirectionId(Arrays.asList(APPROVED_MANAGER, REDIRECTED_MANAGER, APPROVED_REDIRECT_MANAGER, REJECTED_REDIRECT_MANAGER, REDIRECTED_DIRECTOR, REJECTED_REDIRECT_DIRECTOR, REJECTED_DIRECTOR, END), directionId);
        demandes.addAll(demandeRepository
                .findByStateInAndTypeDemandeIsNotNullAndTypeDemandeWorkFlowDirectionId(Arrays.asList(REDIRECTED_DIRECTOR, APPROVED_REDIRECT_MANAGER, REJECTED_REDIRECT_DIRECTOR, END), directionId));
        return demandes.stream().distinct().collect(Collectors.toList());
    }

    public List<Demande> findDemandeByDemandeur(Long id) {
        return demandeRepository.findDemandeByDemandeurId(id);
    }
}
