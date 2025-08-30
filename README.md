# a.C.K.E. 도구

영어 학습을 위한 워크북 생성 및 a.C.K.E. 4단계 시연 도구입니다.

## 🚀 기능

### 📚 워크북 생성
- 영어 지문을 입력하면 a.C.K.E. 4단계 처리 후 워크북(.docx) 파일을 생성
- 서버 없이 브라우저에서 직접 DOCX 파일 생성
- 자동 다운로드 기능

### 🎯 a.C.K.E. 데모
- a.C.K.E. 4단계 과정을 단계별로 시연
- 각 단계별 결과를 실시간으로 확인 가능

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Tailwind CSS
- **Document Generation**: Docxtemplater, PizZip
- **File Download**: FileSaver.js
- **AI Integration**: OpenAI GPT-4 API

## 📁 파일 구조

```
├── index.html              # 메인 애플리케이션 (탭 구조)
├── template.docx           # 워크북 템플릿 파일
├── step1-analyze.js       # Step 1 프롬프트 정의
├── step2-copy.js          # Step 2 프롬프트 정의
├── step3-align.js         # Step 3 정렬 프롬프트
├── step3-isolation.js     # Step 3 격리 프롬프트
├── step3-korean.js        # Step 3 한국어 번역 프롬프트
├── server.js              # 기존 서버 파일 (참고용)
└── backup-original/       # 원본 파일 백업
```

## 🚀 GitHub Pages 배포 방법

### 1단계: 저장소 생성 및 파일 업로드

1. GitHub에서 새 저장소를 생성합니다
2. 위의 모든 파일들을 저장소에 업로드합니다
3. `template.docx` 파일이 반드시 포함되어야 합니다

### 2단계: GitHub Pages 활성화

1. 저장소의 **Settings** 탭으로 이동
2. 왼쪽 메뉴에서 **Pages** 선택
3. **Source**를 **Deploy from a branch**로 설정
4. **Branch**를 `main` (또는 `master`)으로 선택
5. **Save** 클릭

### 3단계: 배포 확인

- 배포가 완료되면 `https://<사용자이름>.github.io/<저장소이름>/`에서 접근 가능
- `index.html`이 자동으로 메인 페이지로 설정됩니다

## 🔑 사용 방법

### API 키 설정
1. [OpenAI API](https://platform.openai.com/api-keys)에서 API 키를 발급받습니다
2. 웹페이지에서 API 키를 입력합니다
3. API 키는 브라우저 로컬에만 저장됩니다

### 워크북 생성
1. **워크북 생성** 탭을 선택합니다
2. 영어 지문을 입력합니다
3. **워크북 생성** 버튼을 클릭합니다
4. 처리 완료 후 자동으로 DOCX 파일이 다운로드됩니다

### a.C.K.E. 데모
1. **a.C.K.E. 데모** 탭을 선택합니다
2. 영어 지문을 입력합니다
3. **a.C.K.E. 4단계 실행** 버튼을 클릭합니다
4. 각 단계별 결과를 확인할 수 있습니다

## ⚠️ 주의사항

- **API 키 보안**: API 키는 클라이언트 측에 저장되므로 보안에 주의하세요
- **파일 크기**: `template.docx` 파일이 HTML과 같은 경로에 있어야 합니다
- **브라우저 호환성**: 최신 브라우저에서 최적의 성능을 제공합니다

## 🔧 개발 환경

로컬에서 테스트하려면:

```bash
# 간단한 HTTP 서버 실행 (Python 3)
python3 -m http.server 8000

# 또는 Node.js 사용
npx http-server

# 브라우저에서 http://localhost:8000 접속
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

버그 리포트나 기능 제안은 이슈로 등록해 주세요.

---

**참고**: 이 도구는 교육 목적으로 제작되었으며, OpenAI API 사용 시 해당 서비스의 이용약관을 준수해야 합니다.
