package com.chron.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.chron.api.interceptor.JWTInterceptor;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
				.maxAge(6000);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/swagger-ui/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/");
	}

	@Autowired
	private JWTInterceptor jwtInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(jwtInterceptor)
				// 모든 경로로 들어오는 요청에 대해 수행하되
				.addPathPatterns("/**")
				// 로그인, 회원가입, 회원정보 찾기 페이지 및 swagger가 들어오는 경우에는 인터셉터를 수행하지 않는다.
				.excludePathPatterns("/api/userInfo/login", "/api/userInfo/signup", "/api/userInfo/findEmail",
						"/api/userInfo/findpw", "/api/userInfo/signup/checkEmail", "/api/userInfo/updatepw", "/",
						"/v2/api-docs", "/swagger-resources/**", "/swagger-ui/index.html", "/swagger-ui.html",
						"/webjars/**", "/swagger/**", "/api/conference/**");
	}
}
