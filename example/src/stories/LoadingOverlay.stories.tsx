// src/components/LoadingOverlay.stories.tsx
import { View, Text, StyleSheet } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Heart } from 'lucide-react-native';
import { LoadingOverlay } from '../../../src/components/LoadingOverlay';

const meta = {
  title: 'Overlay/LoadingOverlay',
  component: LoadingOverlay,
  argTypes: {
    color: { control: 'color' },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
  },
  decorators: [
    (Story) => (
      <View style={styles.backgroundContainer}>
        <View style={styles.dummyContent}>
          <Text style={styles.dummyTitle}>배경 화면입니다</Text>
          <Text style={styles.dummyText}>
            로딩 오버레이가 이 화면 위를 덮습니다.{'\n'}
            Controls에서 isVisible을 조절해보세요.
          </Text>
          <View style={styles.dummyBox} />
          <View style={[styles.dummyBox, { backgroundColor: '#E5E7EB' }]} />
        </View>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof LoadingOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 기본형
export const Default: Story = {
  args: {
    isVisible: true,
    message: '잠시만 기다려주세요...',
    color: '#FFFFFF',
  },
};

// 2. 진한 배경 (opacity 조절)
export const DarkBackground: Story = {
  args: {
    isVisible: true,
    message: '데이터 처리중',
    color: '#FCD34D', // Yellow-400
    opacity: 0.8,
  },
};

// 3. 커스텀 아이콘
export const CustomIcon: Story = {
  args: {
    isVisible: true,
    message: '사랑을 담아 로딩중...',
    color: '#EC4899', // Pink-500
    icon: <Heart size={48} color="#EC4899" fill="#EC4899" />,
  },
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6', // gray-100
  },
  dummyContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
  },
  dummyText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  dummyBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
});
