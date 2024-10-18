import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/views/Header';

describe('Header Component', () => {
     
    it('checks that it renders the header and the correct title with it', () => {
        render(
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        );
      
        expect(screen.getByRole('heading', { name: /SSR Editor/i })).toBeInTheDocument();

    });      
});