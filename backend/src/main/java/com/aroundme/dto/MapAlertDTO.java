package com.aroundme.dto;

import com.aroundme.model.AlertCategory;
import com.aroundme.model.ImpactLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MapAlertDTO {
    private Double latitude;
    private Double longitude;
    private AlertCategory category;
    private ImpactLevel impact;
    private String title;
    private String summary; // use whyItMatters or description
}

