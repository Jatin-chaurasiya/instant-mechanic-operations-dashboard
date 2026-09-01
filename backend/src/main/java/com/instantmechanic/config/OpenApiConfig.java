package com.instantmechanic.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI instantMechanicOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Instant Mechanic API")
                        .description(
                                "REST API for the Instant Mechanic " +
                                        "vehicle service management dashboard."
                        )
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Instant Mechanic")
                        )
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        "bearerAuth",
                                        new SecurityScheme()
                                                .name("Authorization")
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}