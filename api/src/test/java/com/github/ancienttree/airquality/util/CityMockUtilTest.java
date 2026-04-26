package com.github.ancienttree.airquality.util;

import com.github.ancienttree.airquality.dto.CityResponse;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class CityMockUtilTest {
    @Test
    void shouldReturnSameCityForSameId() {
        String cityId = "123";

        CityResponse first = CityMockUtil.mockCity(cityId);
        CityResponse second = CityMockUtil.mockCity(cityId);

        assertThat(first).isEqualTo(second);
    }

    @Test
    void shouldReturnValidRegion() {
        CityResponse response = CityMockUtil.mockCity("abc");

        assertThat(response.region())
                .isIn("Polska", "Niemcy", "Francja", "Czechy");
    }

    @Test
    void shouldReturnValidCountryCode() {
        CityResponse response = CityMockUtil.mockCity("xyz");
        assertThat(response.country())
                .isIn("PL", "DE", "FR", "CZ");
    }

    @Test
    void shouldGenerateRegionId() {
        CityResponse response = CityMockUtil.mockCity("1");

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
