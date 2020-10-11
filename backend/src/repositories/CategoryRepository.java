package com.rafael.dsdCatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rafael.dsdCatalog.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
