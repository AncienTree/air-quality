package com.github.ancienttree.airquality.controller;


import com.github.ancienttree.airquality.dto.ApiResponse;
import com.github.ancienttree.airquality.dto.CityResponse;
import com.github.ancienttree.airquality.service.CityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/city")
@Tag(name = "City", description = "Get information about cities")
@RequiredArgsConstructor
public class CityController {

    private final CityService cityService;

    @GetMapping
    @Operation(summary = "Get all cities")
    public ResponseEntity<ApiResponse<List<CityResponse>>> getCities() {
        List<CityResponse> cites = cityService.getAllCities();
        return ResponseEntity.ok(ApiResponse.ok(cites));
    }

    @GetMapping("/regions")
    @Operation(summary = "Get all unique region list")
    public ResponseEntity<ApiResponse<List<String>>> getAllRegions() {
        List<String> cites = cityService.getAllRegions();
        return ResponseEntity.ok(ApiResponse.ok(cites));
    }
}
