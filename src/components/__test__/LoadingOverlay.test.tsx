import { render } from '@testing-library/react-native';
import { LoadingOverlay } from '../LoadingOverlay';

describe('LoadingOverlay Component', () => {
  it('isVisible이 false면 렌더링되지 않습니다 (모달 특성상 null 체크는 어려움)', () => {
    const { queryByText } = render(
      <LoadingOverlay isVisible={false} message="기다려주세요" />
    );
    // Modal은 visible=false여도 트리에는 존재할 수 있으나, 텍스트가 안 보여야 함
    expect(queryByText('기다려주세요')).toBeNull();
  });

  it('isVisible이 true면 메시지가 보입니다', () => {
    const { getByText } = render(
      <LoadingOverlay isVisible={true} message="처리중..." />
    );
    expect(getByText('처리중...')).toBeTruthy();
  });
});
