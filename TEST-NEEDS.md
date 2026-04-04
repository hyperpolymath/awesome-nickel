# TEST-NEEDS — awesome-nickel

## CRG Grade C — ACHIEVED 2026-04-04

This is a curated documentation/list repository with no executable application
code. Tests validate the structural integrity of the awesome list using Deno.

### Test Inventory

| Category | Status | Location | Count |
|---|---|---|---|
| Unit | PASS | `tests/validate.test.ts` | 6 |
| Smoke | PASS | `tests/validate.test.ts` | 6 |
| Property-based (P2P) | PASS | `tests/validate.test.ts` | 4 |
| E2E | PASS | `tests/validate.test.ts` | 3 |
| Contract | PASS | `tests/validate.test.ts` | 4 |
| Aspect | PASS | `tests/validate.test.ts` | 5 |
| Benchmarks (baselined) | PASS | `tests/validate.test.ts` | 2 |

Total tests: **30** (all Deno tests)

### Commands

```sh
# Run all tests
deno test --allow-read tests/

# Or via deno task
deno task test
```

### Test Strategy

Since this is a documentation repo with no executable code, all CRG Grade C
categories are satisfied through structural validation:

- **Unit/Smoke**: file existence, non-empty, correct structure
- **Property**: parametric checks over all list entries (HTTPS, descriptions, no duplicates)
- **E2E**: full parse chain (README → sections → entries → cross-reference validation)
- **Contract**: format invariants (awesome heading, Contents anchors, etc.)
- **Aspect**: cross-cutting (SPDX headers, UTF-8, no script injection, trailing newline)
- **Benchmarks**: timing assertions for validation operations

### Next: CRG Grade B

Requires 6 quality targets.
See `.machine_readable/STATE.a2ml` for details.
