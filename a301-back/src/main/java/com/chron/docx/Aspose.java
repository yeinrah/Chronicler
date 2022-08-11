package com.chron.docx;

import org.springframework.stereotype.Component;

import com.aspose.words.*;
import com.chron.db.entity.Message;

import java.awt.Color;
import java.util.List;
@Component
public class Aspose {
	
	public void makeChronicle(List<Message> chronicleData, String wordpath) throws Exception{

		Document doc = new Document();
		DocumentBuilder builder = new DocumentBuilder(doc);
		
		Style titleStyle = doc.getStyles().add(StyleType.PARAGRAPH, "title");
		titleStyle.getFont().setSize(40.0);
		titleStyle.getFont().setBold(true);
		Style style = doc.getStyles().add(StyleType.PARAGRAPH, "name");
		
        builder.getParagraphFormat().setStyle(titleStyle);
        builder.getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
		//여기 닉네임 받기
        builder.write("~~님의 회의입니다. \r\r");
		
		Style style2 = doc.getStyles().add(StyleType.PARAGRAPH, "info");
        style2.getFont().setSize(22.0);
        style2.getFont().setBold(true);
        
        //여기 각 데이터들 받아서 넣어주기
        builder.getParagraphFormat().setStyle(style2);
        builder.write("날짜 : "+" 12월 14일\r\r\r");
        builder.write("시간 : "+" 벌써 12시\r\r\r");
        builder.write("참석자 :" + " 이순신\r\r\r");
        builder.insertBreak(BreakType.PAGE_BREAK);
		
		builder.insertImage(wordpath);
        builder.insertBreak(BreakType.PAGE_BREAK);
		
		//여기부터 대화록 테이블
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
		if(chronicleData.isEmpty()) {
			messageData = "회의 기록이 없습니다.";
			builder.writeln(messageData);
		}
		else {
		for(int i=0; i<chronicleData.size();i++) {
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
