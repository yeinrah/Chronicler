# Chronicler
 - 비지니스 목적을 위한 자동 회의록 작성 서비스

## 프로젝트 기간 : 2022.07.11 ~ 2022.08.19

## 개발환경

- [ ]  협업툴
- Notion
- Jira
- Mattermost
- GitLab
- Webex
----------------------------
- [ ]  Frontend
- React 18.2.0
- React Router 6.3.0
- Recoil 0.7.4
- Material UI 5.9.1
----------------------------
- [ ]  Backend
- Java 8
- eclipse
- Spring Boot 2.7.1
- Spring Data JPA
- Spring Security 5.6.6
- AWS EC2
- MySQL 5.7.37
----------------------------
- [ ]  WebRTC
- Openvidu-insecure-react
----------------------------
- [ ]  STT(Speech-to-Text)
- Google Cloud Speech-to-Text
- vito
- window 객체
----------------------------
- [ ]  CI/CD
- Docker
- NGINX
- AWS EC2
----------------------------
- [ ] make docx
- Aspose
----------------------------
- [ ] Email
- JavaMailSender


<hr>

# Docker command

DB :

```docker
docker pull yeinrah/mysql:5.7.37
```

BE : 

```docker
docker pull yeinrah/chronicler-back
```

FE :
```docker
docker pull yeinrah/chronicler-front
```

<hr>

# Overview
회의에 집중하세요 기록은 맡겨주세요

<hr>

# Chronicler의 모토
간편하고 쉽게 이용하는 자동 서기관 시스템

<hr>

# Chronicler 서비스 화면 
![크로니클러_메일왔을때](/uploads/7ac52e7a95d0d78216c8ca3ff853ebd4/크로니클러_메일왔을때.png)

<hr>

# 주요 기능
- 서비스 설명 : 회의에서 사용자들이 대화한 데이터를 수집, 자동으로 회의록을 docx 파일로 제작해주는 서비스

- 주요 기능 : 
    webRTC를 통한 화상 채팅 기능
    STT를 활용한 실시간 자막 제공
    대화 data를 분석하여 형태소 처리 이후 관련 데이터 차트 제공
    회의 종료 시 해당 회의에 대한 회의록 작성
    방장의 이메일로 회의록 docx파일로 송신
<hr>

# 서비스 아키텍쳐

<hr>

# CI/CD 구축 및 SSL 인증서 적용
프론트엔드 React.js는 Nginx와 함께 docker image로 빌드하여 배포하였고, 백엔드, openvidu도 docker container를 통해 배포하였습니다. 
Nginx와 letsencrypt를 이용하여 SSL 인증서를 적용하고, 프론트엔드는 https의 기본값 443을 통해 분기, 백엔드는 /api의 경로로 프록시를 걸어주었습니다.

# 기술 특이점
- WebRTC
- STT(Speech-To-Text)
- Aspose
<hr>

# 요구사항 정의서

<hr>

# Git 컨벤션

FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제

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
FRONTEND, BACKEND, FREEDOM, 회의록, 일정관리 카테고리로 나누어 FRONT에게 필요한 정보, BACK에게 필요한 정보 모두가 함께 알아야 할 정보로 나누어 관리했습니다. 매일 회의한 내용을 회의록 카테고리에 작성했고, 일정에 대한 부분도 기술하였습니다. 

<hr>

# ER Diagram


<hr>

# EC2 포트 정리
|443 | HTTPS|
|-|-|
|80 | HTTP -> HTTPS로 Redirect|
|3306 | MySQL|
|8080 | SpringBoot(Docker container)|
|3000 | React, Nginx(Docker container)|
|4443 | Openvidu|

<hr>

# 팀원을 소개합니다!



# 팀원 역할
송상훈 : 팀장, Backend
김영진 : Backend
나예인 : Backend
김정서 : Frontend
조선송 : Frontend
<hr>

# 개발 후 회고
<hr>
재밌었습니다 ㅋㅋ

