package com.chron.docx;

import java.awt.Color;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Component;

import com.aspose.words.BreakType;
import com.aspose.words.Chart;
import com.aspose.words.ChartDataLabelCollection;
import com.aspose.words.ChartSeries;
import com.aspose.words.ChartSeriesCollection;
import com.aspose.words.ChartType;
import com.aspose.words.Document;
import com.aspose.words.DocumentBuilder;
import com.aspose.words.HeightRule;
import com.aspose.words.ParagraphAlignment;
import com.aspose.words.Shape;
import com.aspose.words.Style;
import com.aspose.words.StyleType;
import com.aspose.words.Table;
import com.chron.db.entity.Message;
import com.chron.komoran.KomoranSearch;
import com.chron.wordcloud.words.StringProcessor;
import com.chron.wordcloud.words.WordCount;

@Component
public class Aspose {

	private static final String[] POSITIVE = { "최고", "칭찬", "좋", "오케이", "퍼펙트", "나이스", "사랑", "희망", "성공", "화이팅", "감격",
			"감동", "행복", "통쾌", "기쁘", "홀가분", "후련", "훌륭", "적극", "기쁩", "이타적", "기대", "찬성" };
	private static final String[] NEGATIVE = { "못", "안", "않", "싫", "실패", "절망", "포기", "괴로", "비난", "거짓말", "분열", "비판",
			"장애물", "잘못", "시련", "고통", "고난", "위기", "소극", "이기적", "반대" };

	private static final String[] FILTER = { "이다", "이네", "있었다", "있다", "것으로", "있다는", "했다", "것이다", "해서", "안녕하세요",
			"안녕하십니까", "정말", "진짜", "반갑습니다 ", "반갑네요", "너무", "니다", "어떤", "어떻" };

	// Komoran 적용
	public String listToStrTotal(List<Message> chronicleData) {
		KomoranSearch KS = new KomoranSearch();
		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < chronicleData.size(); i++) {
			List<String> ls = KS.makeKomoran(chronicleData.get(i).getText());
			for (int j = 0; j < ls.size(); j++) {
				sb.append(ls.get(j)).append(" ");
			}
		}
		return sb.toString();
	}

	// Not Komoran
	public String listToStrTotalNotKomo(List<Message> chronicleData) {
		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < chronicleData.size(); i++) {
			String str = chronicleData.get(i).getText();
			sb.append(str).append(" ");
		}
		return sb.toString();
	}

	// 회의록 만들어지는 과정
	public void makeChronicle(List<Message> chronicleData, String date, String participants) throws Exception {
		String timeData = date;
		String YYMMDD = timeData.substring(0, 10);
		String time = timeData.substring(11, 19);
		Document doc = new Document();
		DocumentBuilder builder = new DocumentBuilder(doc);

		Style titleStyle = doc.getStyles().add(StyleType.PARAGRAPH, "title");
		titleStyle.getFont().setSize(40.0);
		titleStyle.getFont().setBold(true);
		Style style = doc.getStyles().add(StyleType.PARAGRAPH, "name");

		builder.getParagraphFormat().setStyle(titleStyle);
		builder.getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);

		// 닉네임 받기
		String bossName = "";
		int index = participants.indexOf(",");

		if (index == -1)
			bossName = participants;
		else {
			bossName = participants.substring(0, index);
		}
		builder.write("\r\r\r" + bossName + " 님의 회의 \r");

		Style style2 = doc.getStyles().add(StyleType.PARAGRAPH, "info");
		style2.getFont().setSize(22.0);
		style2.getFont().setBold(true);

		// 여기 각 데이터들 받아서 넣어주기
		builder.getParagraphFormat().setStyle(style2);
		builder.write("\r\r\r\r\r\r\r\r\r" + "날짜 : " + YYMMDD + "\r");
		builder.write("시간 : " + time + "\r");
		builder.write("참석자 :" + participants);
		builder.insertBreak(BreakType.PAGE_BREAK);

		if (chronicleData.size() == 0) {
			System.out.println("회의기록 없습니다.");
		} else {
			// 1번차트(단어 빈도)
			Shape shape = builder.insertChart(ChartType.COLUMN, 470, 324);
			// 2번 차트(참여자 발화 빈도)
			Shape shape2 = builder.insertChart(ChartType.PIE, 233, 320);
			// 3번 차트(참여자 별 긍정어휘 차트)
			Shape shape3 = builder.insertChart(ChartType.PIE, 233, 320);

			builder.insertBreak(BreakType.PAGE_BREAK);

			Chart chart = shape.getChart();
			chart.getTitle().setText("단어 빈도 분석");

			ChartSeriesCollection seriesColl = chart.getSeries();
			seriesColl.clear();
			String[] categories = new String[] { "" };

			KomoranSearch KS = new KomoranSearch();
			ArrayList<WordCount> words = new ArrayList<WordCount>();
			StringProcessor strProcessor = new StringProcessor(listToStrTotal(chronicleData), filteringList(FILTER),
					words);

			if (strProcessor.words.size() > 10) {
				for (int i = 0; i < 10; i++) {
					seriesColl.add(strProcessor.words.get(i).word, categories,
							new double[] { strProcessor.words.get(i).n });
				}
			} else {
				for (int i = 0; i < strProcessor.words.size(); i++) {
					seriesColl.add(strProcessor.words.get(i).word, categories,
							new double[] { strProcessor.words.get(i).n });
				}
			}

			// 1번차트(단어 빈도) 끝
			// 2번 차트(참여자 발화 빈도) 시작
			HashMap<String, List<String>> items = new HashMap<>();
			ArrayList<String> particiNames = new ArrayList<>();

			for (int i = 0; i < chronicleData.size(); i++) {
				List<String> ls = KS.makeKomoran(chronicleData.get(i).getText());
				// 1. 참석자 이름이 items에 있을 때,
				if (items.containsKey(chronicleData.get(i).getName())) {
					for (int j = 0; j < ls.size(); j++) {
						items.get(chronicleData.get(i).getName()).add(ls.get(j));
					}
				}
				// 2. 참석자 이름이 items에 없을 때,
				else {
					items.put(chronicleData.get(i).getName(), ls);
					particiNames.add(chronicleData.get(i).getName());
				}
			}
			Chart chart2 = shape2.getChart();
			chart2.getSeries().clear();

			String[] particiName = new String[particiNames.size()];
			double[] particiSize = new double[particiNames.size()];

			for (int i = 0; i < particiNames.size(); i++) {
				particiName[i] = particiNames.get(i);
				particiSize[i] = items.get(particiNames.get(i)).size();
			}

			ChartSeries series1 = chart2.getSeries().add("발화자 빈도", particiName, particiSize);
			ChartDataLabelCollection labels1 = series1.getDataLabels();
			labels1.setShowPercentage(true);
			labels1.setShowValue(false);
			labels1.setShowLeaderLines(false);
			labels1.setSeparator(" - ");
			// 2번차트 끝
			// 3번 차트(전체 긍정/부정 빈도 차트) 시작
			Chart chart3 = shape3.getChart();
			chart3.getSeries().clear();

			String[] feelName = new String[] { "긍정", "부정" };
			String tmp = listToStrTotalNotKomo(chronicleData);

			String[] usedWords = tmp.split(" ");
			double[] feelCnt = new double[2];

			for (int i = 0; i < usedWords.length; i++) {
				for (int j = 0; j < POSITIVE.length; j++) {
					if (usedWords[i].contains(POSITIVE[j])) {
						++feelCnt[0];
					}
				}
				for (int j = 0; j < NEGATIVE.length; j++) {
					if (usedWords[i].contains(NEGATIVE[j])) {
						++feelCnt[1];
					}
				}
			}

			if (feelCnt[0] == 0 && feelCnt[1] == 0) {
				ChartSeries series2 = chart3.getSeries().add("회의 긍정 지수 측정을 위한 데이터가 부족합니다.", feelName, feelCnt);
				series2.getDataLabels();
			} else {
				ChartSeries series2 = chart3.getSeries().add("회의 긍정 지수", feelName, feelCnt);
				ChartDataLabelCollection labels2 = series2.getDataLabels();
				labels2.setShowPercentage(true);
				labels2.setShowValue(false);
				labels2.setShowLeaderLines(false);
				labels2.setSeparator(" - ");
			}
			// 3번차트 끝

			// 여기부터 대화록 테이블
			Table table = builder.startTable();

			builder.insertCell();
			builder.getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
			builder.getFont().setBold(true);
			builder.getFont().setSize(30.0);

			builder.write("대화록");
			builder.endRow();
			builder.endTable();

			Style style3 = doc.getStyles().add(StyleType.PARAGRAPH, "userName");
			style3.getFont().setSize(18.0);

			builder.insertCell();
			builder.getParagraphFormat().setAlignment(ParagraphAlignment.LEFT);
			builder.getRowFormat().setHeightRule(HeightRule.EXACTLY);
			builder.getFont().setBold(true);

			System.out.println(chronicleData);

			for (int i = 0; i < chronicleData.size(); i++) {
				style.getFont().setSize(16.0);
				style.getFont().setColor(Color.GRAY);
				builder.getParagraphFormat().setStyle(style);
				builder.writeln(chronicleData.get(i).getName());
				builder.getParagraphFormat().setStyle(doc.getStyles().get("Normal"));
				builder.writeln(chronicleData.get(i).getText());
			}

			builder.endRow();
			builder.endTable();
		}
		doc.save("CHRONICLER_당신의_회의록.docx");
	}

	private static HashSet<String> filteringList(String[] filterWord) throws IOException {
		HashSet<String> filter = new HashSet<String>();
		for (int i = 0; i < filterWord.length; i++) {
			filter.add(filterWord[i]);
		}
		return filter;
	}
}