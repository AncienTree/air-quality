package com.github.ancienttree.airquality.util;

import com.github.ancienttree.airquality.dto.CityMockResponse;
import com.github.ancienttree.airquality.dto.mock.CountryData;
import com.github.ancienttree.airquality.dto.mock.RegionData;

import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CityMockUtil {
    // Mock data for countries
    private static final List<CountryData> COUNTRIES = List.of(
            new CountryData("Polska", List.of(
                    new RegionData("Śląskie", List.of(
                            "Katowice", "Gliwice", "Zabrze", "Bytom", "Rybnik", "Tychy"
                    )),
                    new RegionData("Mazowieckie", List.of(
                            "Warszawa", "Radom", "Płock", "Siedlce", "Ostrołęka", "Ciechanów"
                    )),
                    new RegionData("Małopolskie", List.of(
                            "Kraków", "Tarnów", "Nowy Sącz", "Oświęcim", "Bochnia", "Zakopane"
                    )),
                    new RegionData("Dolnośląskie", List.of(
                            "Wrocław", "Legnica", "Wałbrzych", "Jelenia Góra", "Lubin", "Głogów"
                    ))
            )),

            new CountryData("Niemcy", List.of(
                    new RegionData("Bavaria", List.of(
                            "Munich", "Nuremberg", "Augsburg", "Regensburg", "Ingolstadt", "Wurzburg"
                    )),
                    new RegionData("North Rhine-Westphalia", List.of(
                            "Cologne", "Dusseldorf", "Dortmund", "Essen", "Bonn", "Bochum"
                    )),
                    new RegionData("Baden-Wurttemberg", List.of(
                            "Stuttgart", "Karlsruhe", "Mannheim", "Freiburg", "Heidelberg", "Ulm"
                    )),
                    new RegionData("Saxony", List.of(
                            "Dresden", "Leipzig", "Chemnitz", "Zwickau", "Gorlitz", "Plauen"
                    ))
            )),

            new CountryData("Francja", List.of(
                    new RegionData("Ile-de-France", List.of(
                            "Paris", "Boulogne-Billancourt", "Saint-Denis", "Versailles", "Nanterre", "Creteil"
                    )),
                    new RegionData("Provence-Alpes-Cote d'Azur", List.of(
                            "Marseille", "Nice", "Toulon", "Avignon", "Cannes", "Antibes"
                    )),
                    new RegionData("Auvergne-Rhone-Alpes", List.of(
                            "Lyon", "Grenoble", "Saint-Etienne", "Clermont-Ferrand", "Chambery", "Annecy"
                    )),
                    new RegionData("Nouvelle-Aquitaine", List.of(
                            "Bordeaux", "Limoges", "Poitiers", "Pau", "La Rochelle", "Angouleme"
                    ))
            )),

            new CountryData("Czechy", List.of(
                    new RegionData("Central Bohemian", List.of(
                            "Kladno", "Mlada Boleslav", "Kolín", "Pribram", "Kutna Hora", "Benesov"
                    )),
                    new RegionData("South Moravian", List.of(
                            "Brno", "Znojmo", "Hodonin", "Břeclav", "Vyskov", "Blansko"
                    )),
                    new RegionData("Moravian-Silesian", List.of(
                            "Ostrava", "Karvina", "Frydek-Mistek", "Opava", "Havirov", "Trinec"
                    )),
                    new RegionData("Pilsen Region", List.of(
                            "Plzen", "Klatovy", "Tachov", "Domazlice", "Rokycany", "Stod"
                    ))
            ))
    );

    // To prevent duplication of city
    private static final List<String[]> ALL_CITIES =
            COUNTRIES.stream()
                    .flatMap(country ->
                            country.regions().stream()
                                    .flatMap(region ->
                                            region.cities().stream()
                                                    .map(city -> new String[]{
                                                            country.name(),
                                                            city,
                                                            region.name(),
                                                            region.name().toLowerCase().replace(" ", "-")
                                                    })
                                    )
                    )
                    .toList();

    private static final Pattern CITY_ID_PATTERN = Pattern.compile("^city-(\\d+)$");

    public static CityMockResponse mockCity(String cityId) {
        Objects.requireNonNull(cityId, "City ID cannot be null");
        if (cityId.isBlank()) {
            throw new IllegalArgumentException("City ID cannot be empty");
        }

        int index;
        Matcher m = CITY_ID_PATTERN.matcher(cityId.trim());
        // If is from script generator like city-1, city-2
        if (m.matches()) {
            try {
                int num = Integer.parseInt(m.group(1));

                // Use modulo to wrap around the list of cities
                index = (num - 1) % ALL_CITIES.size();
                if (index < 0) index += ALL_CITIES.size();
            } catch (NumberFormatException e) {
                index = Math.floorMod(cityId.hashCode(), ALL_CITIES.size());
            }
        } else {
            index = Math.floorMod(cityId.hashCode(), ALL_CITIES.size());
        }
        String[] entry = ALL_CITIES.get(index);

        return new CityMockResponse(
                entry[0], // country
                entry[1], // city
                entry[2], // region
                entry[3]  // regionId
        );
    }
}