// src/components/LoadingOverlay.tsx
import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';

export interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  color?: string; // Hex color string for RN
  /** 커스텀 아이콘 (React Node) */
  icon?: React.ReactNode;
  /** 블러 대신 배경 투명도 (0 ~ 1) */
  opacity?: number;
}

export const LoadingOverlay = ({
  isVisible,
  message = 'Loading...',
  color = '#FFFFFF',
  icon,
  opacity = 0.5,
}: LoadingOverlayProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      statusBarTranslucent // 안드로이드 상단바 위로 덮기
    >
      <View
        style={[
          styles.container,
          { backgroundColor: `rgba(0,0,0,${opacity})` },
        ]}
      >
        {/* 만약 @react-native-community/blur를 쓴다면 이 View를 BlurView로 감싸면 됩니다 */}

        <View style={styles.content}>
          {/* 아이콘 영역 */}
          {icon ? (
            icon
          ) : (
            // Lucide 아이콘 애니메이션은 RN에서 복잡하므로 기본 ActivityIndicator 추천
            // 혹은 Reanimated 등을 써야 함. 여기선 기본 인디케이터 사용
            <ActivityIndicator size="large" color={color} />
          )}

          {/* 텍스트 영역 */}
          {message && (
            <Text style={[styles.text, { color: color }]}>{message}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex는 Modal 내부라 크게 의미 없으나 명시
    zIndex: 9999,
  },
  content: {
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
});
