# 🎵 Soundmind App Common UI Library

Soundmind 앱 개발을 위한 **React Native 공통 UI 라이브러리**입니다.

사내 디자인 시스템 통일성을 위해 제작되었으며, **TypeScript를 완벽하게 지원**합니다.

---

## 📦 설치 (Installation)

```bash
npm install react-native-soundmind-app-common-ui

# 또는

yarn add react-native-soundmind-app-common-ui
```

### 필수 의존성 (Peer Dependencies)

이 라이브러리를 사용하기 위해서는 프로젝트에 아래 패키지들이 설치되어 있어야 합니다.

| 패키지                | 버전    | 비고                |
| --------------------- | ------- | ------------------- |
| `react`               | >= 18   | 필수                |
| `react-native`        | >= 0.70 | 필수                |
| `lucide-react-native` | -       | 아이콘 사용 시 필요 |

---

## 🚀 컴포넌트 사용법

### 1. Button

다양한 사이즈와 로딩 상태를 지원하는 기본 버튼입니다.

```tsx
import { Button } from 'react-native-soundmind-app-common-ui';

<Button
  label="저장하기"
  onPress={() => console.log('Click')}
  size="md" // 'sm' | 'md' | 'lg'
  variant="primary"
  isLoading={false}
/>;
```

### 2. Input

라벨, 에러 메시지, 비밀번호 토글(눈 아이콘) 기능을 포함한 입력 필드입니다.

```tsx
import { Input } from 'react-native-soundmind-app-common-ui';

<Input
  label="이메일"
  placeholder="example@email.com"
  error="올바른 이메일을 입력해주세요"
  onChangeText={(text) => console.log(text)}
/>

// 비밀번호 입력 모드 (자동으로 눈 아이콘 생성)
<Input
  label="비밀번호"
  secureTextEntry
/>
```

### 3. LoadingOverlay

앱 전체를 덮는 로딩 모달입니다.

```tsx
import { LoadingOverlay } from 'react-native-soundmind-app-common-ui';

<LoadingOverlay visible={true} />;
```

---

## 🛠 개발 및 기여 가이드

이 프로젝트는 `example` 폴더 내의 **Storybook**을 통해 UI를 테스트합니다.

### 의존성 설치

```bash
npm install --legacy-peer-deps
```

### 예제 앱 실행

```bash
cd example
npm install --legacy-peer-deps
npm run storybook
```

---

## 🔖 배포 프로세스 (Release)

이 라이브러리는 **GitHub Releases**를 통해 NPM에 자동 배포됩니다.

1. `main` 브랜치에 코드를 푸시합니다.
2. GitHub 저장소의 **Releases** 탭에서 `Draft a new release`를 클릭합니다.
3. 태그 버전을 `vX.Y.Z` 형식(예: `v0.2.0`)으로 입력하고 발행합니다.
4. GitHub Actions가 자동으로 빌드 후 NPM에 배포합니다.

---

## 📄 라이선스

MIT License

---

<p align="center">
  Made with ❤️ by Soundmind Team
</p>
