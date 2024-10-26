package com.example.backend.controller;

import com.example.backend.model.TaskJob;
import com.example.backend.model.User;
import com.example.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskJob> createProduct(@RequestBody TaskJob product) {
        return ResponseEntity.ok(taskService.createProduct(product));
    }
    @PutMapping("/{id}")
    public ResponseEntity<TaskJob> editTask(@PathVariable Long id, @RequestBody TaskJob taskJob) {
        var res = taskService.updateTask(id, taskJob);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{userId}/assignTask/{taskId}")
    public ResponseEntity<User> assignTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {
        User updatedUser = taskService.assignTaskToUser(userId, taskId);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("")
    public ResponseEntity<List<TaskJob>> getAllProducts(@RequestParam(required = false) String q) {
        if (q != null) {
            return ResponseEntity.ok(taskService.getAllTasks(q));
        }
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TaskJob> deleteProduct(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("")
    public ResponseEntity<List<TaskJob>> getAllProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Boolean status
    ) {
        return ResponseEntity.ok(taskService.getAllTasks(q, status));
    }

}
