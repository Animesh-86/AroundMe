package com.aroundme.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "alerts")
public class Alert {
    
    @Id
    private String id;
    
    private String title;
    private String description;
    private AlertCategory category;
    private Location location;
    private LocalDateTime timestamp;
    private ImpactLevel impact;
    private String submittedBy;
    private String imageUrl;
    private boolean isActive;
    
    // AI-generated fields
    private Double relevanceScore;
    private String whyItMatters;
    private Double distanceFromUser; // in km
    
    public Alert(String title, String description, AlertCategory category, 
                 Location location, String submittedBy) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
        this.timestamp = LocalDateTime.now();
        this.submittedBy = submittedBy;
        this.isActive = true;
        this.impact = ImpactLevel.LOW;
    }
}
