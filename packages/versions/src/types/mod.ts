import { type } from "arktype";


const modDepRef = type({
  group: "string",
  name: "string",
  version: "string",
});

const modDeps = type({
  required: modDepRef.array().atLeastLength(1).optional(),
  optional: modDepRef.array().atLeastLength(1).optional(),
  conflicts: modDepRef.array().atLeastLength(1).optional(),
});

const modBinary = type({
  upstreamURI: "string",
});

const modBinaries = type({
  items: modBinary.array().atLeastLength(1),
});

export const modDefinition = type({
  group: "string",
  name: "string",
  version: "string",
  description: "string",
  deps: modDeps.optional(),
  binaries: modBinaries,
});

// extract the type if needed
export type ModDefinition = typeof modDefinition.infer;
