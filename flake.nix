# bluesky-awoo-bot: Nix dev shell
# Provides Node.js 22 and pnpm for local development.
# Uses nixfmt for formatting — run via `nix fmt`.

{
  description = "bluesky-awoo-bot — awoo counter for Bluesky";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in {
      devShells = forAllSystems (system:
        let pkgs = nixpkgs.legacyPackages.${system}; in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [ nodejs_22 pnpm ];

            shellHook = ''
              echo "bluesky-awoo-bot dev shell ready (Node.js 22 + pnpm)"
            '';
          };
        }
      );

      # Keep project formatting consistent via nixfmt
      formatter = forAllSystems (pkgs: pkgs.nixfmt-rfc-style);
    };
}
