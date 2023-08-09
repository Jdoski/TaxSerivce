package com.skillstorm.backend.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    // Used to configure the endpoints that require authentication/authorization for
    // spring security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        /*
          // using the httpsecurity object to configure which endpoints require
          // authentication/authorization
          http
          .authorizeHttpRequests((authorizeHttpRequests) ->
          authorizeHttpRequests
          //.mvcMatchers("/users/private_info").authenticated()
          .mvcMatchers(HttpMethod.POST, "/users/user").permitAll()
          .mvcMatchers(HttpMethod.GET, "/users/**").permitAll()
          .mvcMatchers(HttpMethod.POST, "/users/**").permitAll()
          .mvcMatchers(HttpMethod.GET, "/returns/").permitAll()
          .mvcMatchers(HttpMethod.POST, "/returns/").permitAll()
          .mvcMatchers(HttpMethod.POST, "/users/returns/create").permitAll()
          )
          // use Basic Authentication instead of Form Login
          .httpBasic();*/
         

        http
                .authorizeHttpRequests(authorizeHttpRequests -> {

                    // all requests coming in require authentication
                    authorizeHttpRequests.anyRequest().authenticated();
                    //authorizeHttpRequests.anyRequest().permitAll();
                })
                .csrf(csrf -> csrf.disable()) // just to set up login
                // when oauth is involved, you need to manually configure cors to allow react
                // frontend to communicate
                .cors(cors -> {
                    cors.configurationSource(request -> {

                        // configuring how we want to handle cors
                        CorsConfiguration corsConfig = new CorsConfiguration();
                        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // what origins are
                                                                                              // allowed
                        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE")); // what http
                                                                                                     // methods are
                                                                                                     // allowed
                        corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // what headers
                                                                                                      // are allowed
                        corsConfig.setAllowCredentials(true); // allow cookies to be sent to backend
                        corsConfig.setMaxAge(3600L); // how long to cache the cors preflight request (OPTIONS)

                        // setting which endpoints to apply the above cors configurations to
                        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                        source.registerCorsConfiguration("/**", corsConfig);

                        return corsConfig;
                    });
                });

        // Telling spring security to use our registered OAuth2 client
        http.oauth2Login();

        return http.build();

        // http.formLogin();
        // http.logout();

        /**
         * Cross Site Request Forgery
         * when someone is trying to be you while you are logged in
         * 
         * Spring Security handles this by using a Synchronizer Token pattern
         * - when you do a GET request, the server will generate a token and return it
         * - then in every future rrequest that modifies data (Put, Post, Delete, etc.)
         * you need to include the token in the header
         * 
         * can be disabled with csrf().disable() but this is BAD PRACTICE
         */
        /*
         * http.csrf((csrf) ->
         * // the CSRF filter will check for the csrf token on every modifying reques,
         * except to /users/register
         * csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).
         * ignoringAntMatchers("/users")
         * );
         */
        // http.csrf().disable();

        // return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
