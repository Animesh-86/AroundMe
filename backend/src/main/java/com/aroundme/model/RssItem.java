package com.aroundme.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RssItem {
    private String title;
    private String description;
}
