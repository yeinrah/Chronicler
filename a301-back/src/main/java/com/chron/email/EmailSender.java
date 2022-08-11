package com.chron.email;
import java.io.File;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {

	@Autowired
	private JavaMailSender mailSender;

	public void sendEmailAttachment(final String toEmailAddresses) {
		try {
			String subject = "회의록_데이터";
			String fromEmailAddress = "chronicler321@gmail.com";
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
			helper.setFrom(fromEmailAddress);
			helper.setTo(toEmailAddresses);
			helper.setSubject(subject);
			boolean isHtmlMail = true;
			if (isHtmlMail) {
				helper.setText("<html><body>" + " " + "</html></body>", true);
			} else {
				helper.setText(" ");
			}

			// attach the file into email body
			File attachment = new File("testData.docx");
			FileSystemResource file = new FileSystemResource(attachment);
			helper.addAttachment(attachment.getName(), file);

			mailSender.send(mimeMessage);

			System.out.println("Email sending complete.");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
