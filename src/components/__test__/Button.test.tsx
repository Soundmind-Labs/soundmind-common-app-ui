import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button'; // 경로 확인 필요

describe('Button Component', () => {
  it('라벨이 정상적으로 렌더링됩니다', () => {
    const { getByText } = render(<Button label="테스트 버튼" />);
    expect(getByText('테스트 버튼')).toBeTruthy();
  });

  it('클릭 시 onPress 이벤트가 발생합니다', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label="클릭" onPress={onPressMock} />);

    fireEvent.press(getByText('클릭'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('로딩 중일 때는 로딩 텍스트가 보이고 클릭이 안 됩니다', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button
        label="기본"
        isLoading={true}
        loadingText="로딩중..."
        onPress={onPressMock}
      />
    );

    expect(getByText('로딩중...')).toBeTruthy();
    fireEvent.press(getByText('로딩중...'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
