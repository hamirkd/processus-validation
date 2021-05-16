package com.processus.services;

import com.processus.entities.Demande;
import com.processus.entities.Direction;
import com.processus.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import com.processus.repository.DemandeRepository;
import com.processus.repository.UserRepository;

@Service
@Transactional
public class DemandeService implements TemplateService<Demande,Long> {

    @Autowired
    DemandeRepository demandeRepository;
    DirectionService directionService;
    @Autowired
    UserRepository userRepository;

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
    
    public List<Demande> findDemandeByManager(Long id){
    	return demandeRepository.findDemandeByManagerId(id);
    }
    
    public List<Demande> findDemandeByDirecteur(Long id){
    	return demandeRepository.findDemandeByDirecteurId(id);
    }
    
    public List<Demande> findDemandeByDemandeur(Long id){
    	return demandeRepository.findDemandeByDemandeurId(id);
    }
}
