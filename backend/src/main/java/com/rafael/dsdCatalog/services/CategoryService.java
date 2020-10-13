package com.rafael.dsdcatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafael.dsdcatalog.entities.Category;
import com.rafael.dsdcatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public List<Category> findAll(){
		return categoryRepository.findAll();
		
	}

}
