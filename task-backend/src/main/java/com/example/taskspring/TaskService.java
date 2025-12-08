package com.example.taskspring;

import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    public Task addTask(String title) {
        Task t = new Task();
        t.setTitle(title);
        t.setCompleted(false);
        return taskRepository.save(t); // INSERT u bazu
    }

    public Task markDone(Long id) {
        return taskRepository.findById(id).map(task ->  {
            task.setCompleted(true);
            return taskRepository.save(task);
        }).orElse(null);
    }
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
    public Task updateTitle(Long id, String title) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            task.setTitle(title.trim());
        }
        return taskRepository.save(task);
    }
}
