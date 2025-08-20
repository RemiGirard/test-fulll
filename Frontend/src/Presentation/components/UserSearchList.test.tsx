import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import UserSearchList from './UserSearchList';

vi.mock('../../Domain/UseCase/queryUserList.ts', () => ({
  default: vi.fn(),
}));

import getUserList from '../../Domain/UseCase/queryUserList.ts';
const mockGetUserList = vi.mocked(getUserList);

describe('UserSearchList', () => {
  beforeEach(() => {
    mockGetUserList.mockReset();
  });

  it('renders search input and user table structure', async () => {
    mockGetUserList.mockResolvedValueOnce([]);
    render(<UserSearchList />);
    expect(screen.getByPlaceholderText(/search input/i)).toBeTruthy();
    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  it('displays users when present', async () => {
    mockGetUserList.mockResolvedValueOnce([
      { id: '1', login: 'john', avatarUrl: 'avatar1' },
      { id: '2', login: 'jane', avatarUrl: 'avatar2' },
    ]);
    render(<UserSearchList />);
    await waitFor(() => {
      expect(screen.getByText('john')).toBeTruthy();
      expect(screen.getByText('jane')).toBeTruthy();
    });
  });

  it('updates user list when filter text changes', async () => {
    mockGetUserList.mockResolvedValueOnce([]).mockResolvedValueOnce([
      { id: '99', login: 'jack', avatarUrl: 'avatar99' },
    ]);
    render(<UserSearchList />);
    const input = screen.getByPlaceholderText(/search input/i);
    fireEvent.change(input, { target: { value: 'ja' } });
    await waitFor(() => {
      expect(screen.getByText('jack')).toBeTruthy();
    });
  });

  it('shows nothing when no users found and not loading', async () => {
    mockGetUserList.mockResolvedValueOnce([]);
    render(<UserSearchList />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeNull();
      expect(screen.queryByTestId('user-card')).toBeNull();
    });
  });
});