import { type } from "arktype";
import { modPak } from "./mod-pak";

const resolvedFrom = type.enumerated("direct", "transitive");
const resolvedMethod = type.enumerated("normal", "override");

const resolvedMod = type({
  group: "string",
  name: "string",
  version: "string",
  from: resolvedFrom,
  method: resolvedMethod,
  path: "string[]",
});

export const resolvedModPak = type({
  name: modPak.get("name"),
  description: modPak.get("description"),
  resolvedDeps: resolvedMod.array().optional(),
});

// extract the type if needed
export type ResolvedModPak = typeof resolvedModPak.infer;
