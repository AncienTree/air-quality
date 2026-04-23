package com.github.ancienttree.airquality.service;

import com.github.ancienttree.airquality.dto.MeasurementRequestDTO;
import com.github.ancienttree.airquality.model.Measurement;
import com.github.ancienttree.airquality.repository.MeasurementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MeasurementService {

    private final MeasurementRepository measurementRepository;
    private final CityService cityService;

    public void save(MeasurementRequestDTO dto) {
        // Save city if not exists
        cityService.getOrCreateCity(dto.cityId());

        Measurement measurement = Measurement.map(dto);
        measurementRepository.save(measurement);
    }
}
