import { describe, it, expect } from 'vitest';
import { modDefinition, type ModDefinition } from './types/mod';
import { type } from 'arktype';

const s1 = modDefinition.toJsonSchema();
console.log("s1", JSON.stringify(s1, null, 2));

describe('resolveDependencies', () => {

  it('mod definition validation', () => {

    const unsafe = modDefinition({
      group: "g1",
      name: "n1",
      version: "1.0.0",
      description: "desc1",
      deps: {
        required: [
          {
            group: "g1",
            name: "n1",
            version: "1.0.0"
          }
        ]
      },
      binaries: {
        items: [
          {
            upstreamURI: "http://hi"
          }
        ]
      }
    } satisfies ModDefinition);

    const e = unsafe as type.errors;


    expect(unsafe).not.toBeInstanceOf(type.errors);

    const safe = unsafe as ModDefinition;

    expect(safe.name).toBe("n1");



    // expect(result.success).toBe(true);
  });

});