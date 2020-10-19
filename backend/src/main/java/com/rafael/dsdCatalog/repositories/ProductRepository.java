package com.rafael.dsdcatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rafael.dsdcatalog.entities.Category;
import com.rafael.dsdcatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
