package com.rafael.dsdcatalog.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafael.dsdcatalog.dto.CategoryDTO;
import com.rafael.dsdcatalog.entities.Category;
import com.rafael.dsdcatalog.repositories.CategoryRepository;
import com.rafael.dsdcatalog.services.exception.DataBaseException;
import com.rafael.dsdcatalog.services.exception.ResourceNotFoundException;



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
		Category entity = obj.orElseThrow(()-> new ResourceNotFoundException("Entity not Found"));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = categoryRepository.save(entity);
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO update(Long id , CategoryDTO dto) {
		try {
			Category entity = categoryRepository.getOne(id);
			entity.setName(dto.getName());
			entity = categoryRepository.save(entity);
			return new CategoryDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id Not Found" + id);
		}
		
	}

	public void delete(Long id) {
		try {
			categoryRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found");
		}
		catch(DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation"); 
		}
		
	}
	
	
	

}
