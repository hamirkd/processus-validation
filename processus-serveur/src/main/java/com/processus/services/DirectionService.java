package com.processus.services;

import com.processus.entities.Direction;
import com.processus.repository.DirectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;

@Service
@Transactional
public class DirectionService implements TemplateService<Direction,Long> {

    @Autowired
    DirectionRepository DirectionRepository;

    @Override
    public List<Direction> getAll() {
        return DirectionRepository.findAll();
    }

    @Override
    public Direction add(Direction Direction) {
        return DirectionRepository.save(Direction);
    }

    @Override
    public Direction get(Long id) {
        return DirectionRepository.getOne(id);
    }

    @Override
    public Direction update(Direction Direction) {
    	
        return DirectionRepository.save(Direction);
    }

    @Override
    public void delete(Long id) {
        DirectionRepository.deleteById(id);

    }

    @Override
    public List<Direction> saveAll(List<Direction> Directions) {
        return DirectionRepository.saveAll(Directions);
    }
}
