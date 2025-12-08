package com.example.taskspring;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )

    private long id;
    private String title;
    boolean completed;
    public Task() {}
    public Task(long id, String title, boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    public void setId(long id) {
        this.id = id;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
    public long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public boolean getCompleted() {return completed;}

    public boolean isCompleted() {
        return completed;

    }
    @Override
    public String toString() {
        return("id" + id + " title" + title +" completed" + completed);
    }
}
