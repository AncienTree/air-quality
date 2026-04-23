package com.github.ancienttree.airquality.repository;

import com.github.ancienttree.airquality.dto.CityStatsDto;
import com.github.ancienttree.airquality.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, String> {
    @Query("SELECT DISTINCT c.region FROM City c")
    List<String> getAllRegions();

    @Query("""
        SELECT new com.github.ancienttree.airquality.dto.CityStatsDto(
            m.cityId, c.country,
            AVG(m.no2), MAX(m.no2), MIN(m.no2),
            AVG(m.co), MAX(m.co), MIN(m.co),
            AVG(m.pm10), MAX(m.pm10), MIN(m.pm10)
        )
        FROM Measurement m
        JOIN City c ON c.id = m.cityId
        WHERE m.measuredAt >= :from
        GROUP BY m.cityId, c.country
""")
    List<CityStatsDto> getCityStatisticsByRange(Instant from);
}
