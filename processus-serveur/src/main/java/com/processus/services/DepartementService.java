package com.processus.services;
import com.processus.entities.Departement;
import com.processus.repository.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class DepartementService implements TemplateService<Departement, Long> {

    @Autowired
    DepartementRepository departementRepository;

    @Override
    public List<Departement> getAll() {
        return departementRepository.findAll();
    }

    @Override
    public Departement add(Departement departement) {
        return departementRepository.save(departement);
    }

    @Override
    public Departement get(Long id) {
        return departementRepository.getOne(id);
    }

    @Override
    public Departement update(Departement departement) {

        return departementRepository.save(departement);
    }

    @Override
    public void delete(Long id) {
        departementRepository.deleteById(id);

    }

    @Override
    public List<Departement> saveAll(List<Departement> departements) {
        return departementRepository.saveAll(departements);
    }
    public Departement login(Departement departement){
        return  departement;
    }
}
