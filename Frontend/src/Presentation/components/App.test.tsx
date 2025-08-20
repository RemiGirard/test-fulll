import { render, within } from '@testing-library/react';
import {beforeEach, it, expect, describe} from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('render the header', () => {
    const header = document.querySelector('header');
    expect(header).toBeTruthy();
    within(header as HTMLElement).getByText(/Github Search/i);
  });

  it('render at least a section', () => {
    const section = document.querySelector('section');
    expect(section).toBeTruthy();
  });
});
