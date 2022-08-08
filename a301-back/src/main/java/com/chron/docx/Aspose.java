package com.chron.docx;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.aspose.words.*;

@Component
public class Aspose {
	
	public void makeChronicle(String data) throws Exception{
		Document doc = new Document();

//		Comment comment = new Comment(doc);
//		comment.setAuthor("John Doe");
//		comment.setInitial("JD");
//		comment.setDateTime(new Date());
//		comment.setText("Quisque fringilla leo.");
		
		Table table = new Table(doc);
		table.setAlignment(TableAlignment.CENTER);	//table 가운데 정렬
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
		Cell secondCell = new Cell(doc);
		firstRow.appendChild(firstCell);
//		firstRow.appendChild(secondCell);

		Paragraph paragraph = new Paragraph(doc);
		firstCell.appendChild(paragraph);

		// Add text to the first call in the first row of the table.
		Run run = new Run(doc, "회의명 : CHRONICLER");
		paragraph.appendChild(run);
		
		Paragraph para = doc.getFirstSection().getBody().getFirstParagraph();
//		para.appendChild(new CommentRangeStart(doc, comment.getId()));
		para.appendChild(new Run(doc, data));
//		para.appendChild(new CommentRangeEnd(doc, comment.getId()));
//		para.appendChild(comment);

//		comment.addReply("Jane Doe", "JD", new Date(), "Pellentesque vel sapien justo.");

		doc.save("회의록_작성_완료!.docx");
	}
}
