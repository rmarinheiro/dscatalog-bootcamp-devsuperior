package com.rafael.dsdCatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rafael.dsdCatalog.entities.Category;
import com.rafael.dsdCatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
