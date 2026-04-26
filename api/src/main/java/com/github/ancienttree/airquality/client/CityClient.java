package com.github.ancienttree.airquality.client;

import com.github.ancienttree.airquality.dto.CityResponse;
import com.github.ancienttree.airquality.util.CityMockUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class CityClient {

    private final WebClient webClient;

    /**
     * External API is fictional (mocked system).
     * The URL does not actually exist, so every HTTP call would fail.
     * <p>
     * Therefore, we always fall back to a deterministic mock implementation
     * instead of relying on real network responses.
     */
    public CityResponse fetchCityFromExternal(String cityId) {
        log.info("Fetching city: {}", cityId);

        return webClient.get()
                .uri("/cities/{id}", cityId)
                .retrieve()
                .bodyToMono(CityResponse.class)
                .onErrorResume(ex -> {
                    log.error("Error calling API. Mocking response for cityId={}", cityId);
                    return Mono.just(mockResponse(cityId));
                })
                .block();
    }

    private CityResponse mockResponse(String cityId) {
        return CityMockUtil.mockCity(cityId);
    }
}
