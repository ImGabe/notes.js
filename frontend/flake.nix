{
  description = "A very basic flake";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.utils.url = "github:numtide/flake-utils";

  inputs.flake-compat = {
    url = "github:edolstra/flake-compat";
    flake = false;
  };


  outputs = { self, nixpkgs, utils, flake-compat }:
    (utils.lib.eachDefaultSystem
      (system:
        let pkgs = nixpkgs.legacyPackages.${system}; in
        {
          devShell = with pkgs; mkShell {
            buildInputs = [
              nodejs
              nodePackages.typescript
            ];
          };
        })
    );
}
