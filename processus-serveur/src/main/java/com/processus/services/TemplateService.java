package com.processus.services;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TemplateService <T, ID> {

    List<T> getAll();

    T add(T entity);

    T get(ID id);

    T update(T t);

    void delete(ID id);

    List<T> saveAll(List<T> iterable);
}
