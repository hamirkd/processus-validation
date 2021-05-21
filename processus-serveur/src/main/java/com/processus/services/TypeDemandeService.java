package com.processus.services;

import com.processus.entities.TypeDemande;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import com.processus.repository.TypeDemandeRepository;

@Service
@Transactional
public class TypeDemandeService implements TemplateService<TypeDemande, Long> {

    @Autowired
    TypeDemandeRepository typeDemandeRepository;

    @Override
    public List<TypeDemande> getAll() {
        return typeDemandeRepository.findAll();
    }

    @Override
    public TypeDemande add(TypeDemande typeDemande) {
        return typeDemandeRepository.save(typeDemande);
    }

    @Override
    public TypeDemande get(Long id) {
        return typeDemandeRepository.getOne(id);
    }

    @Override
    public TypeDemande update(TypeDemande encadreur) {

        return typeDemandeRepository.save(encadreur);
    }

    @Override
    public void delete(Long id) {
        typeDemandeRepository.deleteById(id);

    }

    @Override
    public List<TypeDemande> saveAll(List<TypeDemande> typeDemandes) {
        return typeDemandeRepository.saveAll(typeDemandes);
    }
    public TypeDemande login(TypeDemande encadreur){
        return  encadreur;
    }
}
