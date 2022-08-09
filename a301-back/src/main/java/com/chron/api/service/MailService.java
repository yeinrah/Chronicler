package com.chron.api.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.MultiPartEmail;
import org.apache.commons.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
 
import com.chron.db.entity.Mail;
import com.google.api.client.util.IOUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailService {

	@Autowired
	private JavaMailSender javaMailSender;

	private static final String FROM_ADDRESS = "chronicler321@gmail.com";

	public void mailSend(Mail mail) {
		try {
			MailHandler mailHandler = new MailHandler(javaMailSender);
			mailHandler.setTo(mail.getAddress());
			mailHandler.setSubject("회의록 전달드립니다.");
			String htmlContent = "<p>" + mail.getMessage() + "<p> <img src='cid:sample-img'>";
			mailHandler.setText(htmlContent, true);
			File file = new File("static/회의록_작성_완료!.docx");
			System.out.println(file);
			FileItem fileItem = new DiskFileItemFactory().createItem("static/회의록_작성_완료!.docx", Files.probeContentType(file.toPath()), false, file.getName());
			fileItem.getOutputStream();
//			try(InputStream in = new FileInputStream(file); OutputStream out = fileItem.getOutputStream()) {
//			    in.transferTo(out);
//			} catch (IOException e) {
//			}
			CommonsMultipartFile multipartFile = new CommonsMultipartFile( fileItem);
			
//			mailHandler.setAttach("Chronicler배경.PNG", multipartFile);//여기를 상대경로로 넣어주면 안되나?
			mailHandler.setAttach("Chronicler배경.PNG", multipartFile);//여기를 상대경로로 넣어주면 안되나?
//			mailHandler.setInline("sample-img", mail.getFile());//이건뭔지모름
			mailHandler.send();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void sendAttach(String email, String nickname, HttpSession session) {
		MultiPartEmail multimail = new MultiPartEmail();

//		mail.setHostName("smtp.naver.com"); // 메일 전송 서버 지정, 네이버 메일 - 환경설정 - pop3 설정
		multimail.setCharset("utf-8"); // 인코딩 설정
		multimail.setDebug(true); // 메일 전송 과정 추적해서 콘솔에 띄워줌

//		mail.setAuthentication("아이디", "비밀번호"); // 로그인하기 위해 정보 입력
//		mail.setSSLOnConnect(true); // 입력한 정보로 로그인 요청

		try {
			multimail.setFrom("보내는 메일", "관리자"); // 보내는 사람 메일 / 이름 설정
			multimail.addTo(email, nickname); // 받는 사람 메일 / 이름, 회원가입 페이지에에서 가져온다.
			multimail.addTo("받을 메일", "수신자"); // 복수의 사람 지정 가능
			multimail.setSubject("회의록 보냅니다"); // 메일 제목
			multimail.setMsg(nickname + "님! 가입을 축하드립니다!\n 첨부 파일 테스트"); // 메일 내용

			// 파일 첨부하기
			EmailAttachment file = new EmailAttachment();

//			// ① 물리적 디스크내 파일 첨부
//			file.setPath("C:\\이력서-자소서-양식.hwp");
//			multimail.attach(file);

			// ② 프로젝트 내의 파일 첨부
			file = new EmailAttachment();
			file.setPath(session.getServletContext().getRealPath("../회의록_작성_완료!.docx"));
			multimail.attach(file);

//			// ③ URL을 통해 파일 첨부
//			file = new EmailAttachment();
//			file.setURL(new URL("https://mvnrepository.com/assets/images/392dffac024b9632664e6f2c0cac6fe5-logo.png"));
//			multimail.attach(file);

			multimail.send(); // 메일 발송
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
