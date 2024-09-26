import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/components/App';

describe('App Component', () => {
  it('renders the static elements on the page', () => {

    const originalError = console.error;
    console.error = jest.fn();

    render(<App />);

    const addButton = screen.getByRole('button', { name: /\+/i });
    expect(addButton).toBeInTheDocument();

    console.error = originalError;
  });

  it('displays documents with correct id in the list', async () => {

    const originalError = console.error;
    console.error = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { _id: '101', title: 'Document 24' },
          { _id: '102', title: 'Document 89' },
        ]),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Document 24/i)).toBeInTheDocument();
      expect(screen.getByText(/Document 89/i)).toBeInTheDocument();
    });

    console.error = originalError;
    jest.restoreAllMocks();
  });
});
