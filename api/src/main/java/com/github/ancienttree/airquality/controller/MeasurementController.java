package com.github.ancienttree.airquality.controller;


import com.github.ancienttree.airquality.dto.ApiResponse;
import com.github.ancienttree.airquality.dto.CreateMeasurementResponse;
import com.github.ancienttree.airquality.dto.MeasurementRequest;
import com.github.ancienttree.airquality.service.MeasurementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/measurements")
@Tag(name = "Measurement", description = "Insert operation for measurement entities")
@RequiredArgsConstructor
public class MeasurementController {

    private final MeasurementService measurementService;

    @PostMapping
    @Operation(summary = "Create measurement entry")
    public ResponseEntity<ApiResponse<CreateMeasurementResponse>> createMeasurement(@RequestBody @Valid MeasurementRequest request) {
        Long id = measurementService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(new CreateMeasurementResponse(id)));
    }
}
