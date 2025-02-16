{
  description = "A basic Node.js flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    git-hooks-nix = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      flake-parts,
      treefmt-nix,
      git-hooks-nix,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "aarch64-darwin"
        "x86_64-linux"
      ];
      imports = [
        treefmt-nix.flakeModule
        git-hooks-nix.flakeModule
      ];
      perSystem =
        { config, pkgs, ... }:
        {
          treefmt = {
            projectRootFile = "flake.nix";
            programs = {
              biome = {
                enable = true;
                includes = [
                  "*.js"
                  "*.ts"
                  "*.mjs"
                  "*.mts"
                  "*.cjs"
                  "*.cts"
                  "*.jsx"
                  "*.tsx"
                  "*.json"
                  "*.jsonc"
                  "*.css"
                ];
              };
              nixfmt.enable = true;
            };
          };

          pre-commit = {
            settings = {
              src = ./.;
              hooks = {
                biome = {
                  enable = true;
                };
                treefmt = {
                  enable = true;
                  settings = {
                    fail-on-change = false;
                  };
                };
              };
            };
          };

          devShells = {
            default = pkgs.mkShell {
              packages = with pkgs; [
                nodejs_20
                pnpm
              ];
              inputsFrom = [
                config.treefmt.build.devShell
                config.pre-commit.devShell
              ];
            };
          };
        };
    };
}
