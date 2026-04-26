package com.github.ancienttree.airquality.util;

import com.github.ancienttree.airquality.dto.CityResponse;

import java.util.List;
import java.util.Objects;

public class CityMockUtil {
    // Mock data for regions and cities
    private static final List<String> REGIONS = List.of("Polska", "Niemcy", "Francja", "Czechy");

    // Mock data for cities in each region
    private static final List<String> CITIES_PL = List.of("Warsaw", "Krakow", "Gdansk", "Katowice", "Poznan", "Wroclaw", "Szczecin", "Lublin");
    private static final List<String> CITIES_DE = List.of("Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt", "Stuttgart", "Dusseldorf", "Dresden");
    private static final List<String> CITIES_FR = List.of("Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux");
    private static final List<String> CITIES_CZ = List.of("Prague", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc", "Hradec Kralove", "Pardubice");

    public static CityResponse mockCity(String cityId) {
        Objects.requireNonNull(cityId, "City ID cannot be null");
        if (cityId.isBlank()) {
            throw new IllegalArgumentException("City ID cannot be empty");
        }

        // Generate a unique hash for the cityId
        int hash = Math.abs(cityId.hashCode());

        // Determine the region based on the hash
        int regionIndex = hash % REGIONS.size();
        String region = REGIONS.get(regionIndex);

        return switch (region) {
            case "Polska" -> build("PL", region, CITIES_PL, hash);
            case "Niemcy" -> build("DE", region, CITIES_DE, hash);
            case "Francja" -> build("FR", region, CITIES_FR, hash);
            case "Czechy" -> build("CZ", region, CITIES_CZ, hash);
            default -> throw new IllegalStateException("Unexpected region: " + region);
        };
    }

    // Helper method to build CityResponse based on region and city list
    private static CityResponse build(String country, String region, List<String> cities, int hash) {
        String city = cities.get(Math.abs(hash) % cities.size());
        return new CityResponse(country, city, region, region.toLowerCase());
    }
}
