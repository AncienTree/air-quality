package com.github.ancienttree.airquality.repository;

import com.github.ancienttree.airquality.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, String> {
    @Query("SELECT DISTINCT c.region FROM City c")
    public List<String> getAllRegions();
}
