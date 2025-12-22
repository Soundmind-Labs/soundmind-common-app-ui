import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input Component', () => {
  it('플레이스홀더와 입력값이 정상 작동합니다', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="입력하세요" onChangeText={onChangeText} />
    );

    const input = getByPlaceholderText('입력하세요');
    fireEvent.changeText(input, 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('에러 메시지가 표시됩니다', () => {
    const { getByText } = render(<Input error="필수 항목입니다" />);
    expect(getByText('필수 항목입니다')).toBeTruthy();
  });

  // ✅ 여기를 수정했습니다!
  it('비밀번호 입력 시 눈 아이콘 버튼이 렌더링됩니다', () => {
    // secureTextEntry가 있을 때만 아이콘이 나옴
    const { getByTestId } = render(<Input secureTextEntry />);

    // testID로 안전하게 찾기
    const toggleButton = getByTestId('password-toggle-button');
    expect(toggleButton).toBeTruthy();
  });
});
