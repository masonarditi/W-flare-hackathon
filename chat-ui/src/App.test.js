import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Web3 Security Scanner header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Web3 Security Scanner/i);
  expect(headerElement).toBeInTheDocument();
});
