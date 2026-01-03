package com.aroundme.controller;

import com.aroundme.dto.CuratedAlertsResponse;
import com.aroundme.dto.MapAlertDTO;
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

    @PostMapping("/curated")
    public ResponseEntity<CuratedAlertsResponse> getCuratedAlerts(
            @RequestBody @Valid UserContextRequest request) {
        
        log.info("Received request for curated alerts at: {}", request.getAddress());
        
        CuratedAlertsResponse response = alertService.getCuratedAlerts(request);
        
        return ResponseEntity.ok(response);
    }
    

    @PostMapping("/submit")
    public ResponseEntity<Alert> submitAlert(@RequestBody @Valid SubmitAlertRequest request) {
        
        log.info("New alert submission: {}", request.getTitle());
        
        Alert createdAlert = alertService.submitAlert(request);
        
        return ResponseEntity.ok(createdAlert);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<AlertCategory>> getCategories() {
        return ResponseEntity.ok(alertService.getAllCategories());
    }
    

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("AroundMe Backend is running!");
    }

    @GetMapping("/map")
    public ResponseEntity<List<MapAlertDTO>> getMapAlerts(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "5") Double radiusKm
    ) {
        if (latitude == null || longitude == null) {
            return ResponseEntity.badRequest().body(List.of());
        }

        return ResponseEntity.ok(
                alertService.getMapAlerts(latitude, longitude, radiusKm)
        );
    }
}
