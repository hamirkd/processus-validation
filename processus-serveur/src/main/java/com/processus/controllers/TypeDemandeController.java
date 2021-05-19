package com.processus.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.processus.dto.TypeDemandeDTO;
import com.processus.entities.TypeDemande;
import com.processus.services.TemplateService;

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
    public TypeDemande add(@RequestBody TypeDemandeDTO entityDto) {

        TypeDemande entity = new TypeDemande();
        entity.setNom(entityDto.getNom());
        return service.add(entity);

    }
    @PutMapping
    public TypeDemande update(@RequestBody TypeDemandeDTO entityDto) {

        TypeDemande entity = service.get(entityDto.getId());
        entity.setNom(entityDto.getNom());
        return service.add(entity);

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
