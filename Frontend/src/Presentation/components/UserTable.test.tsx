import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserTable from './UserTable';
import type { User } from '../../Domain/Entity/User';
import type {UserAndIsSelected} from "../hooks/useUserListReducer.tsx";

const RenderUser = ({ user }: { user: User }) => (
  <div data-testid="user-card">{user.login}</div>
);

const USER_LIST: UserAndIsSelected[] = [
  { id: '1', login: 'first', avatarUrl: '', isSelected: false },
  { id: '2', login: 'second', avatarUrl: '', isSelected: true },
];

describe('UserTable', () => {
  it('renders loading state', () => {
    render(<UserTable
      userList={[]}
      RenderUser={RenderUser}
      isLoading={true}
      onToggleSelect={()=>{}}
      isEditMode={false}
      status={"ok"}
    />);
    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  it('renders list of users with RenderUser', () => {
    render(<UserTable
      userList={USER_LIST}
      RenderUser={RenderUser}
      isLoading={false}
      onToggleSelect={()=>{}}
      isEditMode={false}
      status={"ok"}
    />);
    expect(screen.getAllByTestId('user-card')).toHaveLength(2);
    expect(screen.getByText('first')).toBeTruthy();
    expect(screen.getByText('second')).toBeTruthy();
  });

  it('renders nothing when no users and not loading', () => {
    render(<UserTable
      userList={[]}
      RenderUser={RenderUser}
      isLoading={false}
      onToggleSelect={()=>{}}
      isEditMode={false}
      status={"ok"}
    />);
    expect(screen.queryByTestId('user-card')).toBeNull();
    expect(screen.queryByText(/loading/i)).toBeNull();
  });
});
