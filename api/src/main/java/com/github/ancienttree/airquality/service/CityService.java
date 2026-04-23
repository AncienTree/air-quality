package com.github.ancienttree.airquality.service;

import com.github.ancienttree.airquality.client.CityClient;
import com.github.ancienttree.airquality.dto.CityResponse;
import com.github.ancienttree.airquality.model.City;
import com.github.ancienttree.airquality.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CityService {

    private final CityRepository cityRepository;
    private final CityClient cityClient;

    public City getOrCreateCity(String cityId) {
        return cityRepository.findById(cityId).orElseGet(() -> {
            log.info("City {} not found in database. Start fetching.", cityId);
            CityResponse response = cityClient.fetchCityFromExternal(cityId);
            City city = City.map(cityId, response);

            return cityRepository.save(city);
        });
    }
}
