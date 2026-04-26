package com.github.ancienttree.airquality.mapper;

import com.github.ancienttree.airquality.dto.CityResponse;
import com.github.ancienttree.airquality.model.City;

public class CityMapper {
    public static CityResponse toDto(City city) {
        return new CityResponse(city.getId(), city.getCity(), city.getCountry(), city.getRegion(), city.getRegionId());
    }
}
