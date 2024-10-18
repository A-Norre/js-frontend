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

  it('checks that it renders the text correctly', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const staticText = screen.getByText(/Skapa Nytt Dokument/i);

    expect(staticText).toBeInTheDocument();

  });

  it('checks that it renders the title input to be in the document', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Titel/i);

    expect(titleInput).toBeInTheDocument();
    expect(titleInput.tagName).toBe('INPUT');

  });

  it('checks that it renders the content textarea with label', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const contentTextarea = screen.getByLabelText(/Innehåll/i);

    expect(contentTextarea).toBeInTheDocument();
    expect(contentTextarea.tagName).toBe('TEXTAREA');

  });

  it('checks that it renders the document with the dynamic id', () => {
    render(
      <MemoryRouter>
        <NewDocument />
      </MemoryRouter>
    );

    const heading = screen.getByText(/Dokument 123/i);

    expect(heading).toBeInTheDocument();

  });
});
