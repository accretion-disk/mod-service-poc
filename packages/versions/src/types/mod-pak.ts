import { type } from "arktype";

const modRef = type({
  group: "string",
  name: "string",
  version: "string",
});

const modOverride = type({
  group: "string",
  name: "string",
  version: "string",
});

export const modPak = type({
  name: "string",
  description: "string?",
  deps: modRef.array().atLeastLength(1).optional(),
  overrides: modOverride.array().atLeastLength(1).optional(),
});

// extract the type if needed
export type ModPak = typeof modPak.infer;
