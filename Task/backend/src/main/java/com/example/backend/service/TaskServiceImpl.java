package com.example.backend.service;

import com.example.backend.exception.TaskJobNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.TaskJob;
import com.example.backend.model.User;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public TaskJob createProduct(TaskJob product) {
        return taskRepository.save(product);
    }

    @Override
    public List<TaskJob> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public List<TaskJob> getAllTasks(String q) {
        return taskRepository.findByName(q);
    }

    @Override
    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskJob updateTask(long id, TaskJob taskDetails) {
        TaskJob task = taskRepository.findById(id).orElseThrow();
        task.setName(taskDetails.getName());
        task.setDone(taskDetails.getDone());
        return taskRepository.save(task);
    }

    @Override
    public User assignTaskToUser(Long userId, Long taskId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

        TaskJob taskJob = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskJobNotFoundException("TaskJob with ID " + taskId + " not found"));

        taskJob.setUser(user);

        taskRepository.save(taskJob);
        return user;
    }
    @Override
    public List<TaskJob> getAllTasks(String searchTerm, Boolean status) {
        if (searchTerm != null || status != null) {
            return taskRepository.searchTasks(searchTerm, status);
        }
        return taskRepository.findAll();
    }

}

