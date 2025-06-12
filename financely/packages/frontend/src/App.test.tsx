import { render } from '@testing-library/react';
import App from './App';

it('renders header', () => {
  const { getByText } = render(<App />);
  expect(getByText('Financely')).toBeInTheDocument();
});
