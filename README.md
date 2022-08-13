# Chronicler
 - 비지니스 목적을 위한 자동 회의록 작성 서비스

## 프로젝트 기간 : 2022.07.11 ~ 2022.08.19

## 개발환경
----------------------------
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
Chronicler. 당신의 회의록

<hr>

# Chronicler의 모토
간편하고 쉽게 이용하는 자동 서기관 시스템

<hr>

# 홈동 서비스 화면 


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
- STT
- Aspose
<hr>

# 요구사항 정의서

<hr>


# 화면 설계서

<hr>

# 코드 컨벤션

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

<hr>

# Jira

<hr>

# Notion


<hr>

# ER Diagram

<hr>

# EC2 포트 정리

<hr>

# 팀원 소개

<hr>

# 팀원 역할

<hr>

# 개발 후 회고

<hr>
