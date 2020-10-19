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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rafael.dsdcatalog.dto.ProductDTO;
import com.rafael.dsdcatalog.entities.Product;
import com.rafael.dsdcatalog.repositories.ProductRepository;
import com.rafael.dsdcatalog.services.exception.DataBaseException;
import com.rafael.dsdcatalog.services.exception.ResourceNotFoundException;



@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
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
		//entity.setName(dto.getName());
		entity = productRepository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO update(Long id , ProductDTO dto) {
		try {
			Product entity = productRepository.getOne(id);
			//entity.setName(dto.getName());
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
	
	
	

}
