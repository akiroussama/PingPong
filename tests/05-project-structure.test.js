import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Project Structure', () => {
  const directories = ['controllers', 'models', 'routes', 'tests', 'node_modules'];
  
  directories.forEach(dir => {
    it(`should have a ${dir} directory`, () => {
      expect(fs.existsSync(path.join(__dirname, `../${dir}`))).toBe(true);
    });
  });

  it('should have an app.js file', () => {
    expect(fs.existsSync(path.join(__dirname, '../app/app.js'))).toBe(true);
  });
}); 