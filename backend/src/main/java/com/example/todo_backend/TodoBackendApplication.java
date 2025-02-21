package com.example.todo_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TodoBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoBackendApplication.class, args);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        // Curlで叩かれたら、"Hello, world!"を返す
        return ResponseEntity.ok("Hello, world!");
    }
}
