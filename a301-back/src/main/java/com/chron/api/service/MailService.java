//package com.chron.api.service;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.nio.file.Files;
//import java.util.Properties;
//
//import javax.activation.DataSource;
//import javax.activation.FileDataSource;
//import javax.mail.Message;
//import javax.mail.MessagingException;
//import javax.mail.Multipart;
//import javax.mail.PasswordAuthentication;
//import javax.mail.Session;
//import javax.mail.Transport;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeBodyPart;
//import javax.mail.internet.MimeMessage;
//import javax.mail.internet.MimeMultipart;
//
//import org.apache.commons.fileupload.disk.DiskFileItemFactory;
//
//import org.apache.commons.fileupload.FileItem;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import org.springframework.web.multipart.commons.CommonsMultipartFile;
// 
//import com.chron.db.entity.Mail;
//
//
//import lombok.AllArgsConstructor;
//
//@Service
//@AllArgsConstructor
//public class MailService {
//
//	@Autowired
//	private JavaMailSender javaMailSender;
//
//	private static final String FROM_ADDRESS = "chronicler321@gmail.com";
//
//	public void mailSend(Mail mail) {
//		try {
//			MailHandler mailHandler = new MailHandler(javaMailSender);
//			mailHandler.setTo(mail.getAddress());
//			mailHandler.setSubject("회의록 전달드립니다.");
//			String htmlContent = "<p>" + mail.getMessage() + "<p> <img src='cid:sample-img'>";
//			mailHandler.setText(htmlContent, true);
//			File file = new File("C:\\SSAFY\\mainProject\\S07P12A301\\a301-back\\src\\main\\resources\\build\\static\\회의록_작성_완료!.docx");
//			System.out.println(file);
//			DataSource source = new FileDataSource("C:\\SSAFY\\mainProject\\S07P12A301\\a301-back\\src\\main\\resources\\build\\static\\회의록_작성_완료!.docx");
//			FileItem fileItem = new DiskFileItemFactory().createItem("C:\\SSAFY\\mainProject\\S07P12A301\\a301-back\\src\\main\\resources\\build\\static\\회의록_작성_완료!.docx", Files.probeContentType(file.toPath()), false, file.getName());
//			fileItem.getOutputStream();
//			try(InputStream in = new FileInputStream(file); OutputStream out = fileItem.getOutputStream()) {
////			    in.transferTo(out);
//			} catch (IOException e) {
//			}
//			CommonsMultipartFile multipartFile = new CommonsMultipartFile( fileItem);
//			
//			mailHandler.setAttach("Chronicler배경.PNG", multipartFile);//여기를 상대경로로 넣어주면 안되나?
//			mailHandler.setAttach("회의록_작성_완료!.docx", multipartFile);//여기를 상대경로로 넣어주면 안되나?
//			mailHandler.setInline("sample-img", mail.getFile());//이건뭔지모름
//			mailHandler.send();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	
//	public void sendEmail() {
//		final String username = "chronicler321@gmail.com";
//		final String password = "xdcbkjmcqrxccpea";
//		String fromEmail = "chronicler321@email.com";
//		String toEmail = "cogitocoder@email.com";
//		
//		Properties properties = new Properties();
//		properties.put("mail.smtp.auth", "true");
//		properties.put("mail.smtp.starttls.enable","true");
//		properties.put("mail.smtp.host","smtp.google.com");
//		properties.put("mail.smtp.port","587");
//		Session session = null;
//		session = session.getInstance(properties, new javax.mail.Authenticator() {
//			protected PasswordAuthentication getPasswordAuthentication() {
//				return new PasswordAuthentication(username, password);
//			}
//		});
//		
//		MimeMessage msg = new MimeMessage(session);
//		try {
//			msg.setFrom(new InternetAddress(fromEmail));
//			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
//			msg.setSubject("구드욕센");
//			msg.setText("안녕 하십니까.");
//			Transport.send(msg);
//			System.out.println("Sent message");
//			
//			Multipart emailContent = new MimeMultipart();
//			
//			//Text body part
//			MimeBodyPart textBodyPart = new MimeBodyPart();
//			textBodyPart.setText("My multipart text");
//			MimeBodyPart docxAttachment = new MimeBodyPart();
//			try {
//				docxAttachment.attachFile("/static/회의록_작성_완료!.docx");
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//			emailContent.addBodyPart(textBodyPart);
//			emailContent.addBodyPart(docxAttachment);
//			
//			msg.setContent(emailContent);
//		} catch (MessagingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//	}
//}
