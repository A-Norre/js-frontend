import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Registration from '../src/components/Registration';

describe('Registration Component', () => {

    it('renders the username input field', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        expect(usernameInput).toBeInTheDocument();
      });

    it('renders the password input field', () => {
    render(
        <MemoryRouter>
        <Registration />
        </MemoryRouter>
    );
    
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    });

    it('renders the register button', () => {
    render(
        <MemoryRouter>
        <Registration />
        </MemoryRouter>
    );
    
    const registerButton = screen.getByRole('button', { name: /Register/i });
    expect(registerButton).toBeInTheDocument();
    });      

    it('renders the registration heading', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const headingElement = screen.getByRole('heading', { name: /Register/i });
        expect(headingElement).toBeInTheDocument();
    });      

    it('requires the username input field', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        expect(usernameInput).toBeRequired();
    });
    
    it('requires the password input field', () => {
    render(
        <MemoryRouter>
        <Registration />
        </MemoryRouter>
    );
    
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeRequired();
    });         

    it('checks that it has a submit button for the registration form', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const registerButton = screen.getByRole('button', { name: /Register/i });
        expect(registerButton).toHaveAttribute('type', 'submit');

    });

    it('checks that the username input is required', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        expect(usernameInput).toBeRequired();

    });
      
    it('checks that the password input is required', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        expect(passwordInput).toBeRequired();

    });          

    it('checks that it has a submit button for the registration form', () => {
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const registerButton = screen.getByRole('button', { name: /Register/i });
        expect(registerButton).toHaveAttribute('type', 'submit');

    });   

    it('checks that it updates the username value when typing', async () => {
        const user = userEvent.setup();
      
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        await user.type(usernameInput, 'testUser');
        expect(usernameInput).toHaveValue('testUser');

    });
      
    it('checks that it updates the password value when typing', async () => {
        const user = userEvent.setup();
      
        render(
          <MemoryRouter>
            <Registration />
          </MemoryRouter>
        );
      
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        await user.type(passwordInput, 'testPassword');
        expect(passwordInput).toHaveValue('testPassword');

    });      
});