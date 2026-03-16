# Awesome Nickel [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A configuration language that combines the simplicity of JSON with the power of functions, types, and contracts.

[Nickel](https://nickel-lang.org/) is the universal configuration language. It automates the generation of static configuration files (JSON, YAML, TOML) using a principled design with gradual typing, first-class functions, and a contract system for validation. Nickel is developed by [Tweag](https://www.tweag.io/) (a part of Modus Create).

## Contents

- [Official Resources](#official-resources)
- [Tools](#tools)
- [Editor Support](#editor-support)
- [Integrations](#integrations)
- [Libraries and Contracts](#libraries-and-contracts)
- [Configuration Examples](#configuration-examples)
- [Articles and Talks](#articles-and-talks)
- [Community](#community)

## Official Resources

- [Nickel Website](https://nickel-lang.org/) - Official website with getting started guide.
- [Nickel Repository](https://github.com/nickel-lang/nickel) - Source code and issue tracker.
- [User Manual](https://nickel-lang.org/user-manual/) - Comprehensive language documentation.
- [Nickel Playground](https://nickel-lang.org/playground/) - Try Nickel in the browser.
- [Standard Library Reference](https://nickel-lang.org/stdlib/) - Built-in functions and contracts.
- [Getting Started](https://nickel-lang.org/getting-started/) - Installation and first steps.

## Tools

- [Nickel CLI](https://github.com/nickel-lang/nickel) - The reference interpreter with `eval`, `export`, `repl`, `format`, and `query` subcommands.
- [Nickel Language Server (NLS)](https://github.com/nickel-lang/nickel/tree/master/lsp) - LSP server providing diagnostics, type hints, completion, and formatting.
- [json-schema-to-nickel](https://github.com/nickel-lang/json-schema-to-nickel) - Convert JSON Schema specifications into Nickel contracts.
- [Topiary](https://github.com/tweag/topiary) - Universal formatter with Nickel support, used by `nickel format` under the hood.
- [tree-sitter-nickel](https://github.com/nickel-lang/tree-sitter-nickel) - Tree-sitter grammar for Nickel, enabling syntax highlighting across editors.
- [nickel-mine](https://github.com/nickel-lang/nickel-mine) - Package index for discovering and sharing Nickel packages.
- [nickel-customs](https://github.com/nickel-lang/nickel-customs) - Sanity-checking tool for published Nickel packages.
- [Amalgam](https://github.com/seryl/amalgam) - Generate type-safe Nickel configurations from any schema source.
- [nickel2ci](https://github.com/GuilloteauQ/nickel2ci) - Generate multiple CI configuration files from a single Nickel expression.

## Editor Support

- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Tweag.vscode-nickel) - Official VS Code extension with NLS integration.
- [vim-nickel](https://github.com/nickel-lang/vim-nickel) - Vim/Neovim plugin for syntax highlighting.
- [nickel-mode](https://github.com/nickel-lang/nickel-mode) - Emacs major mode for Nickel.
- [Zed Extension](https://github.com/norpadon/zed-nickel-extension) - Nickel support for the Zed editor.

## Integrations

- [Organist](https://github.com/nickel-lang/organist) - Batteries-included development environments with Nickel inside, controlling shells, formatters, and linters from a single console.
- [Terraform-Nickel (tf-ncl)](https://github.com/nickel-lang/tf-ncl) - Write Terraform configurations in Nickel with auto-generated provider contracts.
- [tf-ncl-examples](https://github.com/nickel-lang/tf-ncl-examples) - Example Terraform configurations written with tf-ncl.
- [nickel-kubernetes](https://github.com/nickel-lang/nickel-kubernetes) - Auto-generated Nickel contracts for Kubernetes resources, enabling type-checked and modular K8s definitions.
- [rules_nickel](https://github.com/nickel-lang/rules_nickel) - Bazel ruleset for generating configuration files with Nickel during builds.
- [go-nickel](https://github.com/nickel-lang/go-nickel) - Go bindings for embedding the Nickel configuration language.
- [NickelEval.jl](https://github.com/LouLouLibs/NickelEval.jl) - Julia FFI bindings for evaluating Nickel configurations.
- [Oclis](https://github.com/Airsequel/Oclis) - CLI specification format using Nickel contracts, with code generation for Rust, Haskell, and PureScript.
- [smart-keymap](https://github.com/rgoulter/smart-keymap) - Keyboard firmware using Nickel for keylayout configuration.
- [care](https://github.com/akavel/care) - Configuration management and reconciliation tool using Nickel.

## Libraries and Contracts

- [nickel-cursor](https://github.com/jneem/nickel-cursor) - Define xcursor themes using Nickel contracts.
- [helix-nickel](https://github.com/jneem/helix-nickel) - Nickel contracts for Helix editor configuration.

## Configuration Examples

- [Nickel by Example](https://nickel-lang.org/user-manual/getting-started) - Official tutorial walking through records, functions, merging, contracts, and more.
- [tf-ncl-examples](https://github.com/nickel-lang/tf-ncl-examples) - Real-world Terraform configurations written in Nickel.

## Formats Using Nickel

- [K9 (Self-Validating Components)](https://github.com/hyperpolymath/pandoc-k9) - Configuration format where components validate against Nickel contracts at three security levels: Kennel (data), Yard (contracts), and Hunt (execution).
- [K9 Specification](https://k9-svc.net) - Format specification and documentation for K9.
- [k9-rs](https://github.com/hyperpolymath/k9-rs) - Rust parser for K9 self-validating component files.
- [k9-haskell](https://github.com/hyperpolymath/k9-haskell) - Haskell parser for K9 self-validating component files.
- [k9-validate-action](https://github.com/hyperpolymath/k9-validate-action) - GitHub Action to validate K9 configuration files.
- [vscode-k9](https://github.com/hyperpolymath/vscode-k9) - VS Code syntax highlighting for K9 `.k9` and `.k9.ncl` files.
- [Conflow](https://github.com/hyperpolymath/conflow) - Configuration flow orchestrator for Nickel, CUE, and validation workflows.

## Articles and Talks

- [Announcing Nickel 1.0](https://www.tweag.io/blog/2023-05-17-nickel-1.0-release/) - Release announcement covering the vision and features of Nickel 1.0.
- [Tweag Nickel Blog Posts](https://www.tweag.io/blog/tags/nickel/) - All Nickel-related posts from the Tweag engineering blog, including deep dives on contracts, gradual typing, and language design.
- [Nickel: the Nix language spin-off](https://discourse.nixos.org/t/nickel-the-nix-language-spin-off/9592) - NixOS Discourse announcement explaining Nickel's relationship to Nix.
- [Nickel: Better Configuration for Less (Hacker News)](https://news.ycombinator.com/item?id=24858456) - Community discussion on Nickel's design goals.

## Community

- [Discord](https://discord.gg/vYDnJYBmax) - Official Nickel Discord server.
- [GitHub Discussions](https://github.com/nickel-lang/nickel/discussions) - Ask questions and discuss Nickel development.
- [GitHub Issues](https://github.com/nickel-lang/nickel/issues) - Report bugs and request features.
- [NixOS Discourse](https://discourse.nixos.org/) - Broader Nix community where Nickel is frequently discussed.

## Contributing

Contributions welcome! Read the [contribution guidelines](contributing.md) first.
