# Overview

This is a service which provides mods to a game, including:
* A service to host the mods
    * Mods are submitted and updated via GitHub PRs which edit a mod registration file
    * GitHub actions act on the merged mod PR metadata updates which build a static website with all mod data, a static set of JSON files to serve as a JSON API to clients and uploads the new binary artifacts to GitHub releases.
* A static website to browse mods
* A static set of JSON files to act as a JSON API for mod info
* A cross-platform client to install mods via a "modpak"

The mod definition metadata can define:
* required groupId
* required artifactId
* required version
* required upstream location of binary for the given mod version
* required upstream location of mod README Markdown document
* required dependencies on one another using semver constraints similar to NPM
* optional dependencies on one another using semver constraints similar to NPM

The client will define a list of mods to install in a "modpak" which may contain:
* the primary list of requested mods
* optional mod-level resolution overrides that:
    * apply to a given mod groupId:artifactId to override it's version constraint

The client will run a deterministic dependency resolution algorithm similar to Maven where the final
flat set of dependencies is based on the required and optional dependencies taking all transitive dependencies
into account and using the semver requirement constraints of each mod, with the optional modpak overrides
for a given groupId:artifactId taking precedence when set.

It's possible for the client to error on this process if the modpak data results in an unsatisfiable set
of mods due to transitive dependency version conflicts.



# Example Mod Definition

```yaml
# Extends the previous mod definition with dependency information
groupId: org.example
artifactId: my-mod
version: 1.0.0

# Dependency specification
dependencies:
  # Direct dependencies with version constraints
  required:
    - mod: graphics-library
      version: "^2.0.0"      # Compatible with any 2.x.x version
    - mod: physics-engine
      version: "~1.2.0"      # Compatible with any 1.2.x version
    - mod: ui-framework
      version: "1.0.0"       # Exact version required
      
  # Optional dependencies
  optional:
    - mod: high-res-textures
      version: ">=1.0.0"

```


# Example Modpak Definition

```yaml
name: my modpack
mods:
  - mod: graphics-library
    version: "^2.0.0"      # Compatible with any 2.x.x version
  - mod: physics-engine
    version: "~1.2.0"      # Compatible with any 1.2.x version
  - mod: ui-framework
    version: "1.0.0"       # Exact version required
      
```
