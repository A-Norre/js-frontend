import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Document from '../src/components/document.jsx';

describe('Document Component', () => {
    
  it('renders the static form elements displayed', () => {

    const originalError = console.error;
    console.error = jest.fn();

    render(
      <MemoryRouter>
        <Document />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Innehåll/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();

    console.error = originalError;
  });

  it('renders the title input field used on the page', () => {

    const originalError = console.error;
    console.error = jest.fn();

    render(
      <MemoryRouter>
        <Document />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Title/i);

    expect(titleInput).toBeInTheDocument();
    expect(titleInput.tagName).toBe('INPUT');

    console.error = originalError;
  });

  it('renders the content textarea for writing', () => {

    const originalError = console.error;
    console.error = jest.fn();

    render(
      <MemoryRouter>
        <Document />
      </MemoryRouter>
    );

    const contentTextarea = screen.getByLabelText(/Innehåll/i);

    expect(contentTextarea).toBeInTheDocument();
    expect(contentTextarea.tagName).toBe('TEXTAREA');

    console.error = originalError;
  });
});
