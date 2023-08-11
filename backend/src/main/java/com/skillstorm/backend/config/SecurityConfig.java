package com.skillstorm.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.skillstorm.backend.services.CustomUserDetailsService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    // Define the security filter chain with cors at the beginning using oauth2 for login
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                //.requiresChannel(channel ->
                //    channel.anyRequest().requiresSecure())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> {
                    auth.anyRequest().permitAll();
                    //auth.mvcMatchers("/users/hello").permitAll();
                    //auth.mvcMatchers("/signin").permitAll();
                    //auth.mvcMatchers("/**").authenticated();
                    //auth.anyRequest().authenticated();
                })
                .csrf((csrf) ->
                    // the CSRF filter will check for the csrf token on every modifying request except for signin
                    //csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).ignoringAntMatchers("/signin"))
                    csrf.disable())
                //.oauth2Login(withDefaults())
                //.formLogin(withDefaults())
                .formLogin(form -> form
                                        .loginPage("/login").permitAll()
                                        )
                //.logout().invalidateHttpSession(true).clearAuthentication(true).permitAll()
                .logout(form -> form
                                        .logoutUrl("/logout").permitAll()
                                        )
                .build();
    }

    // encode sensitive information
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    // returns a cors configuration source
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173/"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

}

