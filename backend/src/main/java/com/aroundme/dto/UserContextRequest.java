package com.aroundme.dto;

import com.aroundme.model.AlertCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserContextRequest {
    
    private Double latitude;
    private Double longitude;
    private String address;
    private Double radiusKm; // 2, 5, or 10 km
    private List<AlertCategory> interestedCategories;
    private String intent;
    private String destination;
}
