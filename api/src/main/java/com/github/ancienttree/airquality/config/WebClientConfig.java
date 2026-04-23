package com.github.ancienttree.airquality.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient(@Value("${external.city.url}") String url) {
        return WebClient.builder().baseUrl(url).build();
    }
}
