package com.example.todo_backend.controller;

import com.example.todo_backend.model.Todo;
import com.example.todo_backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ComponentScan(basePackages = {"com.example.todo_backend"})
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    // READエンドポイント: 全Todoの取得
    @GetMapping("/read")
    public ResponseEntity<List<Todo>> readTodos() {
        List<Todo> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @PostMapping("/create")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.ok(createdTodo);
    }
}
