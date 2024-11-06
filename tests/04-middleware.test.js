import { describe, it, expect } from 'vitest';
import app from '../app/app.js';

describe('Middleware Configuration', () => {
  it("should have 'body-parser' middleware configured", () => {
    const appStack = app._router.stack;
    const bodyParserUsed = appStack.some(layer => {
      return layer && layer.name && (layer.name === 'jsonParser' || layer.name === 'urlencodedParser');
    });
    expect(bodyParserUsed).toBe(true);
  });

  it("should have 'body-parser' middleware before routes", () => {
    const appStack = app._router.stack;
    const bodyParserIndex = appStack.findIndex(layer => layer.name === 'jsonParser' || layer.name === 'urlencodedParser');
    const routeIndex = appStack.findIndex(layer => layer.route);
    expect(bodyParserIndex).toBeLessThan(routeIndex);
  });
}); 