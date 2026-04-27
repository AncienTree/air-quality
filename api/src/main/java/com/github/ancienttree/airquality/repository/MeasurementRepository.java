package com.github.ancienttree.airquality.repository;

import com.github.ancienttree.airquality.model.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    List<Measurement> findByCityIdOrderByMeasuredAtDesc(String cityId);
}
