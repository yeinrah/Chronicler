package com.chron.email;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.chron.api.service.UserService;
import com.chron.db.entity.Message;

@Component
public class EmailSender {

	@Autowired
	private JavaMailSender mailSender;

	public void sendEmailAttachment(final String toEmailAddresses, List<Message> chronicleData) {
		if (chronicleData.size() == 0) {
			System.out.println("회의기록 없습니다.");
		} else {
			try {
				String subject = "CHRONICLER 당신의 회의록 데이터";
				String fromEmailAddress = "chronicler321@gmail.com";
				MimeMessage mimeMessage = mailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
				helper.setFrom(fromEmailAddress, "CHRONICLER");
				helper.setTo(toEmailAddresses);
				helper.setSubject(subject);
				boolean isHtmlMail = true;
				if (isHtmlMail) {
					helper.setText("<html><body>" + " " + "</html></body>", true);
				} else {
					helper.setText(" ");
				}

				// attach the file into email body
				File attachment = new File("CHRONICLER_당신의_회의록.docx");
				FileSystemResource file = new FileSystemResource(attachment);
				helper.addAttachment(attachment.getName(), file);

				mailSender.send(mimeMessage);

				System.out.println("Email sending complete.");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public void sendPw(final String toEmailAddresses, String tmpPW) {
		try {			
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
			helper.setFrom("chronicler321@gmail.com");
			helper.setTo(toEmailAddresses); // 받는사람 이메일
			helper.setSubject("CHRONICLER 비밀번호 찾기");
			
			String text = "고객님의 임시 비밀번호는 " + tmpPW + "입니다.";
			helper.setText(text, true);
			
			mailSender.send(message);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}