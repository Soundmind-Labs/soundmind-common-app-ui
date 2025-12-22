import { useRef } from 'react';
import {
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Animated,
  type ViewStyle,
  type TextStyle,
  Platform,
} from 'react-native';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  loadingText?: string;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  isLoading?: boolean;

  // 사이즈 프리셋
  size?: 'sm' | 'md' | 'lg';

  // 커스텀 사이즈 (값이 있으면 프리셋보다 우선 적용)
  width?: number | string; // string 허용 (예: '100%')
  height?: number;
  fontSize?: number;

  // 추가 스타일
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Button = ({
  label,
  onPress,
  loadingText = '로딩중',
  backgroundColor = '#4CA1AF',
  textColor = '#ffffff',
  disabled = false,
  isLoading = false,
  size = 'md',
  width,
  height,
  fontSize,
  style,
  labelStyle,
}: ButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isInactive = disabled || isLoading;

  // 기본 사이즈 프리셋 (순수 값)
  const sizePresets = {
    sm: { height: 32, fontSize: 13, paddingHorizontal: 12 },
    md: { height: 48, fontSize: 16, paddingHorizontal: 24 },
    lg: { height: 56, fontSize: 18, paddingHorizontal: 32 },
  };

  const currentPreset = sizePresets[size];

  // 커스텀 값이 없으면 프리셋 값 사용
  const finalWidth = width ?? undefined; // width가 없으면 auto/flex
  const finalHeight = height ?? currentPreset.height;
  const finalFontSize = fontSize ?? currentPreset.fontSize;

  const handlePressIn = () => {
    if (isInactive) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    if (isInactive) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isInactive}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: isInactive ? '#9CA3AF' : backgroundColor,
          width: finalWidth,
          height: finalHeight,
          paddingHorizontal: currentPreset.paddingHorizontal,
          opacity: pressed && !isInactive ? 0.9 : 1,
        },
        !isInactive && styles.shadow,
        style,
      ]}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={{ marginRight: 8 }}
          />
        )}
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontSize: finalFontSize,
            },
            labelStyle,
          ]}
        >
          {isLoading ? loadingText : label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
