package com.chron.docx;

import org.springframework.stereotype.Component;

import com.aspose.words.*;
import com.chron.db.entity.Message;
import com.chron.komoran.KomoranSearch;

import java.awt.Color;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class Aspose {

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
		// 여기 닉네임 받기
		String bossName = "";
		int index = participants.indexOf(",");

		if (index == -1)
			bossName = participants;
		else {
			bossName = participants.substring(0, index);
		}
		builder.write(bossName + " 님의 회의입니다. \r\r");

		Style style2 = doc.getStyles().add(StyleType.PARAGRAPH, "info");
		style2.getFont().setSize(22.0);
		style2.getFont().setBold(true);

		// 여기 각 데이터들 받아서 넣어주기
		builder.getParagraphFormat().setStyle(style2);
		builder.write("날짜 : " + YYMMDD + "\r\r\r");
		builder.write("시간 : " + time + "\r\r\r");
		builder.write("참석자 :" + participants);
		builder.insertBreak(BreakType.PAGE_BREAK);

//		builder.insertImage(wordpath);
		builder.insertBreak(BreakType.PAGE_BREAK);

		// Column chart

		// For complete examples and data files, please go to
		// https://github.com/aspose-words/Aspose.Words-for-Java

		// Add chart with default data. You can specify different chart types and sizes.
		Shape shape = builder.insertChart(ChartType.COLUMN, 432, 252);

		// Chart property of Shape contains all chart related options.
		Chart chart = shape.getChart();

		// Get chart series collection.
		ChartSeriesCollection seriesColl = chart.getSeries();

		// Delete default generated series.
		seriesColl.clear();

		// Create category names array, in this example we have two categories.
		String[] categories = new String[] { "대화 빈도 분석" };

		// Adding new series. Please note, data arrays must not be empty and arrays must
		// be the same size.
		KomoranSearch KS = new KomoranSearch();
		HashMap<String, List<String>> items = new HashMap<>();

		ArrayList<String> particiNames = new ArrayList<>();

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
				particiNames.add(chronicleData.get(i).getName());
			}

			System.out.println("이름 출력" + items.get(chronicleData.get(i).getName()));
		}

		for (int i = 0; i < particiNames.size(); i++) {
			seriesColl.add(particiNames.get(i), categories, new double[] { items.get(particiNames.get(i)).size() });
		}

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
		builder.getRowFormat().setHeight(100.0);
		builder.getRowFormat().setHeightRule(HeightRule.EXACTLY);
		builder.getFont().setBold(true);
		String messageData = "";
		System.out.println(chronicleData);
		if (chronicleData.isEmpty()) {
			messageData = "회의 기록이 없습니다.";
			builder.writeln(messageData);
		} else {
			for (int i = 0; i < chronicleData.size(); i++) {
				style.getFont().setSize(16.0);
				style.getFont().setColor(Color.GRAY);
				builder.getParagraphFormat().setStyle(style);
				builder.writeln(chronicleData.get(i).getName());
				builder.getParagraphFormat().setStyle(doc.getStyles().get("Normal"));
				builder.writeln(chronicleData.get(i).getText());
			}
		}
		builder.endRow();
		builder.endTable();

		doc.save("testData.docx");
	}
}
