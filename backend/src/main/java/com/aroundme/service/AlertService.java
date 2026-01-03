package com.aroundme.service;

import com.aroundme.dto.CuratedAlertsResponse;
import com.aroundme.dto.MapAlertDTO;
import com.aroundme.dto.SubmitAlertRequest;
import com.aroundme.dto.UserContextRequest;
import com.aroundme.model.Alert;
import com.aroundme.model.AlertCategory;
import com.aroundme.model.Location;
import com.aroundme.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlertService {
    
    private final AlertRepository alertRepository;
    private final OpenAIReasoningService aiReasoningService;
    private final MockDataService mockDataService;

    public CuratedAlertsResponse getCuratedAlerts(UserContextRequest userContext) {
        log.info("Getting curated alerts for location: {}", userContext.getAddress());
        
        // Step 1: Fetch raw alerts (from DB + mock data for demo)
        List<Alert> rawAlerts = fetchRawAlerts(userContext);
        log.info("Fetched {} raw alerts", rawAlerts.size());
        
        // Step 2: Calculate distances
        rawAlerts.forEach(alert -> {
            double distance = calculateDistance(
                userContext.getLatitude(), 
                userContext.getLongitude(),
                alert.getLocation().getLatitude(),
                alert.getLocation().getLongitude()
            );
            alert.setDistanceFromUser(distance);
        });
        
        // Step 3: Filter by radius
        List<Alert> alertsInRadius = rawAlerts.stream()
                .filter(alert -> alert.getDistanceFromUser() <= userContext.getRadiusKm())
                .collect(Collectors.toList());
        
        log.info("{} alerts within {} km radius", alertsInRadius.size(), userContext.getRadiusKm());
        
        if (alertsInRadius.isEmpty()) {
            return new CuratedAlertsResponse(List.of(), "No alerts found in your area.", 0, 0);
        }
        
        // Step 4: AI Reasoning - Curate and rank alerts
        List<Alert> curatedAlerts = aiReasoningService.curateAlerts(alertsInRadius, userContext);
        
        // Step 5: Generate AI summary
        String aiSummary = aiReasoningService.generateSummary(curatedAlerts, userContext);
        
        return new CuratedAlertsResponse(
            curatedAlerts,
            aiSummary,
            alertsInRadius.size(),
            curatedAlerts.size()
        );
    }

    private List<Alert> fetchRawAlerts(UserContextRequest userContext) {
        List<Alert> alerts;
        
        // Try to get from database first
        if (userContext.getInterestedCategories() != null && !userContext.getInterestedCategories().isEmpty()) {
            alerts = alertRepository.findByCategoryInAndIsActiveTrueOrderByTimestampDesc(
                userContext.getInterestedCategories()
            );
        } else {
            alerts = alertRepository.findByIsActiveTrue();
        }
        
        // Add mock data for demo (remove in production)
        String city = userContext.getAddress() != null ? userContext.getAddress() : "Vadodara";
        alerts.addAll(mockDataService.generateMockAlerts(city));
        
        return alerts;
    }

    public Alert submitAlert(SubmitAlertRequest request) {
        log.info("New alert submission: {}", request.getTitle());
        
        Location location = new Location(
            request.getLatitude(),
            request.getLongitude(),
            request.getAddress(),
            extractCity(request.getAddress())
        );
        
        Alert alert = new Alert(
            request.getTitle(),
            request.getDescription(),
            request.getCategory(),
            location,
            request.getSubmittedBy() != null ? request.getSubmittedBy() : "Anonymous"
        );
        
        alert.setImageUrl(request.getImageUrl());
        
        return alertRepository.save(alert);
    }

    public List<AlertCategory> getAllCategories() {
        return List.of(AlertCategory.values());
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS_KM = 6371;
        
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return EARTH_RADIUS_KM * c;
    }

    private String extractCity(String address) {
        if (address == null || address.isEmpty()) {
            return "Unknown";
        }
        
        String[] parts = address.split(",");
        return parts.length > 0 ? parts[parts.length - 1].trim() : "Unknown";
    }

    public List<MapAlertDTO> getMapAlerts(
            Double userLat, Double userLng, Double radiusKm) {

        List<Alert> alerts = alertRepository.findByIsActiveTrue();

        return alerts.stream()
                .peek(alert -> {
                    double dist = calculateDistance(
                            userLat, userLng,
                            alert.getLocation().getLatitude(),
                            alert.getLocation().getLongitude()
                    );
                    alert.setDistanceFromUser(dist);
                })
                .filter(alert -> alert.getDistanceFromUser() <= radiusKm)
                .limit(20) // CRITICAL: map safety
                .map(alert -> new MapAlertDTO(
                        alert.getLocation().getLatitude(),
                        alert.getLocation().getLongitude(),
                        alert.getCategory(),
                        alert.getImpact(),
                        alert.getTitle(),
                        alert.getWhyItMatters() != null
                                ? alert.getWhyItMatters()
                                : alert.getDescription()
                ))
                .toList();
    }

}
