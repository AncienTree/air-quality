package com.github.ancienttree.airquality.model;

import com.github.ancienttree.airquality.dto.CityMockResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "city")
@Getter @NoArgsConstructor
public class City {

    @Id
    private String id; // id form external API

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String region;

    @Column(name = "region_id")
    private String regionId;

    public static City map(String id, CityMockResponse response) {
        City c = new City();

        c.id = id;
        c.country = response.country();
        c.city = response.city();
        c.region = response.region();
        c.regionId = response.regionId();

        return c;
    }
}