package com.example.backend.service;

import com.example.backend.model.TaskJob;
import com.example.backend.model.User;

import java.util.List;

public interface TaskService {
    TaskJob createProduct(TaskJob taskJob);

    List<TaskJob> getAllTasks();
    List<TaskJob> getAllTasks(String q);

    void deleteTask(long id);

    User assignTaskToUser(Long userId, Long taskId);

    TaskJob updateTask(long id, TaskJob taskJob);

    public List<TaskJob> getAllTasks(String name, Boolean status) ;

}

