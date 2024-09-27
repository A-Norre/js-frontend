import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewDocument from '../src/components/NewDocument.jsx';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('NewDocument Component', () => {
  
  beforeEach(() => {
    require('react-router-dom').useParams.mockReturnValue({ id: '123' });
  });

  it('renders the static content', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const staticText = screen.getByText(/Skapa Nytt Dokument/i);

    expect(staticText).toBeInTheDocument();
  });

  it('renders the title input field', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Titel/i);

    expect(titleInput).toBeInTheDocument();
    expect(titleInput.tagName).toBe('INPUT');
  });

  it('renders the content textarea', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const contentTextarea = screen.getByLabelText(/Innehåll/i);

    expect(contentTextarea).toBeInTheDocument();
    expect(contentTextarea.tagName).toBe('TEXTAREA');

  });

  it('renders the dynamic id in the heading', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const heading = screen.getByText(/Dokument 123/i);

    expect(heading).toBeInTheDocument();
  });
});
