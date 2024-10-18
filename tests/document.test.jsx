import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Document from '../src/components/document.jsx';

describe('Document Component', () => {

  const originalError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
    render(
      <MemoryRouter>
        <Document />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    console.error = originalError;
  });
    
  it('checks that it renders the Update button', () => {

    expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
  });

  it('checks that it renders the title input label', () => {

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  });

  it('checks that it renders the title input field used on the page', () => {

    const titleInput = screen.getByLabelText(/Title/i);

    expect(titleInput).toBeInTheDocument();
    expect(titleInput.tagName).toBe('INPUT');

  });

  it('checks that it renders an <h3> tag with the word "Comments"', () => {

    expect(screen.getByRole('heading', { level: 3, name: /Comments/i })).toBeInTheDocument();
    
  });
});
