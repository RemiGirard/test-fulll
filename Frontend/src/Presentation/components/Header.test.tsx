import { render, within } from '@testing-library/react';
import {beforeEach, it, expect, describe} from 'vitest';
import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header>headerchild</Header>);
  });
  it('render the header', () => {
    const header = document.querySelector('header');
    expect(header).toBeTruthy();
    within(header as HTMLElement).getByText(/headerchild/i);
  });
});
