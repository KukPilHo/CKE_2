const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const app = express();
const port = 3000;

// JSON 요청 본문을 파싱할 수 있도록 미들웨어 설정
app.use(express.json());

// a.C.K.E. 분석 결과 시뮬레이션을 위한 샘플 데이터
const sampleAnalyzeText = "The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the English alphabet. It is commonly used for typing practice and testing fonts.";
const sampleCopyText = "The quick brown fox\njumps over\nthe lazy dog.\nThis sentence contains\nall the letters\nof the English alphabet.\nIt is commonly used\nfor typing practice\nand testing fonts.";
const sampleKoreanText = "빠른 갈색 여우가\n게으른 개 위로\n뛰어오른다.\n이 문장은\n영어 알파벳의\n모든 글자를 포함한다.\n타자 연습과\n폰트 테스트에\n일반적으로 사용된다.";
const sampleEnglishText = "The quick brown fox\njumps over\nthe lazy dog.\nThis sentence contains\nall the letters\nof the English alphabet.\nIt is commonly used\nfor typing practice\nand testing fonts.";

// JSON 데이터 변환 함수
function prepareDataForTemplate(analyzeText, copyText, koreanText, englishText) {
    // 1. copyText와 koreanText를 줄바꿈 기준으로 배열로 분할
    const copyLines = copyText.split('\n').filter(line => line.trim() !== '');
    const koreanLines = koreanText.split('\n').filter(line => line.trim() !== '');
    
    // 2. 두 배열의 길이가 다르면 경고 메시지 출력
    if (copyLines.length !== koreanLines.length) {
        console.warn(`경고: 영어 줄 수(${copyLines.length})와 한국어 줄 수(${koreanLines.length})가 다릅니다.`);
    }
    
    // 3. copy_korean_pairs 배열 생성
    const copyKoreanPairs = [];
    const maxLength = Math.min(copyLines.length, koreanLines.length);
    
    for (let i = 0; i < maxLength; i++) {
        copyKoreanPairs.push({
            en_line: copyLines[i],
            ko_line: koreanLines[i]
        });
    }
    
    // 4. english_lines 배열 생성
    const englishLines = copyLines.map(line => ({
        en_line: line
    }));
    
    // 5. 최종 JSON 객체 반환
    return {
        analyze_text: analyzeText,
        copy_korean_pairs: copyKoreanPairs,
        english_lines: englishLines
    };
}

// POST /create-workbook 엔드포인트
app.post('/create-workbook', (req, res) => {
    console.log('워크북 생성 요청 받음');
    
    try {
        // 1. template.docx 파일 읽기
        const templatePath = path.join(__dirname, 'template.docx');
        const content = fs.readFileSync(templatePath);
        console.log('템플릿 파일 읽기 완료');
        
        // 2. PizZip과 Docxtemplater로 템플릿 로드
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);
        console.log('템플릿 로드 완료');
        
        // 3. 데이터 변환 함수 호출해서 최종 JSON 데이터 준비
        const jsonData = prepareDataForTemplate(sampleAnalyzeText, sampleCopyText, sampleKoreanText, sampleEnglishText);
        console.log('데이터 변환 완료');
        
        // 4. 템플릿에 데이터 채우기
        doc.render(jsonData);
        console.log('템플릿 렌더링 완료');
        
        // 5. 완성된 파일을 buffer로 생성
        const buffer = doc.getZip().generate({ type: 'nodebuffer' });
        console.log('Word 파일 생성 완료');
        
        // 6. 고유한 파일명으로 저장
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const outputFileName = `workbook_${timestamp}.docx`;
        const outputPath = path.join(__dirname, outputFileName);
        
        fs.writeFileSync(outputPath, buffer);
        console.log(`파일 저장 완료: ${outputFileName}`);
        
        // 7. 성공 응답 전송
        res.json({
            status: 'success',
            message: '워크북이 성공적으로 생성되었습니다.',
            fileName: outputFileName,
            filePath: outputPath
        });
        
    } catch (error) {
        console.error('워크북 생성 중 오류 발생:', error);
        res.status(500).json({
            status: 'error',
            message: '워크북 생성 중 오류가 발생했습니다.',
            error: error.message
        });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중입니다`);
    console.log(`워크북 생성 API: http://localhost:${port}/create-workbook`);
});
