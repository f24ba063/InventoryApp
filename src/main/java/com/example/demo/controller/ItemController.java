package com.example.demo.controller;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;

@RestController
@RequestMapping("/api/items")
public class ItemController {

	private final ItemRepository repository;

	public ItemController(ItemRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping
	public List<Item> getAll(
			@RequestParam(required = false, defaultValue = "id") String sortBy,
			@RequestParam(required = false, defaultValue = "asc") String order
			){
		Sort sort = Sort.by(sortBy);
		sort = "desc".equalsIgnoreCase(order) ? sort.descending() : sort.ascending();
		return repository.findAll(sort);
	}
	
	@PostMapping
	public Item create(@RequestBody Item item) {
		return repository.save(item);
	}
	
	@PutMapping("/{id}")
	public Item update(@PathVariable Long id, @RequestBody Item newItem) {
		return repository.findById(id)
				.map(item -> {
					item.setName(newItem.getName());
					item.setQuantity(newItem.getQuantity());
					item.setPrice(newItem.getPrice());
					return repository.save(item);
		})
				.orElseThrow(() -> new RuntimeException("Item not found with id " + id));
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}
}