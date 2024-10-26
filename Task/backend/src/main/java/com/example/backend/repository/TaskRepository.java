package com.example.backend.repository;

import com.example.backend.model.TaskJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface TaskRepository extends JpaRepository<TaskJob, Long> {
    @Query("SELECT t FROM TaskJob t WHERE t.name like %:name%")
    public List<TaskJob> findByName(String name);

    @Query("SELECT t FROM TaskJob t WHERE (t.name LIKE %:searchTerm% OR t.done = :isDone)")
    List<TaskJob> searchTasks(@Param("searchTerm") String searchTerm, @Param("isDone") Boolean isDone);
}

