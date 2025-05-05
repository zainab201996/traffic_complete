import "@testing-library/jest-dom";
import { vi } from "vitest";

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
