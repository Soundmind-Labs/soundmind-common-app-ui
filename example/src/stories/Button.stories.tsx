import { View, Alert } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from '../../../src/components/Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    loadingText: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    fontSize: { control: 'number' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// 1. 기본 (MD 사이즈)
export const Default: Story = {
  args: {
    label: '시작하기',
    onPress: () => Alert.alert('알림', '버튼이 클릭되었습니다!'),
  },
};

// 2. 로딩 상태
export const Loading: Story = {
  args: {
    label: '로그인',
    isLoading: true,
    disabled: true,
    loadingText: '인증 중...',
  },
};

// 3. 커스텀 사이즈 (width, height, fontSize 직접 주입)
// 웹에서의 className="w-full h-14" 등을 대체
export const CustomSize: Story = {
  args: {
    label: '커스텀 사이즈 (W:300, H:60)',
    backgroundColor: '#6366f1', // Indigo-500
    width: 300, // 내부에서 ws(300) 적용됨
    height: 60, // 내부에서 hs(60) 적용됨
    fontSize: 20, // 내부에서 fs(20) 적용됨
  },
};

// 4. 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '전송 불가',
    disabled: true,
    size: 'lg',
  },
};

// 5. 스타일 오버라이드 (style prop 사용)
export const CustomStyleOverride: Story = {
  args: {
    label: '테두리 버튼',
    backgroundColor: 'transparent',
    textColor: '#4CA1AF',
    style: {
      borderWidth: 2,
      borderColor: '#4CA1AF',
    },
  },
};
