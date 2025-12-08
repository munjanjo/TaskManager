package com.example.taskspring;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }
    @PutMapping
    public Task addTask(@RequestBody String title) {
        return taskService.addTask(title);
    }
    @PutMapping("/{id}")
    public Task markDone(@PathVariable Long id) {
        return taskService.markDone(id);
    }
    @PutMapping("/update/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody String title) {
        return taskService.updateTitle(id,title);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

}
