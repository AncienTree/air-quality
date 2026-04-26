package com.github.ancienttree.airquality.util;

import com.github.ancienttree.airquality.dto.CityMockResponse;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class CityMockUtilTest {
    @Test
    void shouldReturnSameCityForSameId() {
        String cityId = "123";

        CityMockResponse first = CityMockUtil.mockCity(cityId);
        CityMockResponse second = CityMockUtil.mockCity(cityId);

        assertThat(first).isEqualTo(second);
    }

    @Test
    void shouldReturnValidRegion() {
        CityMockResponse response = CityMockUtil.mockCity("abc");
        assertThat(response.region())
                .isIn(
                        "Śląskie", "Mazowieckie", "Małopolskie", "Dolnośląskie",
                        "Bavaria", "North Rhine-Westphalia", "Baden-Wurttemberg", "Saxony",
                        "Ile-de-France", "Provence-Alpes-Cote d'Azur", "Auvergne-Rhone-Alpes", "Nouvelle-Aquitaine",
                        "Central Bohemian", "South Moravian", "Moravian-Silesian", "Pilsen Region"
                );
    }

    @Test
    void shouldReturnValidCountryCode() {
        CityMockResponse response = CityMockUtil.mockCity("xyz");
        assertThat(response.country())
                .isIn("Polska", "Niemcy", "Francja", "Czechy");
    }

    @Test
    void shouldGenerateRegionId() {
        CityMockResponse response = CityMockUtil.mockCity("1");

        assertThat(response.regionId())
                .isNotBlank()
                .doesNotContain(" ");
    }

    @Test
    void shouldThrowExceptionForEmptyCityId() {
        assertThatThrownBy(() -> CityMockUtil.mockCity(""))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void shouldThrowExceptionForNullCityId() {
        assertThatThrownBy(() -> CityMockUtil.mockCity(null))
                .isInstanceOf(NullPointerException.class);
    }
}
