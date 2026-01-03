package com.aroundme.service;

import com.aroundme.model.*;
import com.aroundme.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RssIngestService {

    private final AlertRepository alertRepository;
    private final OpenAIReasoningService aiReasoningService;

    public int ingest() {
        // Step 1: Fetch RSS items (hardcode 1–2 feeds)
        List<RssItem> items = RssUtil.fetch();

        int saved = 0;

        for (RssItem item : items) {

            // Step 2: Ask GPT to convert RSS → Alert
            Alert alert = aiReasoningService.convertRssToAlert(item);

            if (alert != null) {
                alert.setTimestamp(LocalDateTime.now());
                alert.setActive(true);
                alert.setSubmittedBy("Public RSS Feed");
                alertRepository.save(alert);
                saved++;
            }
        }

        log.info("RSS ingest saved {} alerts", saved);
        return saved;
    }


}
