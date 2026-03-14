import { describe, expect, it } from 'vitest';

describe('web smoke', () => {
  it('runs test runtime', () => {
    expect(1 + 1).toBe(2);
  });
});
