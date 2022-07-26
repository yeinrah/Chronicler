package com.chron.api.util;

import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTUtil {

	// 비밀키 생성 32bytes이상
	private static final String SALT = "Chroniissupersuperawesomebecause";

	// 토큰 생성
	public String createToken(String claimId, String data) throws UnsupportedEncodingException {
		return Jwts.builder().setHeaderParam("alg", "HS256").setHeaderParam("typ", "JWT").claim(claimId, data)
				.signWith(SignatureAlgorithm.HS256, SALT.getBytes("UTF-8")).compact();
	}

	// 토큰 검증
	public void checkToken(String token) throws Exception {
		Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(token);
	}
}
