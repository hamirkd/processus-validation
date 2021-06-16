
//+++++++++++++++++++++++++++++ Mahamadou Alio / mahamadoualio05@gmail.com  ++++++++++++++++++++++++++++++++++++++++++++

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

import com.processus.dto.DirectionDTO;
import com.processus.entities.Direction;
import com.processus.services.TemplateService;

@RestController
@RequestMapping("/api/directions")
@CrossOrigin("*")
public class DirectionController {


    @Autowired
    TemplateService<Direction, Long> service;

    @GetMapping
    public List<Direction> getAll() {
        return service.getAll();
    }

	/**
	 * Ce service permet d'ajouter une demande
	 * 
	 * @param entity
	 * @return
	 */
    @PostMapping
    public Direction add(@RequestBody DirectionDTO entityDto) {

        Direction entity = new Direction();
        entity.setNom(entityDto.getNom());
        return service.add(entity);

    }
    @PutMapping
    public Direction update(@RequestBody DirectionDTO entityDto) {

        Direction entity = service.get(entityDto.getId());
        entity.setNom(entityDto.getNom());
        return service.add(entity);

    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/{id}")
    public Direction get(@PathVariable Long id) {
        return service.get(id);
    }


    @PostMapping("/all")
    public ResponseEntity<List<Direction>> addAll(@RequestBody List<Direction> list) {
        service.saveAll(list);
        return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
    }

}
