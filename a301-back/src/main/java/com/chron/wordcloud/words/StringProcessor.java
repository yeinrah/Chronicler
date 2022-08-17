package com.chron.wordcloud.words;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.PriorityQueue;
import java.util.Scanner;

public class StringProcessor implements Iterable<WordCount> {
	public String str;
	public HashSet<String> filter;
	public ArrayList<WordCount> words;

	public StringProcessor(String str, HashSet<String> filter, ArrayList<WordCount> words) {
		this.str = str;
		this.filter = filter;
		this.words = processString();
	}
	
	public StringProcessor(String str, HashSet<String> filter) {
		this.str = str;
		this.filter = filter;
		processString();
	}

	public ArrayList<WordCount> processString() {
		Scanner scan = new Scanner(str);
		HashMap<String, Integer> count = new HashMap<String, Integer>();
		while (scan.hasNext()) {
			String word = removePunctuations(scan.next());
			if (filter.contains(word))
				continue;
			if (word.equals(""))
				continue;
			Integer n = count.get(word);
			count.put(word, (n == null) ? 1 : n + 1);
		}
		PriorityQueue<WordCount> pq = new PriorityQueue<WordCount>();
		for (Entry<String, Integer> entry : count.entrySet()) {
			pq.add(new WordCount(entry.getKey(), entry.getValue()));
		}
		words = new ArrayList<WordCount>();
		while (!pq.isEmpty()) {
			WordCount wc = pq.poll();
			if (wc.word.length() > 1)
				words.add(wc);
		}
		scan.close();
		return words;
	}

	public void print() {
		Iterator<WordCount> iter = iterator();
		while (iter.hasNext()) {
			System.out.println(iter.next());
		}
	}

	@Override
	public Iterator<WordCount> iterator() {
		return words.iterator();
	}

	public static String removePunctuations(String str) {
		return str.replaceAll("\\p{Punct}|\\p{Digit}", "");
	}
}
