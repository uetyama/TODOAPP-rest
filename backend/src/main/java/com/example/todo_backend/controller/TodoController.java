package com.example.todo_backend.controller;

import com.example.todo_backend.model.Todo;
import com.example.todo_backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<String> getTodos() {
        return ResponseEntity.ok("Hello");
    }

    @PostMapping("/create")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.ok(createdTodo);
    }
}
