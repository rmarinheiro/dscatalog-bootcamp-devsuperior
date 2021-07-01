package com.rafael.dsdCatalog.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafael.dsdCatalog.dto.CategoryDTO;
import com.rafael.dsdCatalog.dto.ProductDTO;
import com.rafael.dsdCatalog.entities.Category;
import com.rafael.dsdCatalog.entities.Product;
import com.rafael.dsdCatalog.repositories.CategoryRepository;
import com.rafael.dsdCatalog.repositories.ProductRepository;
import com.rafael.dsdCatalog.services.exception.DataBaseException;
import com.rafael.dsdCatalog.services.exception.ResourceNotFoundException;



@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest){
		Page<Product>list = productRepository.findAll(pageRequest);
		
		return  list.map(x-> new ProductDTO(x));
		
		
		
		
		
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = productRepository.findById(id);
		Product entity = obj.orElseThrow(()-> new ResourceNotFoundException("Entity not Found"));
		return new ProductDTO(entity , entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto,entity);
		entity = productRepository.save(entity);
		return new ProductDTO(entity);
	}

	

	@Transactional
	public ProductDTO update(Long id , ProductDTO dto) {
		try {
			Product entity = productRepository.getOne(id);
			copyDtoToEntity(dto,entity);
			entity = productRepository.save(entity);
			return new ProductDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id Not Found" + id);
		}
		
	}

	public void delete(Long id) {
		try {
			productRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found");
		}
		catch(DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation"); 
		}
		
	}
	
	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());
		
		entity.getCategories().clear();
		for(CategoryDTO catDTO : dto.getCategories()) {
			Category category = categoryRepository.getOne(catDTO.getId());
			entity.getCategories().add(category);
		}
		
		
	}
	

}
