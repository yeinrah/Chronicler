package com.chron.wordcloud;

import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;

import javax.imageio.ImageIO;
import javax.swing.JFrame;

import org.springframework.stereotype.Component;

import com.chron.db.entity.Message;
import com.chron.komoran.KomoranSearch;
import com.chron.wordcloud.image.CloudImageGenerator;
import com.chron.wordcloud.words.StringProcessor;

@Component
public class WordCloud {
	private static final int WIDTH = 1200;
	private static final int HEIGHT = 800;
	private static final int PADDING = 30;

//	private static final String TEXT = "korean_test.txt";
//	private static final String FILTER = "korean_filtering.txt";
	private static final String[] FILTER = { "어", "아", "은", "는", "이", "가", "하", "도", "이다", "이네", "있었다", "있다", "것으로",
			"있다는", "했다", "것이다", "해서", "안녕하세요", "안녕하십니까", "정말", "반갑습니다 ", "반갑네요", "너무", "니다" };

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

	// 이름

	// 텍스트

	public String makeJFrame(List<Message> chronicleData) throws Exception {

		JFrame frame = new JFrame("Word Cloud");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setLocationByPlatform(true);
		frame.pack();
		Insets insets = frame.getInsets();
		frame.setSize(calcScreenSize(insets));
		StringProcessor strProcessor = new StringProcessor(listToStrTotal(chronicleData), filteringList(FILTER));
//		StringProcessor strProcessor = new StringProcessor(readFile(TEXT), filteringList(FILTER));

		CloudImageGenerator generator = new CloudImageGenerator(WIDTH, HEIGHT, PADDING);
		frame.setContentPane(new CloudViewer(generator.generateImage(strProcessor, System.currentTimeMillis())));
		frame.setVisible(true);

		BufferedImage bi = new BufferedImage(frame.getWidth(), frame.getHeight(), BufferedImage.TYPE_INT_ARGB);
		Graphics2D graphics = bi.createGraphics();
		frame.print(graphics);

		Rectangle rec = frame.getBounds();
		BufferedImage bufferedImage = new BufferedImage(rec.width, rec.height, BufferedImage.TYPE_INT_ARGB);
		frame.paint(bufferedImage.getGraphics());

		try {
			// Create temp file
			File temp = File.createTempFile("screenshot", ".png");

			// Use the ImageIO API to write the bufferedImage to a temporary file
			if (ImageIO.write(bufferedImage, "png", temp)) {
				System.out.println(temp.getAbsolutePath());
				return temp.getAbsolutePath();
			} else
				System.out.println("false");
			// Delete temp file when program exits
//            temp.deleteOnExit();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		graphics.dispose();
		frame.dispose();
		return null;
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

	/**
	 * This function generates a list of words to be filtered when a cloud is
	 * generated
	 */
	private static HashSet<String> filteringList(String[] filterWord) throws IOException {
		HashSet<String> filter = new HashSet<String>();
//		Scanner scan = new Scanner(new File(path));
		for (int i = 0; i < filterWord.length; i++) {
			filter.add(filterWord[i]);
		}
//		while (scan.hasNext()) {
//			filter.add(scan.next());
//		}
		return filter;
	}

	private static Dimension calcScreenSize(Insets insets) {
		int width = insets.left + insets.right + WIDTH + PADDING * 2;
		int height = insets.top + insets.bottom + HEIGHT + PADDING * 2;
		return new Dimension(width, height);
	}
}
