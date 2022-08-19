package com.chron.komoran;

import java.util.ArrayList;
import java.util.List;
import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;

public class KomoranSearch {

	public List<String> makeKomoran(String textData) {

		Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);

		KomoranResult analyzeResultList = komoran.analyze(textData);

		List<Token> tokenList = analyzeResultList.getTokenList();
		List<String> ans = new ArrayList<>();

		for (Token token : tokenList) {
			// 조사, 어미, 부사, 접사
			if (token.getPos().equals("JKS") || token.getPos().equals("JKC") || token.getPos().equals("JKG")
					|| token.getPos().equals("JKO") || token.getPos().equals("JKB") || token.getPos().equals("JKV")
					|| token.getPos().equals("JKQ") || token.getPos().equals("JX") || token.getPos().equals("JC")
					|| token.getPos().equals("EC") || token.getPos().equals("EP") || token.getPos().equals("EF")
					|| token.getPos().equals("SF") || token.getPos().equals("SS") || token.getPos().equals("SP")
					|| token.getPos().equals("SO")) {
				continue;
			} else {
				ans.add(token.getMorph());
			}
		}
		return ans;
	}
}