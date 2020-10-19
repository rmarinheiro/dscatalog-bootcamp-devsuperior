package com.rafael.dsdcatalog.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rafael.dsdcatalog.dto.ProductDTO;
import com.rafael.dsdcatalog.entities.Product;
import com.rafael.dsdcatalog.services.ProductService;


@RestController
@RequestMapping(value = "/products")
public class ProductResource {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping
	public ResponseEntity<Page<ProductDTO>> findAll(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "name") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction
			
			){
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage,Direction.valueOf(direction),orderBy);
		Page<ProductDTO> list = productService.findAllPaged(pageRequest);
//		List<Product> list = new ArrayList<>();
//		list.add( new Product(1L, "Books"));
//		list.add( new Product(2L, "Electronics"));
		return ResponseEntity.ok().body(list);
		
	}
	
	@PostMapping
	public ResponseEntity<ProductDTO> insert(@RequestBody ProductDTO dto){
		dto = productService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		
		return ResponseEntity.created(uri).body(dto);
		
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id,@RequestBody ProductDTO dto){
		dto = productService.update(id,dto);
		
		return ResponseEntity.ok().body(dto);
		
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id){
		productService.delete(id);
		
		return ResponseEntity.noContent().build();
		
	}
	
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> findById(@PathVariable Long  id){
		ProductDTO dto = productService.findById(id);
		return ResponseEntity.ok(dto);
		
	}

}
