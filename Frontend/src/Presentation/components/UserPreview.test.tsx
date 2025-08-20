import { render, screen } from '@testing-library/react';
import UserPreview from './UserPreview';
import type { User } from "../../Domain/Entity/User";
import { describe, it, expect, beforeEach } from 'vitest';

describe('UserPreview', () => {
  let mockUser: User;

  beforeEach(() => {
    mockUser = {
      id: "123",
      login: 'testuser',
      avatarUrl: 'https://example.com/avatar.jpg',
    };
    render(<UserPreview user={mockUser} />);
  });

  it('renders avatar image with correct alt and src', () => {
    const avatar = screen.getByAltText(mockUser.login) as HTMLImageElement;
    expect(avatar).toBeTruthy();
    expect(avatar.src).toBe(mockUser.avatarUrl);
  });

  it('renders user id and login text', () => {
    expect(screen.getByText(String(mockUser.id))).toBeTruthy();
    expect(screen.getByText(mockUser.login)).toBeTruthy();
  });

  it('renders profile link with correct attributes', () => {
    const link = document.querySelector('a') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.href).toBe(`https://github.com/${mockUser.login}`);
    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noreferrer');
  });
});
