package com.aroundme.model;

import java.util.List;

public class RssUtil {

    public static List<RssItem> fetch() {
        // Hardcode sample RSS content OR
        // Use Rome library if already familiar

        return List.of(
                new RssItem(
                        "Heavy rainfall expected in Vadodara",
                        "IMD predicts heavy rainfall in Vadodara tonight. Waterlogging likely in low-lying areas."
                )
        );
    }
}

