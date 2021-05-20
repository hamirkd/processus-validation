package com.processus.services;

import com.processus.entities.TypeDemande;
import com.processus.repository.TypeDemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;

@Service
@Transactional
public class TypeDemandeService implements TemplateService<TypeDemande,Long> {

    @Autowired
    TypeDemandeRepository TypeDemandeRepository;

    @Override
    public List<TypeDemande> getAll() {
        return TypeDemandeRepository.findAll();
    }

    @Override
    public TypeDemande add(TypeDemande TypeDemande) {
        return TypeDemandeRepository.save(TypeDemande);
    }

    @Override
    public TypeDemande get(Long id) {
        return TypeDemandeRepository.getOne(id);
    }

    @Override
    public TypeDemande update(TypeDemande TypeDemande) {
    	
        return TypeDemandeRepository.save(TypeDemande);
    }

    @Override
    public void delete(Long id) {
        TypeDemandeRepository.deleteById(id);

    }

    @Override
    public List<TypeDemande> saveAll(List<TypeDemande> TypeDemandes) {
        return TypeDemandeRepository.saveAll(TypeDemandes);
    }
}
