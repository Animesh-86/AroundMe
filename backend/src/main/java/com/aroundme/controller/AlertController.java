package com.aroundme.controller;

import com.aroundme.dto.CuratedAlertsResponse;
import com.aroundme.dto.SubmitAlertRequest;
import com.aroundme.dto.UserContextRequest;
import com.aroundme.model.Alert;
import com.aroundme.model.AlertCategory;
import com.aroundme.service.AlertService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertController {
    
    private final AlertService alertService;
    
    /**
     * Main endpoint: Get AI-curated alerts based on user context
     * POST /api/alerts/curated
     */
    @PostMapping("/curated")
    public ResponseEntity<CuratedAlertsResponse> getCuratedAlerts(
            @RequestBody @Valid UserContextRequest request) {
        
        log.info("Received request for curated alerts at: {}", request.getAddress());
        
        CuratedAlertsResponse response = alertService.getCuratedAlerts(request);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Submit a new community alert
     * POST /api/alerts/submit
     */
    @PostMapping("/submit")
    public ResponseEntity<Alert> submitAlert(@RequestBody @Valid SubmitAlertRequest request) {
        
        log.info("New alert submission: {}", request.getTitle());
        
        Alert createdAlert = alertService.submitAlert(request);
        
        return ResponseEntity.ok(createdAlert);
    }
    
    /**
     * Get all available alert categories
     * GET /api/alerts/categories
     */
    @GetMapping("/categories")
    public ResponseEntity<List<AlertCategory>> getCategories() {
        return ResponseEntity.ok(alertService.getAllCategories());
    }
    
    /**
     * Health check endpoint
     * GET /api/alerts/health
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("AroundMe Backend is running!");
    }
}
