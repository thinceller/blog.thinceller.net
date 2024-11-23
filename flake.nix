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
  };

  outputs =
    inputs@{ flake-parts, treefmt-nix, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "aarch64-darwin"
        "x86_64-linux"
      ];
      imports = [
        treefmt-nix.flakeModule
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
                  "*.d.ts"
                  "*.d.cts"
                  "*.d.mts"
                  "*.json"
                  "*.jsonc"
                  "*.css"
                ];
              };
              nixfmt.enable = true;
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
              ];
            };
          };
        };
    };
}
