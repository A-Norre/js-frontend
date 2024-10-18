import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/components/App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('App Component', () => {
  it('checks that it renders the static elements on the page', () => {

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'mock-token'),
      },
      writable: true,
    });

    const originalError = console.error;
    console.error = jest.fn();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const addButton = screen.getByRole('button', { name: /\+/i });
    expect(addButton).toBeInTheDocument();

    console.error = originalError;

  });

  it('checks that it displays documents with correct id in the list', async () => {

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'mock-token'),
      },
      writable: true,
    });
  
    const originalError = console.error;
    console.error = jest.fn();
  
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { _id: '101', title: 'Document 24' },
            { _id: '102', title: 'Document 89' },
          ]),
      })
    );
  
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText(/Document 24/i)).toBeInTheDocument();
      expect(screen.getByText(/Document 89/i)).toBeInTheDocument();
    });
  
    console.error = originalError;
    jest.restoreAllMocks();

  });
});