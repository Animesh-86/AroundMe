package com.aroundme.controller;

import com.aroundme.service.RssIngestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rss")
@RequiredArgsConstructor
public class RssController {

    private final RssIngestService rssIngestService;

    @PostMapping("/ingest")
    public ResponseEntity<String> ingestRss() {
        int count = rssIngestService.ingest();
        return ResponseEntity.ok("RSS ingestion completed. Alerts added: " + count);
    }
}
