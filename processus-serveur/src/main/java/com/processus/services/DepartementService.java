package com.processus.services;

import com.processus.entities.Departement;
import com.processus.entities.Direction;
import com.processus.repository.DepartementRepository;
import com.processus.repository.DirectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;

@Service
@Transactional
public class DepartementService implements TemplateService<Departement,Long> {

    @Autowired
    DepartementRepository DepartementRepository;

    @Override
    public List<Departement> getAll() {
        return DepartementRepository.findAll();
    }

    @Override
    public Departement add(Departement Departement) {
        return DepartementRepository.save(Departement);
    }

    @Override
    public Departement get(Long id) {
        return DepartementRepository.getOne(id);
    }

    @Override
    public Departement update(Departement Departement) {
    	
        return DepartementRepository.save(Departement);
    }

    @Override
    public void delete(Long id) {
        DepartementRepository.deleteById(id);

    }

    @Override
    public List<Departement> saveAll(List<Departement> Departements) {
        return DepartementRepository.saveAll(Departements);
    }
}
