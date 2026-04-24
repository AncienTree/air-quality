package com.github.ancienttree.airquality.model;

import com.github.ancienttree.airquality.dto.MeasurementRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "measurement")
@Getter @NoArgsConstructor
public class Measurement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "measurement_seq")
    @SequenceGenerator(
            name = "measurement_seq",
            sequenceName = "measurement_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "sensor_id")
    private String sensorId;

    @Column(name = "city_id")
    private String cityId;

    private Double pm10;
    private Double co;
    private Double no2;

    @Column(name = "measured_at")
    private Instant measuredAt;

    public static Measurement map(MeasurementRequest dto) {
        Measurement m = new Measurement();

        m.sensorId = dto.sensorId();
        m.cityId = dto.cityId();
        m.pm10 = dto.pm10();
        m.co = dto.co();
        m.no2 = dto.no2();
        m.measuredAt = Instant.ofEpochSecond(dto.timestamp());

        return m;
    }
}
