package com.aroundme.service;

import com.aroundme.dto.UserContextRequest;
import com.aroundme.model.*;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAIReasoningService {
    
    private final OpenAiService openAiService;
    
    @Value("${openai.model}")
    private String model;
    
    /**
     * Core AI reasoning method - Analyzes alerts and user context
     * Returns curated, ranked alerts with AI-generated explanations
     */
    public List<Alert> curateAlerts(List<Alert> rawAlerts, UserContextRequest userContext) {
        log.info("Starting AI curation for {} raw alerts", rawAlerts.size());
        
        try {
            // Build the AI prompt
            String prompt = buildCurationPrompt(rawAlerts, userContext);
            
            // Call OpenAI
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model(model)
                    .messages(List.of(
                            new ChatMessage(ChatMessageRole.SYSTEM.value(), getSystemPrompt()),
                            new ChatMessage(ChatMessageRole.USER.value(), prompt)
                    ))
                    .temperature(0.7)
                    .maxTokens(2000)
                    .build();
            
            ChatCompletionResult result = openAiService.createChatCompletion(request);
            String aiResponse = result.getChoices().get(0).getMessage().getContent();
            
            log.debug("OpenAI Response: {}", aiResponse);
            
            // Parse AI response and update alerts
            return parseAIResponse(aiResponse, rawAlerts);
            
        } catch (Exception e) {
            log.error("Error in AI curation", e);
            // Fallback: return alerts sorted by timestamp
            return rawAlerts.stream()
                    .limit(5)
                    .toList();
        }
    }
    
    /**
     * System prompt that defines AI's role and behavior
     */
    private String getSystemPrompt() {
        return """
            You are an AI reasoning engine for AroundMe, a hyperlocal contextual alert system.
            Your role is to analyze multiple city alerts (traffic, weather, events, safety, etc.) and:
            
            1. Understand user context: location, radius, interests, and intent
            2. Correlate related alerts (e.g., rain + event = traffic congestion)
            3. Rank alerts by relevance to the user's situation
            4. Assign impact levels: HIGH (urgent, directly affects user), MEDIUM (important but manageable), LOW (informational), INFO (general awareness)
            5. Generate clear "Why this matters" explanations in human language
            6. Remove duplicates or overlapping information
            7. Prioritize actionable insights over raw data
            
            Be concise, contextual, and helpful. Focus on what matters to THIS user in THIS moment.
            """;
    }
    
    /**
     * Build the user prompt with context and alerts
     */
    private String buildCurationPrompt(List<Alert> rawAlerts, UserContextRequest userContext) {
        StringBuilder prompt = new StringBuilder();
        
        prompt.append("=== USER CONTEXT ===\n");
        prompt.append("Location: ").append(userContext.getAddress()).append("\n");
        prompt.append("Coordinates: (").append(userContext.getLatitude()).append(", ")
              .append(userContext.getLongitude()).append(")\n");
        prompt.append("Search Radius: ").append(userContext.getRadiusKm()).append(" km\n");
        
        if (userContext.getIntent() != null && !userContext.getIntent().isEmpty()) {
            prompt.append("User Intent: ").append(userContext.getIntent()).append("\n");
        }
        
        if (userContext.getDestination() != null && !userContext.getDestination().isEmpty()) {
            prompt.append("Destination: ").append(userContext.getDestination()).append("\n");
        }
        
        prompt.append("Interested Categories: ").append(userContext.getInterestedCategories()).append("\n\n");
        
        prompt.append("=== RAW ALERTS (").append(rawAlerts.size()).append(" total) ===\n\n");
        
        for (int i = 0; i < rawAlerts.size(); i++) {
            Alert alert = rawAlerts.get(i);
            prompt.append("ALERT #").append(i + 1).append("\n");
            prompt.append("ID: ").append(alert.getId()).append("\n");
            prompt.append("Title: ").append(alert.getTitle()).append("\n");
            prompt.append("Description: ").append(alert.getDescription()).append("\n");
            prompt.append("Category: ").append(alert.getCategory()).append("\n");
            prompt.append("Location: ").append(alert.getLocation().getAddress()).append("\n");
            prompt.append("Distance: ").append(String.format("%.2f", alert.getDistanceFromUser())).append(" km\n");
            prompt.append("---\n\n");
        }
        
        prompt.append("=== TASK ===\n");
        prompt.append("Analyze these alerts and return ONLY the top 3-5 most relevant ones.\n");
        prompt.append("For each selected alert, provide:\n");
        prompt.append("1. Alert ID (from above list)\n");
        prompt.append("2. Impact Level (HIGH/MEDIUM/LOW/INFO)\n");
        prompt.append("3. Relevance Score (0-100)\n");
        prompt.append("4. Why It Matters explanation (1-2 sentences, user-focused)\n\n");
        
        prompt.append("Format your response EXACTLY like this:\n");
        prompt.append("ALERT_ID: [ID]\n");
        prompt.append("IMPACT: [HIGH/MEDIUM/LOW/INFO]\n");
        prompt.append("RELEVANCE: [0-100]\n");
        prompt.append("WHY_IT_MATTERS: [Explanation]\n");
        prompt.append("---\n");
        prompt.append("(repeat for each alert)\n");
        
        return prompt.toString();
    }
    

    private List<Alert> parseAIResponse(String aiResponse, List<Alert> rawAlerts) {
        List<Alert> curatedAlerts = new ArrayList<>();
        
        // Split response by alert sections
        String[] sections = aiResponse.split("---");
        
        for (String section : sections) {
            if (section.trim().isEmpty()) continue;
            
            try {
                String alertId = extractField(section, "ALERT_ID");
                String impactStr = extractField(section, "IMPACT");
                String relevanceStr = extractField(section, "RELEVANCE");
                String whyItMatters = extractField(section, "WHY_IT_MATTERS");
                
                // Find the matching alert
                Alert matchedAlert = rawAlerts.stream()
                        .filter(a -> a.getId().equals(alertId))
                        .findFirst()
                        .orElse(null);
                
                if (matchedAlert != null) {
                    // Update with AI insights
                    matchedAlert.setImpact(ImpactLevel.valueOf(impactStr.toUpperCase()));
                    matchedAlert.setRelevanceScore(Double.parseDouble(relevanceStr));
                    matchedAlert.setWhyItMatters(whyItMatters);
                    
                    curatedAlerts.add(matchedAlert);
                }
                
            } catch (Exception e) {
                log.warn("Failed to parse alert section: {}", e.getMessage());
            }
        }
        
        // Sort by relevance score
        curatedAlerts.sort((a, b) -> Double.compare(b.getRelevanceScore(), a.getRelevanceScore()));
        
        log.info("Successfully curated {} alerts from {} raw alerts", 
                curatedAlerts.size(), rawAlerts.size());
        
        return curatedAlerts;
    }
    
    /**
     * Extract field value from AI response section
     */
    private String extractField(String section, String fieldName) {
        Pattern pattern = Pattern.compile(fieldName + ":\\s*(.+?)(?=\\n|$)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(section);
        
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        
        return "";
    }
    
    /**
     * Generate AI summary for the overall situation
     */
    public String generateSummary(List<Alert> curatedAlerts, UserContextRequest userContext) {
        if (curatedAlerts.isEmpty()) {
            return "No significant alerts in your area at this time.";
        }
        
        try {
            String prompt = buildSummaryPrompt(curatedAlerts, userContext);
            
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model(model)
                    .messages(List.of(
                            new ChatMessage(ChatMessageRole.SYSTEM.value(), 
                                    "You are a concise city awareness assistant. Summarize the key situation in 2-3 sentences."),
                            new ChatMessage(ChatMessageRole.USER.value(), prompt)
                    ))
                    .temperature(0.7)
                    .maxTokens(150)
                    .build();
            
            ChatCompletionResult result = openAiService.createChatCompletion(request);
            return result.getChoices().get(0).getMessage().getContent();
            
        } catch (Exception e) {
            log.error("Error generating summary", e);
            return "Multiple alerts detected in your area. Check details below.";
        }
    }
    
    private String buildSummaryPrompt(List<Alert> alerts, UserContextRequest userContext) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("User is at: ").append(userContext.getAddress()).append("\n");
        
        if (userContext.getIntent() != null) {
            prompt.append("Intent: ").append(userContext.getIntent()).append("\n");
        }
        
        prompt.append("\nTop alerts:\n");
        alerts.forEach(alert -> 
            prompt.append("- ").append(alert.getTitle()).append(" (")
                  .append(alert.getImpact()).append(")\n")
        );
        
        prompt.append("\nProvide a brief, actionable summary of what's happening.");
        
        return prompt.toString();
    }

    public Alert convertRssToAlert(RssItem item) {
        try {
            String prompt = """
            You are extracting city alerts from public news feeds.

            Rules:
            - If the news does NOT mention a clear city location, respond with IGNORE
            - Classify into one category:
              TRAFFIC, WEATHER, SAFETY, EVENTS, ROAD_WORK, EMERGENCY, OTHER
            - Write a 1-line public alert (clear and concise)
            - Assume city is Vadodara if city not explicitly mentioned
            - Do NOT hallucinate exact coordinates

            News:
            Title: %s
            Description: %s

            Output EXACTLY in this format:
            CATEGORY:
            SUMMARY:
            LOCATION:
            """.formatted(item.getTitle(), item.getDescription());

            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model(model)
                    .messages(List.of(
                            new ChatMessage(ChatMessageRole.SYSTEM.value(),
                                    "You convert news into structured city alerts."),
                            new ChatMessage(ChatMessageRole.USER.value(), prompt)
                    ))
                    .temperature(0.2) // IMPORTANT: keep deterministic
                    .maxTokens(200)
                    .build();

            ChatCompletionResult result = openAiService.createChatCompletion(request);
            String response = result.getChoices().get(0).getMessage().getContent();

            log.debug("RSS AI response: {}", response);

            if (response.toUpperCase().contains("IGNORE")) {
                return null;
            }

            String categoryStr = extractField(response, "CATEGORY");
            String summary = extractField(response, "SUMMARY");
            String locationText = extractField(response, "LOCATION");

            Alert alert = new Alert();
            alert.setTitle(item.getTitle());
            alert.setDescription(summary);
            alert.setCategory(parseCategory(categoryStr));
            alert.setImpact(ImpactLevel.INFO); // RSS = informational by default
            alert.setActive(true);
            alert.setSubmittedBy("Public RSS Feed");

            // IMPORTANT: do NOT fake coordinates
            alert.setLocation(new Location(
                    22.3072,   // Vadodara center fallback
                    73.1812,
                    locationText,
                    "Vadodara"
            ));

            return alert;

        } catch (Exception e) {
            log.error("Failed to convert RSS item to alert", e);
            return null;
        }
    }

    private AlertCategory parseCategory(String raw) {
        try {
            return AlertCategory.valueOf(raw.trim().toUpperCase());
        } catch (Exception e) {
            return AlertCategory.OTHER;
        }
    }


}
