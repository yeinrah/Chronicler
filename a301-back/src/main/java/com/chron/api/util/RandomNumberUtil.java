package com.chron.api.util;

import java.security.SecureRandom;
import java.util.Date;

public class RandomNumberUtil {

	final static private char[] charSet = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E',
			'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
			'v', 'w', 'x', 'y', 'z' };
	final static private int setLength = charSet.length;

	public static String getRandomNumber() {
		StringBuffer sb = new StringBuffer();
		SecureRandom sr = new SecureRandom();
		sr.setSeed(new Date().getTime());

		for (int i = 0; i < 16; i++) {
			sb.append(charSet[sr.nextInt(setLength)]);
		}

		return sb.toString();
	}
}