// src/components/Input.tsx
import { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
  type TextStyle,
  Platform,
} from 'react-native';
import { Eye, EyeOff, X } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  clearable?: boolean;
  onClear?: () => void;
  /** 컨테이너 스타일 */
  containerStyle?: ViewStyle;
  /** 라벨 스타일 */
  labelStyle?: TextStyle;
  /** 인풋 스타일 오버라이드 */
  inputStyle?: TextStyle;
  borderColor?: string;
  focusBorderColor?: string; // ✅ 추가됨
}

export const Input = forwardRef<any, InputProps>(
  (
    {
      label,
      error,
      clearable,
      onClear,
      containerStyle,
      labelStyle,
      inputStyle,
      borderColor = '#D1D5DB', // gray-300
      focusBorderColor = '#3B82F6',
      secureTextEntry,
      value,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // 비밀번호 가시성 토글 로직
    const isPasswordType = secureTextEntry;
    const actualSecureEntry = isPasswordType && !isPasswordVisible;

    // 에러 상태 여부
    const isError = !!error;

    // 동적 테두리 색상 결정
    const getBorderColor = () => {
      if (isError) return '#EF4444'; // red-500
      if (isFocused) return focusBorderColor; // blue-500
      return borderColor;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

        <View
          style={[
            styles.inputWrapper,
            { borderColor: getBorderColor() },
            isFocused && styles.inputWrapperFocused,
            isError && styles.inputWrapperError,
          ]}
        >
          <TextInput
            ref={ref}
            underlineColorAndroid="transparent"
            style={[
              styles.input,
              inputStyle,
              Platform.OS === 'web' && ({ outlineStyle: 'none' } as any),
            ]}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={actualSecureEntry}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* 비밀번호 눈 아이콘 */}
          {isPasswordType && (
            <Pressable
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.iconButton}
              testID="password-toggle-button"
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color="#9CA3AF" />
              ) : (
                <Eye size={20} color="#9CA3AF" />
              )}
            </Pressable>
          )}

          {/* 삭제(Clear) 아이콘 (비밀번호 아닐 때만) */}
          {clearable && value && !isPasswordType && (
            <Pressable onPress={onClear} style={styles.iconButton}>
              <X size={18} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        {isError && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151', // gray-700
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 48, // h-12
    paddingHorizontal: 12,
  },
  inputWrapperFocused: {
    borderWidth: 2,
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827', // gray-900
    height: '100%',
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444', // red-500
    marginTop: 4,
  },
});
