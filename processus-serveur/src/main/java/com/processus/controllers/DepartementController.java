package com.processus.controllers;
import com.processus.dto.DepartementDTO;
import com.processus.entities.Departement;
import com.processus.services.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/departements")
@CrossOrigin("*")
public class DepartementController {

    @Autowired
    TemplateService<Departement, Long> service;

    @GetMapping
    public List<Departement> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Departement add(@RequestBody DepartementDTO entity) {

        Departement departement = new Departement();

        departement.setNom(entity.getNom());
        departement.setDirection(entity.getDirection());
        departement.setManager(entity.getUser().getDirecteur());
        departement.setDirecteur(entity.getDirecteur());
     
            
        return service.add(departement);

    }


    @PutMapping
    public Departement update(@Valid @RequestBody DepartementDTO entity) {

        Departement departement = new Departement();

        departement.setId(entity.getId());
        departement.setNom(entity.getNom());
        departement.setDirection(entity.getDirection());
        departement.setManager(entity.getUser().getManager());
        departement.setDirecteur(entity.getDirecteur());
       


        return service.update(departement);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}")
    public Departement get(@PathVariable Long id) {
        return service.get(id);
    }

//    @PostMapping("/login")
//    public Pelerin login(@RequestBody Pelerin pelerin) {
//        return ((PelerinService) service).login(pelerin);
//    }


    @PostMapping("/all")
    public ResponseEntity<List<Departement>> addAll(@RequestBody List<Departement> list) {
        service.saveAll(list);
        return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
    }

}
