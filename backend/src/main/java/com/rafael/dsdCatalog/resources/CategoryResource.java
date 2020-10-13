package com.rafael.dsdcatalog.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rafael.dsdcatalog.dto.CategoryDTO;
import com.rafael.dsdcatalog.entities.Category;
import com.rafael.dsdcatalog.services.CategoryService;


@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll(){
		List<CategoryDTO> list = categoryService.findAll();
//		List<Category> list = new ArrayList<>();
//		list.add( new Category(1L, "Books"));
//		list.add( new Category(2L, "Electronics"));
		return ResponseEntity.ok().body(list);
		
	}

}
