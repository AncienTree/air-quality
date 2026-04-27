package com.github.ancienttree.airquality.service;

import com.github.ancienttree.airquality.dto.MeasurementRequest;
import com.github.ancienttree.airquality.dto.MeasurementResponse;
import com.github.ancienttree.airquality.model.Measurement;
import com.github.ancienttree.airquality.repository.MeasurementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeasurementService {

    private final MeasurementRepository measurementRepository;
    private final CityService cityService;

    public Long save(MeasurementRequest dto) {
        // Save city if not exists
        cityService.getOrCreateCity(dto.cityId());

        Measurement measurement = Measurement.map(dto);
        Measurement saved = measurementRepository.save(measurement);
        return saved.getId();
    }

    public List<MeasurementResponse> getMeasurements(String cityId) {
        return measurementRepository.findByCityIdOrderByMeasuredAtDesc(cityId)
                .stream()
                .map(measurement -> new MeasurementResponse(
                        measurement.getCityId(),
                        measurement.getPm10(),
                        measurement.getCo(),
                        measurement.getNo2(),
                        measurement.getMeasuredAt().toEpochMilli()
                )).toList();
    }
}
