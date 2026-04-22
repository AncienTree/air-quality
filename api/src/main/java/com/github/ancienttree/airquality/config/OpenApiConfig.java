package com.github.ancienttree.airquality.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info()
                        .title("Air Quality Application Demo")
                        .version("1.0.0")
                        .description("A simple air quality app. It is for the recruitment process.")
                );
    }
}
