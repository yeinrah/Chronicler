package com.chron.docx;

import java.util.List;

import org.springframework.stereotype.Component;

import com.aspose.words.Cell;
import com.aspose.words.Document;
import com.aspose.words.DocumentBuilder;
import com.aspose.words.Paragraph;
import com.aspose.words.Row;
import com.aspose.words.Run;
import com.aspose.words.Table;
import com.chron.db.entity.Message;

@Component
public class Aspose {

	public void makeChronicle(List<Message> chronicleData, String wordpath) throws Exception {
		Document doc = new Document();

		Table table = new Table(doc);
//		table.setAlignment(TableAlignment.CENTER);	//table 가운데 정렬
		doc.getFirstSection().getBody().appendChild(table);
		// Tables contain rows, which contain cells, which may have paragraphs
		// with typical elements such as runs, shapes, and even other tables.
		// Calling the "EnsureMinimum" method on a table will ensure that
		// the table has at least one row, cell, and paragraph.
		Row firstRow = new Row(doc);
		Row secondRow = new Row(doc);

		table.appendChild(firstRow);
		table.appendChild(secondRow);

		Cell firstCell = new Cell(doc);
//		Cell secondCell = new Cell(doc);
		firstRow.appendChild(firstCell);
//		firstRow.appendChild(secondCell);

		Paragraph paragraph = new Paragraph(doc);
		firstCell.appendChild(paragraph);

		// Add text to the first call in the first row of the table.
		Run run = new Run(doc, "회의명 : CHRONICLER");
		paragraph.appendChild(run);

		StringBuilder sb = new StringBuilder();
		String MessageData = "";
		System.out.println(chronicleData);
		if (chronicleData.isEmpty())
			MessageData = "회의 기록이 없습니다.";
		else {
			for (int i = 0; i < chronicleData.size(); i++) {
				sb.append("\r\n");
				sb.append(chronicleData.get(i).getName());
				sb.append(" : ");
				sb.append(chronicleData.get(i).getText());
				sb.append("\r\n");
			}
		}
//		System.out.println("toString으로 찍은거" + sb.toString());
		System.out.println(sb);
		MessageData += sb.toString();
		
		// 이미지를 파일에 붙이기
		DocumentBuilder builder = new DocumentBuilder(doc);
		builder.insertImage(wordpath);
				
		
		Paragraph para = doc.getFirstSection().getBody().getFirstParagraph();
		para.appendChild(new Run(doc, MessageData));

		// 회의록 작성 부분 네이밍 = 방장 닉네임 + inserted time(날짜만)로 동적으로 변경해주기
		doc.save("회의록_작성_완료!.docx");
	}

}
