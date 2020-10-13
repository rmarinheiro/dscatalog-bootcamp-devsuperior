package com.rafael.dsdcatalog.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafael.dsdcatalog.dto.CategoryDTO;
import com.rafael.dsdcatalog.entities.Category;
import com.rafael.dsdcatalog.repositories.CategoryRepository;
import com.rafael.dsdcatalog.services.exception.EntityNotFoundException;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll(){
		List<Category>list = categoryRepository.findAll();
		
		/*
		 * Metodo utilizado a partir do Java 8 que transforma uma lista numa stream e depois destransformo numa collection.
		 * Responsavel em converter uma entidade categoria em um DTO.
		 * 
		 */
		return  list.stream().map(x-> new CategoryDTO(x)).collect(Collectors.toList());
		
		
		
		
		
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = categoryRepository.findById(id);
		Category entity = obj.orElseThrow(()-> new EntityNotFoundException("Entity not Found"));
		return new CategoryDTO(entity);
	}

}
