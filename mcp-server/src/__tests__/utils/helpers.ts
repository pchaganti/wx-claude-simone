import { vi } from 'vitest';
import * as path from 'path';

export const TEST_PROJECT_PATH = '/test/project';
export const TEST_CONFIG_PATH = path.join(TEST_PROJECT_PATH, '.simone', 'project.yaml');

export function createTestEnv(overrides: Record<string, string> = {}) {
  return {
    PROJECT_PATH: TEST_PROJECT_PATH,
    NODE_ENV: 'test',
    ...overrides,
  };
}

export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeout = 5000,
  interval = 100
): Promise<void> {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    if (await condition()) {
      return;
    }
    await waitFor(interval);
  }
  
  throw new Error(`Condition not met within ${timeout}ms`);
}

export function createTestLogger() {
  return {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  };
}

export function expectToThrowAsync(fn: () => Promise<any>, errorMessage?: string) {
  return expect(fn()).rejects.toThrow(errorMessage);
}