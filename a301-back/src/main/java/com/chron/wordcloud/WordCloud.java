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
import java.util.HashSet;
import java.util.Scanner;

import javax.imageio.ImageIO;
import javax.swing.JFrame;

import com.chron.wordcloud.image.CloudImageGenerator;
import com.chron.wordcloud.words.StringProcessor;

public class WordCloud {
    public static final int WIDTH = 1200;
    public static final int HEIGHT = 800;
    public static final int PADDING = 30;

    public static final String TEXT = "korean_test.txt";
    public static final String FILTER = "korean_filtering.txt";

    public void makeJFrame() throws IOException {
        JFrame frame = new JFrame("Word Cloud");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationByPlatform(true);
        frame.pack();
        Insets insets = frame.getInsets();
        frame.setSize(calcScreenSize(insets));
        StringProcessor strProcessor = new StringProcessor(readFile(TEXT), filteringList(FILTER));
        CloudImageGenerator generator = new CloudImageGenerator(WIDTH, HEIGHT, PADDING);
        frame.setContentPane(new CloudViewer(generator.generateImage(strProcessor, System.currentTimeMillis())));
        frame.setVisible(true);
        
        BufferedImage bi = new BufferedImage(frame.getWidth(), frame.getHeight(), BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics = bi.createGraphics();
        frame.print(graphics);
        makeScreenshot(frame);
    }
    
    public void makeScreenshot(JFrame argFrame) {
        Rectangle rec = argFrame.getBounds();
        BufferedImage bufferedImage = new BufferedImage(rec.width, rec.height, BufferedImage.TYPE_INT_ARGB);
        argFrame.paint(bufferedImage.getGraphics());

        try {
            // Create temp file
            File temp = File.createTempFile("screenshot", ".png");

            // Use the ImageIO API to write the bufferedImage to a temporary file
            if (ImageIO.write(bufferedImage, "png", temp)) {
            	System.out.println(temp.getAbsolutePath());
            }
            else
            	System.out.println("false");

            // Delete temp file when program exits
//            temp.deleteOnExit();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
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
     * This function generates a list of words to be filtered when a cloud is generated
     */
    public HashSet<String> filteringList(String path) throws IOException {
        HashSet<String> filter = new HashSet<String>();
        Scanner scan = new Scanner(new File(path));
        while (scan.hasNext()) {
            filter.add(scan.next());
        }
        return filter;
    }

    public Dimension calcScreenSize(Insets insets) {
        int width = insets.left + insets.right + WIDTH + PADDING * 2;
        int height = insets.top + insets.bottom + HEIGHT + PADDING * 2;
        return new Dimension(width, height);
    }
}
