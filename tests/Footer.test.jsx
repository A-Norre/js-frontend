import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../src/views/Footer';

describe('Footer Component', () => {
     
    it('checks that it renders the name in the footer correctly', () => {
        render(
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        );
      
        expect(screen.getByText(/© Emil Folino/i)).toBeInTheDocument();

    });      
});