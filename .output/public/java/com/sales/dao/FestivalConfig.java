package com.sales.dao;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * FestivalConfig.java
 * Simple, maintainable festival date configuration.
 * Key format: "Festival-Year"  ->  { fromDate, toDate }
 * To support a new year just add one line.
 */
public class FestivalConfig {

    private static final Map<String, String[]> WINDOWS = new HashMap<>();

    static {
        WINDOWS.put("Holi-2025",      new String[]{"2025-03-11", "2025-03-15"});
        WINDOWS.put("Holi-2026",      new String[]{"2026-03-01", "2026-03-05"});
        WINDOWS.put("Eid-2025",       new String[]{"2025-03-28", "2025-04-01"});
        WINDOWS.put("Eid-2026",       new String[]{"2026-03-18", "2026-03-22"});
        WINDOWS.put("Diwali-2025",    new String[]{"2025-10-17", "2025-10-23"});
        WINDOWS.put("Diwali-2026",    new String[]{"2026-11-06", "2026-11-12"});
        WINDOWS.put("Christmas-2025", new String[]{"2025-12-20", "2025-12-26"});
        WINDOWS.put("Christmas-2026", new String[]{"2026-12-20", "2026-12-26"});
    }

    /** Returns { fromDate, toDate } or null when not configured. */
    public static Date[] getWindow(String festival, int year) {
        String[] w = WINDOWS.get(festival + "-" + year);
        if (w == null) { return null; }
        return new Date[]{ Date.valueOf(w[0]), Date.valueOf(w[1]) };
    }
}