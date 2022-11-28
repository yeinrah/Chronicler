# Chronicler
 - 비지니스 목적을 위한 자동 회의록 작성 서비스

# 팀원을 소개합니다!
            김정서            김영진            나예인            송상훈            조선송

![kimjeongseo jpg](https://user-images.githubusercontent.com/63994962/204204276-f39cb7d0-bd6a-455c-827b-0566b294e750.png)
![김영진 jpg](https://user-images.githubusercontent.com/63994962/204204280-b3c35505-1366-49ac-b311-2dc017936f40.jpg)
![나예인](https://user-images.githubusercontent.com/63994962/204204282-b2eda675-4284-4fd2-ae7d-0cd4c9d3d08b.jpg)
![송상훈](https://user-images.githubusercontent.com/63994962/204204285-d5200720-d8de-4a8a-8378-373af95c6559.jpg)
![조선송__2_](https://user-images.githubusercontent.com/63994962/204204287-75d623b7-861c-4f04-b7e9-38338dd5c743.jpg)


# 팀원 역할
송상훈 : 팀장, Backend <br> 
김영진 : Backend, Server <br>
나예인 : Backend, Docker <br>
김정서 : Frontend <br>
조선송 : Frontend

<hr>

## 프로젝트 기간 : 2022.07.11 ~ 2022.08.19

## Chronicler 로고
![logo](https://user-images.githubusercontent.com/63994962/204204366-bce2a4ea-9079-4021-a35a-bcddc6ebfc7c.png)
<hr>

## 개발환경

- [ ]  협업툴
- Notion
- Jira
- Mattermost
- GitLab
- Webex
----------------------------- 
- [ ]  Frontend
- React 18.2.0
- React Router 6.3.0
- Recoil 0.7.4
- Material UI 5.9.1
- Axios 0.27.2
- Typescript 4.7.4
- sweetalert2 11.4.24
---
- [ ]  Backend
- openjdk 1.8.0_192
- Java Zulu 8.33.0.1
- eclipse 4.16.0 (2020-06)
- Spring Boot 2.7.1
- Spring Data JPA
- Spring Security 5.6.6
- JWT 0.11.2
- AWS EC2
- MySQL 5.7.37
---
- [ ]  WebRTC
- Openvidu
---
- [ ]  STT(Speech-to-Text)
- JavaScript window 객체
---
- [ ]  CI/CD
- Docker version 20.10.17, build 100c701
- NGINX
- AWS EC2
---
- [ ]  Docx file API
- Aspose words 22.7
---
- [ ]  Email
- Spring Java MailSender
---
- [ ]  형태소 분석
- KOMORAN 3.3.4

<hr>

# Chronicler의 모토
간편하고 쉽게 이용하는 자동 서기관 시스템

<hr>

# Chronicler 서비스 화면 
- 메인 페이지
![main](https://user-images.githubusercontent.com/63994962/204204591-c7592736-403c-4bcb-a02a-43841ccb8800.png)

- 회의실 실시간 자막 
![회의_자막](https://user-images.githubusercontent.com/63994962/204204597-b5b0d570-9ce4-483b-9e10-f28ff8512b46.png)

- 회의 종료 후 메일 발송
![크로니클러_메일왔을때](https://user-images.githubusercontent.com/63994962/204204594-5769cd24-6d84-4ad8-9c7e-ac9c9438e38a.png)

- 회의록

![회의록1](https://user-images.githubusercontent.com/63994962/204204600-11c77737-ab31-44bb-8ea2-19eda8432f00.png)
![회의록2](https://user-images.githubusercontent.com/63994962/204204602-8bfadef0-e240-48cd-b419-619591095332.png)
![회의록3](https://user-images.githubusercontent.com/63994962/204204604-8aea7444-f7e6-4f64-ae83-b82be412c9d1.png)
![회의록4](https://user-images.githubusercontent.com/63994962/204204605-4281fb62-644a-42b3-bfdb-76ce74f2898f.png)

<hr>

# 서비스 설명
회의에서 사용자들이 대화한 데이터를 수집, 자동으로 회의록을 docx 파일로 제작해주는 서비스

# 주요 기능
- webRTC를 통한 화상 채팅 기능
- STT를 활용한 실시간 자막 제공
- 대화 data를 분석하여 형태소 처리 이후 관련 데이터 차트 제공
- 회의 종료 시 해당 회의에 대한 회의록 작성
- 방장의 이메일로 회의록 docx파일로 송신
<hr>

# 시스템 아키텍쳐
![시스템아키텍처](https://user-images.githubusercontent.com/63994962/204204768-b007bb88-1fea-494e-9e94-be23c1921989.PNG)
<hr>

# CI/CD 구축 및 SSL 인증서 적용
프론트엔드 React.js는 Nginx와 함께 docker를 사용하여 빌드 및 배포하였고, 백엔드, openvidu도 docker container를 통해 배포하였습니다. 
<br>
Nginx와 letsencrypt를 이용하여 SSL 인증서를 적용하고, 프론트엔드는 https의 기본값 443을 통해 분기, 백엔드는 /api의 경로로 프록시를 걸어주었습니다.

# 기술 특이점
- WebRTC
- STT(Speech-To-Text)
- Aspose
<hr>

# 요구사항 정의서
![요구사항정의서](https://user-images.githubusercontent.com/63994962/204204771-e919c4b6-d0d3-4257-a9ad-7178dbfc1d8e.PNG)

<hr>

# Git 컨벤션

```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제
```

<hr>

# Git Flow 브랜치 전략
- 사용 브랜치
master - 배포
devleop - 개발
feature - 기능

- 진행 방식
feature의 기능이 완성되면 develop에 merge
배포 준비가 완료되면 develop 브랜치를 master에 merge

<hr>

# Jira
Jira를 통해서 매주 진행 예상되는 업무를 sprint에 넣어서 관리했습니다. 팀원 개개인이 어떤 일을 하고 있는지에 대한 확인할 때에도 backlog를 통해서 확인하였고, 스프린트는 일주일 단위로 진행하였습니다. 
- story : 디테일한 부분까지 상세하게 기술
- epic : BACKEND, FRONTEND, SERVER, DOCKER 등으로 구성하였습니다.

Mattermost와 연동하여 업무에 대한 변동사항을 실시간으로 파악할 수 있도록 했습니다. 

<hr>

# Notion
FRONTEND, BACKEND, FREEDOM, 회의록, 일정관리 카테고리로 나누어 FRONT에게 필요한 정보, BACK에게 필요한 정보 모두가 함께 알아야 할 정보로 나누어 관리했습니다.
<br> 
매일 회의한 내용을 회의록 카테고리에 작성했고, 일정에 대한 부분도 기술하였습니다. 

<hr>

# ER Diagram
![erd](https://user-images.githubusercontent.com/63994962/204204764-8e0f1daa-332c-4994-abac-c39496065973.png)

<hr>

# EC2 포트 정리
|443 | HTTPS|
|-|-|
|80 | HTTP -> HTTPS로 Redirect|
|3306 | MySQL|
|8080 | Spring Boot |
|3000 | React |
|4443 | Openvidu|

<hr>


# Docker command

DB :

```docker
docker pull yeinrah/mysql:5.7.37
```

```docker
docker run -d -p 3306:3306 --name mysql --network chronicler -e MYSQL_ROOT_PASSWORD=ssafy -e MYSQL_DATABASE=chronicler -e MYSQL_USER=A301 -e MYSQL_PASSWORD=SSAFY0707 yeinrah/mysql:5.7.37
```

BE : 

```docker
docker pull yeinrah/chronicler-back
```

```docker
docker run -d -p 8080:8080 --name chronicler-back --network chronicler yeinrah/chronicler-back
```

FE :
```docker
docker pull yeinrah/chronicler-front
```

```docker
docker run -d -p 3000:80 --name chronicler-front --network chronicler yeinrah/chronicler-front
```

<hr>



# 개발 후 회고
<hr>

송상훈 : 6주 동안의 시간이 정말 빠르게 흘러갔습니다. 사용자 입장에서 고민 많이 했습니다. 실시간 자막 및 회의록 자동생성(빈도분석포함) 기능에 집중한 CHRONICLER 다들 사랑해주세요! <br>

김영진 : 혼자 해결하려고 했다면 하루 종일도 걸렸을 에러가 함께 고민하니 금방 해결돼버리는 기이한 현상을 봤습니다. 협업의 중요성! <br>

나예인 : 저희가 만든 서비스를 직접 빌드 및 배포해보면서 1학기와는 또 다른 것들을 많이 배울 수 있는 시간이었습니다. 다음 프로젝트에서는 반드시 젠킨스를 도입해서 생산성을 높여보고 싶습니다. 다들 수고하셨습니다! <br>

김정서 : 코딩이 막힐 때, 스트레스 받아도 좋은 팀원이 있어서 스트레스가 덜 했던 것 같습니다. 저 또한 좋은 팀원이 되기위해 노력 해야겠습니다. <br>

조선송 : 팀원들이 모두 정말 좋아서 프로젝트를 즐겁게 마칠 수 있었습니다. <br>

