package com.aroundme.service;

import com.aroundme.model.Alert;
import com.aroundme.model.AlertCategory;
import com.aroundme.model.ImpactLevel;
import com.aroundme.model.Location;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Mock data service for hackathon demo
 * Generates realistic city alerts for testing
 */
@Service
public class MockDataService {
    
    private final Random random = new Random();
    
    public List<Alert> generateMockAlerts(String city) {
        List<Alert> alerts = new ArrayList<>();
        
        if (city.equalsIgnoreCase("Vadodara") || city.toLowerCase().contains("vadodara")) {
            alerts.addAll(generateVadodaraAlerts());
        } else {
            alerts.addAll(generateGenericAlerts());
        }
        
        return alerts;
    }
    
    private List<Alert> generateVadodaraAlerts() {
        List<Alert> alerts = new ArrayList<>();
        
        // Traffic alerts
        alerts.add(createAlert(
            "Heavy Traffic Near Akota",
            "Major congestion on RC Dutt Road due to ongoing cultural event at Akota Garden. Traffic moving slowly between Akota Stadium and Mandvi.",
            AlertCategory.TRAFFIC,
            new Location(22.3120, 73.1820, "RC Dutt Road, Akota", "Vadodara"),
            "TrafficBot"
        ));
        
        alerts.add(createAlert(
            "Road Construction on NH48",
            "Single lane closure on NH48 near Vadodara Refinery. Expect delays during peak hours. Work ongoing till January 15.",
            AlertCategory.ROAD_WORK,
            new Location(22.2855, 73.1777, "NH48, Koyali", "Vadodara"),
            "PWD Department"
        ));
        
        alerts.add(createAlert(
            "Accident Near Sayajigunj Circle",
            "Minor vehicle collision reported at Sayajigunj Circle. Traffic police on site. One lane blocked, expect 10-15 min delay.",
            AlertCategory.TRAFFIC,
            new Location(22.3072, 73.1812, "Sayajigunj Circle", "Vadodara"),
            "Traffic Control"
        ));
        
        // Weather alerts
        alerts.add(createAlert(
            "Rain Expected This Evening",
            "Moderate rainfall forecasted between 6 PM - 9 PM. Carry umbrellas. Roads may be slippery, drive carefully.",
            AlertCategory.WEATHER,
            new Location(22.3072, 73.1812, "Vadodara City", "Vadodara"),
            "Weather Service"
        ));
        
        // Event alerts
        alerts.add(createAlert(
            "Navratri Festival at ISKCON Temple",
            "Large Garba event at ISKCON Vadodara tonight 8 PM - 12 AM. Heavy footfall expected. Parking may be limited.",
            AlertCategory.EVENTS,
            new Location(22.3150, 73.1700, "ISKCON Temple, Gotri", "Vadodara"),
            "Event Organizer"
        ));
        
        alerts.add(createAlert(
            "Marathon Tomorrow Morning",
            "Vadodara City Marathon starting 6 AM from Khanderao Market. Major roads will be closed 5 AM - 10 AM.",
            AlertCategory.EVENTS,
            new Location(22.2987, 73.2085, "Khanderao Market", "Vadodara"),
            "Sports Authority"
        ));
        
        // Safety alerts
        alerts.add(createAlert(
            "Street Light Maintenance",
            "Street lights under maintenance on Alkapuri roads tonight. Exercise caution while driving after 10 PM.",
            AlertCategory.SAFETY,
            new Location(22.3019, 73.1896, "Alkapuri", "Vadodara"),
            "Municipal Corp"
        ));
        
        alerts.add(createAlert(
            "Water Supply Disruption",
            "Water supply will be affected in Manjalpur area tomorrow 10 AM - 4 PM due to pipeline repair work.",
            AlertCategory.PUBLIC_TRANSPORT,
            new Location(22.2744, 73.1947, "Manjalpur", "Vadodara"),
            "Water Department"
        ));
        
        // Community alerts
        alerts.add(createAlert(
            "Lost Pet - Golden Retriever",
            "Golden Retriever dog missing near Alkapuri Garden since morning. If found, please contact 98765xxxxx.",
            AlertCategory.COMMUNITY,
            new Location(22.3019, 73.1896, "Alkapuri Garden", "Vadodara"),
            "Community User"
        ));
        
        alerts.add(createAlert(
            "Free Medical Camp",
            "Free health checkup camp at Kirti Mandir tomorrow 9 AM - 5 PM. Blood pressure, diabetes screening available.",
            AlertCategory.EVENTS,
            new Location(22.3065, 73.1898, "Kirti Mandir", "Vadodara"),
            "Health NGO"
        ));
        
        alerts.add(createAlert(
            "Parking Full at Inorbit Mall",
            "Inorbit Mall parking at full capacity. Consider using nearby parking or public transport.",
            AlertCategory.TRAFFIC,
            new Location(22.2965, 73.1863, "Inorbit Mall, Alkapuri", "Vadodara"),
            "Mall Management"
        ));
        
        alerts.add(createAlert(
            "Power Outage Warning",
            "Scheduled power cut in Vasna area tomorrow 11 AM - 1 PM for maintenance work.",
            AlertCategory.PUBLIC_TRANSPORT,
            new Location(22.2832, 73.1989, "Vasna", "Vadodara"),
            "Power Company"
        ));
        
        return alerts;
    }
    
    private List<Alert> generateGenericAlerts() {
        List<Alert> alerts = new ArrayList<>();
        
        alerts.add(createAlert(
            "Heavy Traffic on Main Street",
            "Congestion due to road work. Expect delays.",
            AlertCategory.TRAFFIC,
            new Location(22.3072, 73.1812, "Main Street", "City"),
            "TrafficBot"
        ));
        
        alerts.add(createAlert(
            "Weather Alert",
            "Rain expected this evening. Carry umbrellas.",
            AlertCategory.WEATHER,
            new Location(22.3072, 73.1812, "City Center", "City"),
            "Weather Service"
        ));
        
        return alerts;
    }
    
    private Alert createAlert(String title, String description, AlertCategory category, 
                              Location location, String submittedBy) {
        Alert alert = new Alert();
        alert.setId(generateId());
        alert.setTitle(title);
        alert.setDescription(description);
        alert.setCategory(category);
        alert.setLocation(location);
        alert.setTimestamp(LocalDateTime.now().minusMinutes(random.nextInt(120)));
        alert.setSubmittedBy(submittedBy);
        alert.setActive(true);
        alert.setImpact(ImpactLevel.LOW);
        alert.setRelevanceScore(0.0);
        
        return alert;
    }
    
    private String generateId() {
        return "MOCK-" + System.currentTimeMillis() + "-" + random.nextInt(1000);
    }
}
