/*
package com.skillstorm.backend.config;

import org.omg.CORBA.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.autoconfigure.mongo.MongoPropertiesClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.MongoClientSettings;

@Configuration
public class DocumentDBConf {

    private MongoProperties properties;

    @Value("${TRUST_STORE}")
    public static String KEY_STORE_TYPE = "/tmp/certs/rds-truststore.jks";

    @Value("${TRUST_STORE_PS}")
    public static String DEFAULT_KEY_STORE_PASSWORD = "password";

    public DocumentDBConf(final MongoProperties properties) {
        super();
        this.properties = properties;
    }

    @Bean
    public MongoClientSettings mongoClientSettings() {
        setSslProperties();
        return MongoClientSettings.builder()
                .applyToSslSettings(builder -> builder.enabled(true))
                .build();
    }

    private static void setSslProperties() {
        System.setProperty("javax.net.ssl.trustStore", KEY_STORE_TYPE);
        System.setProperty("javax.net.ssl.trustStorePassword",
                DEFAULT_KEY_STORE_PASSWORD);
    }

    @Bean
    public MongoPropertiesClientSettingsBuilderCustomizer mongoPropertiesCustomizer(final MongoProperties properties) {
        return new MongoPropertiesClientSettingsBuilderCustomizer(properties, null);
    }
}
*/