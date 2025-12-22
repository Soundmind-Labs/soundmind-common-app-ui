// src/components/Input.stories.tsx
import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Input } from '../../../src/components/Input';

const meta = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    borderColor: { control: 'color' },
    focusBorderColor: { control: 'color' },
    error: { control: 'text' },
    editable: { control: 'boolean' }, // disabled 대신 editable
    clearable: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper 컴포넌트 (상태 관리용)
const InputWithHooks = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <Input
      {...args}
      value={value}
      onChangeText={setValue}
      onClear={() => setValue('')}
    />
  );
};

// 1. 기본 인풋
export const Default: Story = {
  render: (args) => <InputWithHooks {...args} />,
  args: {
    label: '기본 입력',
    placeholder: '텍스트를 입력하세요',
  },
};

// 2. 아이디 입력 (Clear 버튼)
export const IDInput: Story = {
  render: (args) => <InputWithHooks {...args} />,
  args: {
    label: '아이디 (ID)',
    placeholder: '아이디 입력',
    clearable: true,
  },
};

// 3. 비밀번호 입력
export const PasswordInput: Story = {
  render: (args) => <InputWithHooks {...args} />,
  args: {
    label: '비밀번호',
    placeholder: '비밀번호 입력',
    secureTextEntry: true,
  },
};

// 4. 에러 상태
export const WithError: Story = {
  render: (args) => <InputWithHooks {...args} />,
  args: {
    label: '닉네임',
    value: '이미있는닉네임',
    error: '이미 사용 중인 닉네임입니다.',
  },
};

// 5. 커스텀 스타일
export const CustomStyle: Story = {
  render: (args) => <InputWithHooks {...args} />,
  args: {
    label: '커스텀 스타일',
    placeholder: '배경색과 높이 조절',
    containerStyle: { width: 300 },
    inputStyle: { color: '#4F46E5', fontWeight: 'bold' }, // indigo text
    borderColor: '#4F46E5',
  },
};

export const CustomFocusColor: Story = {
  render: (args) => <InputWithHooks {...args} />,
  args: {
    label: '브랜드 컬러 포커스',
    placeholder: '클릭하면 보라색이 됩니다',
    focusBorderColor: '#7C3AED', // Violet-600
  },
};
