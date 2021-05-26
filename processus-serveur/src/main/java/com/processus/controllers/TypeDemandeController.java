package com.processus.controllers;


import com.processus.dto.TypeDemandeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.processus.entities.TypeDemande;
import com.processus.services.TemplateService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/typeDemandes")
@CrossOrigin("*")
public class TypeDemandeController {

    @Autowired
    TemplateService<TypeDemande, Long> service;

    @GetMapping
    public List<TypeDemande> getAll() {
        return service.getAll();
    }

    @PostMapping
    public TypeDemande add(@RequestBody TypeDemandeDTO entity) {

        TypeDemande typeDemande = new TypeDemande();
        typeDemande.setNom(entity.getNom());
        typeDemande.setDescription(entity.getDescription());
        

        return service.add(typeDemande);

    }


    @PutMapping
    public TypeDemande update(@Valid @RequestBody TypeDemandeDTO entity) {

        TypeDemande typeDemande = new TypeDemande();

        typeDemande.setId(entity.getId());
        typeDemande.setNom(entity.getNom());
        typeDemande.setDescription(entity.getDescription());
       
        

        return service.update(typeDemande);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}")
    public TypeDemande get(@PathVariable Long id) {
        return service.get(id);
    }



    @PostMapping("/all")
    public ResponseEntity<List<TypeDemande>> addAll(@RequestBody List<TypeDemande> list) {
        service.saveAll(list);
        return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
    }

}
