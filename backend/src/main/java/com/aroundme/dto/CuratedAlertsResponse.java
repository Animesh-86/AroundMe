package com.aroundme.dto;

import com.aroundme.model.Alert;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CuratedAlertsResponse {
    
    private List<Alert> alerts;
    private String aiSummary;
    private int totalAlertsAnalyzed;
    private int relevantAlertsReturned;
}
