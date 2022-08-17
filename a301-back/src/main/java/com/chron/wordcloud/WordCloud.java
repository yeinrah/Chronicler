package com.chron.wordcloud;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Component;

import com.chron.db.entity.Message;
import com.chron.komoran.KomoranSearch;

@Component
public class WordCloud {
	// wordCloud 생성하기
	public HashMap<String, List<String>> makeWordCloud(List<Message> chronicleData) throws Exception {

		KomoranSearch KS = new KomoranSearch();
		HashMap<String, List<String>> items = new HashMap<>();

		for (int i = 0; i < chronicleData.size(); i++) {
			List<String> ls = KS.makeKomoran(chronicleData.get(i).getText());

			System.out.println("이것은 ls" + ls);

			// 1. 참석자 이름이 items에 있을 때,
			if (items.containsKey(chronicleData.get(i).getName())) {
				for (int j = 0; j < ls.size(); j++) {
					items.get(chronicleData.get(i).getName()).add(ls.get(j));
				}
			}
			// 2. 참석자 이름이 items에 없을 때,
			else {
				items.put(chronicleData.get(i).getName(), ls);
			}

			System.out.println("이름 출력" + items.get(chronicleData.get(i).getName()));
		}
		return items;
	}

	// 전체를 스트링으로 만들기
	public String listToStrTotal(List<Message> chronicleData) {
		KomoranSearch KS = new KomoranSearch();
		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < chronicleData.size(); i++) {
			List<String> ls = KS.makeKomoran(chronicleData.get(i).getText());
			for (int j = 0; j < ls.size(); j++) {
				sb.append(ls.get(j)).append(" ");
			}
		}
		System.out.println("투스트링 : " + sb.toString());
		return sb.toString();
	}

	public String readFile(String path) throws IOException {
		FileInputStream stream = new FileInputStream(new File(path));
		try {
			FileChannel fc = stream.getChannel();
			MappedByteBuffer bb = fc.map(FileChannel.MapMode.READ_ONLY, 0, fc.size());
			return Charset.defaultCharset().decode(bb).toString();
		} finally {
			stream.close();
		}
	}
}
