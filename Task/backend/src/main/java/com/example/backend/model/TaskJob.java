package com.example.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class TaskJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(columnDefinition = "boolean default false")
    private Boolean done;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
