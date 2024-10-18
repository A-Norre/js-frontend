import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../src/components/Login';

describe('Login Component', () => {
    
    it('checks that it renders the input field with the username', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        expect(usernameInput).toBeInTheDocument();

    });
    
    it('checks that it renders the input field with the password', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        expect(passwordInput).toBeInTheDocument();

    });    

    it('checks that it updates the username input field when typing', async () => {
        const user = userEvent.setup();
    
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    
        const usernameInput = screen.getByPlaceholderText(/Username/i);
        await user.type(usernameInput, 'testUser');
        expect(usernameInput).toHaveValue('testUser');

    });
    
    it('checks that it updates the password input field when typing', async () => {
        const user = userEvent.setup();
    
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        await user.type(passwordInput, 'testPassword');
        expect(passwordInput).toHaveValue('testPassword');

    });    

    it('checks that it renders the login button on the page', () => {
        render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        );

        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toBeInTheDocument();

    });

    it('checks that it has a submit type for the login button', () => {
        render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        );

        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toHaveAttribute('type', 'submit');

    });

    it('checks that it renders the "Don\'t have an account?" text', () => {
        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
      
        expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();

    });      

    it('checks that it renders the "Register here" link and has correct href', () => {
        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
      
        const registerLink = screen.getByRole('link', { name: /Register here/i });
        expect(registerLink).toBeInTheDocument();
        expect(registerLink).toHaveAttribute('href', '/registration');

    });      
});