import { render } from '@testing-library/react';
import { EditableRow } from './EditableRow';

describe('EditableRow', () => {
  const props = { index: 0 };

  it('should render successfully', () => {
    const { baseElement } = render(<EditableRow {...props}/>);
    expect(baseElement).toBeTruthy();
  });
});
