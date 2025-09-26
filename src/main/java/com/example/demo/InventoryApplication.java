package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;

@SpringBootApplication
public class InventoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryApplication.class, args);
	}

    @Bean
    CommandLineRunner init(ItemRepository repository) {
        return args -> {
            repository.save(new Item("鉛筆", 100, 50));
            repository.save(new Item("ノート", 200, 150));
            repository.save(new Item("消しゴム", 50, 30));
        };
    }
}
