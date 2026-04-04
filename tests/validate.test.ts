// SPDX-License-Identifier: PMPL-1.0-or-later
// Copyright (c) 2026 Jonathan D.A. Jewell (hyperpolymath) <j.d.a.jewell@open.ac.uk>
//
// tests/validate.test.ts
// Deno test suite for awesome-nickel (documentation/curated-list repo).
//
// CRG Grade C test categories:
//   Unit       - Individual file/section checks in isolation.
//   Smoke      - Required files exist and are non-empty.
//   Property   - Parametric checks over all list entries.
//   E2E        - Full chain: read README → parse sections → validate entries.
//   Contract   - Invariants the awesome-list format must satisfy.
//   Aspect     - Cross-cutting: SPDX headers, encoding, link format.
//   Benchmark  - Baseline timing for validation operations.

import {
  assert,
  assertEquals,
  assertMatch,
  assertStringIncludes,
} from "jsr:@std/assert";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Read a repo-relative file as a UTF-8 string. */
async function readRepoFile(relativePath: string): Promise<string> {
  const base = new URL("../", import.meta.url);
  const url = new URL(relativePath, base);
  return Deno.readTextFile(url);
}

/** Check whether a repo-relative path exists. */
async function fileExists(relativePath: string): Promise<boolean> {
  const base = new URL("../", import.meta.url);
  const url = new URL(relativePath, base);
  try {
    await Deno.stat(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract all Markdown list entries (lines starting with "- ") from a string.
 * Returns an array of trimmed strings.
 */
function extractListEntries(content: string): string[] {
  return content
    .split("\n")
    .filter((line) => line.trimStart().startsWith("- "))
    .map((line) => line.trim());
}

/**
 * Extract all Markdown headings (lines starting with "#") from a string.
 * Returns an array of trimmed heading lines.
 */
function extractHeadings(content: string): string[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => line.trim());
}

// ---------------------------------------------------------------------------
// Smoke tests: required files exist and are non-empty
// ---------------------------------------------------------------------------

Deno.test("smoke: README.md exists", async () => {
  assert(await fileExists("README.md"), "README.md must exist");
});

Deno.test("smoke: README.md is non-empty", async () => {
  const content = await readRepoFile("README.md");
  assert(content.length > 0, "README.md must be non-empty");
});

Deno.test("smoke: LICENSE exists", async () => {
  assert(await fileExists("LICENSE"), "LICENSE must exist");
});

Deno.test("smoke: EXPLAINME.adoc exists", async () => {
  assert(await fileExists("EXPLAINME.adoc"), "EXPLAINME.adoc must exist");
});

Deno.test("smoke: SECURITY.md exists", async () => {
  assert(await fileExists("SECURITY.md"), "SECURITY.md must exist");
});

Deno.test("smoke: contributing.md exists", async () => {
  const lower = await fileExists("contributing.md");
  const upper = await fileExists("CONTRIBUTING.md");
  assert(lower || upper, "contributing.md (or CONTRIBUTING.md) must exist");
});

// ---------------------------------------------------------------------------
// Unit tests: README structure
// ---------------------------------------------------------------------------

Deno.test("unit: README has a top-level heading", async () => {
  const content = await readRepoFile("README.md");
  const headings = extractHeadings(content);
  assert(headings.length > 0, "README must have at least one heading");
  assert(
    headings[0].startsWith("# "),
    `First heading must be H1, got: ${headings[0]}`,
  );
});

Deno.test("unit: README has a Contents section", async () => {
  const content = await readRepoFile("README.md");
  assertStringIncludes(
    content,
    "## Contents",
    "README must have a ## Contents section",
  );
});

Deno.test("unit: README has at least 5 top-level H2 sections", async () => {
  const content = await readRepoFile("README.md");
  const h2 = content.split("\n").filter((l) => l.startsWith("## "));
  assert(h2.length >= 5, `Expected >= 5 H2 sections, got ${h2.length}`);
});

Deno.test("unit: README has at least 10 list entries", async () => {
  const content = await readRepoFile("README.md");
  const entries = extractListEntries(content);
  assert(
    entries.length >= 10,
    `Expected >= 10 list entries, got ${entries.length}`,
  );
});

Deno.test("unit: README mentions 'Nickel' in the first 200 characters", async () => {
  const content = await readRepoFile("README.md");
  assertStringIncludes(
    content.slice(0, 200),
    "Nickel",
    "README must mention 'Nickel' near the top",
  );
});

Deno.test("unit: README has a Contributing section", async () => {
  const content = await readRepoFile("README.md");
  const hasContributing =
    content.includes("## Contributing") ||
    content.includes("[contribution guidelines]");
  assert(hasContributing, "README must have a Contributing section or link");
});

// ---------------------------------------------------------------------------
// Property tests: parametric checks over all list entries
// ---------------------------------------------------------------------------

Deno.test("property: every list entry has a description separated by ' - '", async () => {
  const content = await readRepoFile("README.md");
  const entries = extractListEntries(content);

  // Filter to entries that contain a Markdown link — those represent actual
  // resources and must have a description.
  const linkEntries = entries.filter((e) => e.includes("[") && e.includes("]("));

  assert(
    linkEntries.length > 0,
    "Should have at least one linked list entry",
  );

  for (const entry of linkEntries) {
    // Tolerate entries in Contents (anchor-only links) and bare text entries.
    // Only validate entries that are full resource links (contain "http").
    if (!entry.includes("http")) continue;

    assert(
      entry.includes(" - "),
      `Entry missing ' - ' description separator:\n  ${entry}`,
    );
  }
});

Deno.test("property: every linked entry uses HTTPS, not HTTP", async () => {
  const content = await readRepoFile("README.md");
  // Extract all raw URLs from Markdown links: ](url)
  const urlRegex = /\]\((https?:\/\/[^)]+)\)/g;
  let match: RegExpExecArray | null;
  const httpUrls: string[] = [];

  while ((match = urlRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith("http://")) {
      httpUrls.push(url);
    }
  }

  assertEquals(
    httpUrls,
    [],
    `Found non-HTTPS URLs:\n  ${httpUrls.join("\n  ")}`,
  );
});

Deno.test("property: every H2 section in Contents has a matching heading", async () => {
  const content = await readRepoFile("README.md");

  // Extract anchor links from the Contents section
  const contentsSection = content.split("## Contents")[1]?.split("\n## ")[0] ??
    "";
  const anchorRegex = /\[([^\]]+)\]\(#[^)]+\)/g;
  let match: RegExpExecArray | null;
  const contentSectionNames: string[] = [];

  while ((match = anchorRegex.exec(contentsSection)) !== null) {
    contentSectionNames.push(match[1]);
  }

  const h2Headings = content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.replace(/^## /, "").trim());

  for (const sectionName of contentSectionNames) {
    assert(
      h2Headings.includes(sectionName),
      `Contents entry "${sectionName}" has no matching H2 heading. Found: ${h2Headings.join(", ")}`,
    );
  }
});

Deno.test("property: no duplicate list entries in README", async () => {
  const content = await readRepoFile("README.md");
  const entries = extractListEntries(content);
  const seen = new Set<string>();
  const duplicates: string[] = [];

  for (const entry of entries) {
    if (seen.has(entry)) {
      duplicates.push(entry);
    }
    seen.add(entry);
  }

  assertEquals(
    duplicates,
    [],
    `Found duplicate list entries:\n  ${duplicates.join("\n  ")}`,
  );
});

// ---------------------------------------------------------------------------
// E2E tests: full-chain validation
// ---------------------------------------------------------------------------

Deno.test("e2e: README → parse sections → count entries per section", async () => {
  const content = await readRepoFile("README.md");

  // Split into sections by H2 headings
  const sections = content.split(/\n(?=## )/);

  let totalEntries = 0;
  const sectionSummary: Record<string, number> = {};

  for (const section of sections) {
    const headingMatch = section.match(/^## (.+)/);
    if (!headingMatch) continue;

    const sectionName = headingMatch[1].trim();
    const entries = extractListEntries(section);
    sectionSummary[sectionName] = entries.length;
    totalEntries += entries.length;
  }

  // Validate at a high level
  assert(
    Object.keys(sectionSummary).length >= 4,
    `Expected >= 4 sections, got ${Object.keys(sectionSummary).length}`,
  );
  assert(totalEntries >= 10, `Expected >= 10 total entries, got ${totalEntries}`);
});

Deno.test("e2e: LICENSE → SPDX → README cross-reference chain", async () => {
  // Read LICENSE — verify it contains the PMPL license text
  const license = await readRepoFile("LICENSE");
  assertStringIncludes(license, "Palimpsest License", "LICENSE must be PMPL");

  // SECURITY.md must have SPDX header
  const security = await readRepoFile("SECURITY.md");
  assertStringIncludes(
    security,
    "SPDX-License-Identifier",
    "SECURITY.md must have SPDX header",
  );

  // README must have the awesome badge or mention the awesome list
  const readme = await readRepoFile("README.md");
  const hasAwesomeBadge =
    readme.includes("awesome.re") || readme.includes("Awesome");
  assert(hasAwesomeBadge, "README must reference the Awesome list");
});

Deno.test("e2e: EXPLAINME.adoc is readable and non-trivial", async () => {
  const content = await readRepoFile("EXPLAINME.adoc");
  assert(content.length >= 50, "EXPLAINME.adoc must have substantive content");
});

// ---------------------------------------------------------------------------
// Contract tests: awesome-list format invariants
// ---------------------------------------------------------------------------

Deno.test("contract: README begins with '# Awesome'", async () => {
  const content = await readRepoFile("README.md");
  const firstLine = content.split("\n")[0].trim();
  assertMatch(
    firstLine,
    /^#\s+[Aa]wesome/,
    `README must start with '# Awesome ...', got: ${firstLine}`,
  );
});

Deno.test("contract: README has at least one GitHub link", async () => {
  const content = await readRepoFile("README.md");
  assertStringIncludes(
    content,
    "github.com",
    "README must contain at least one GitHub link",
  );
});

Deno.test("contract: Contents section links all use anchor format (#section)", async () => {
  const content = await readRepoFile("README.md");
  const contentsSection = content.split("## Contents")[1]?.split("\n## ")[0] ??
    "";
  const links = [...contentsSection.matchAll(/\]\(([^)]+)\)/g)].map(
    (m) => m[1],
  );

  for (const link of links) {
    assert(
      link.startsWith("#"),
      `Contents links must be anchors, got: ${link}`,
    );
  }
});

Deno.test("contract: LICENSE is non-empty", async () => {
  const content = await readRepoFile("LICENSE");
  assert(content.trim().length > 0, "LICENSE must be non-empty");
});

// ---------------------------------------------------------------------------
// Aspect tests: cross-cutting concerns
// ---------------------------------------------------------------------------

Deno.test("aspect: SECURITY.md has SPDX header", async () => {
  const content = await readRepoFile("SECURITY.md");
  assertStringIncludes(
    content,
    "SPDX-License-Identifier: PMPL-1.0-or-later",
    "SECURITY.md must have correct SPDX header",
  );
});

Deno.test("aspect: README is valid UTF-8 (no replacement characters)", async () => {
  const content = await readRepoFile("README.md");
  assert(
    !content.includes("\uFFFD"),
    "README.md must not contain UTF-8 replacement characters",
  );
});

Deno.test("aspect: README does not contain raw HTML <script> tags", async () => {
  const content = await readRepoFile("README.md");
  const lower = content.toLowerCase();
  assert(
    !lower.includes("<script"),
    "README.md must not contain <script> tags",
  );
});

Deno.test("aspect: README has no broken Markdown link syntax ']()'", async () => {
  const content = await readRepoFile("README.md");
  assert(
    !content.includes("]()" ),
    "README.md must not have empty link targets ]()",
  );
});

Deno.test("aspect: README ends with a newline", async () => {
  const content = await readRepoFile("README.md");
  assert(
    content.endsWith("\n"),
    "README.md must end with a newline character",
  );
});

// ---------------------------------------------------------------------------
// Benchmark: measure validation performance
// ---------------------------------------------------------------------------

Deno.test("benchmark: reading and parsing README completes within 200ms", async () => {
  const start = performance.now();

  const content = await readRepoFile("README.md");
  extractListEntries(content);
  extractHeadings(content);

  const elapsed = performance.now() - start;
  assert(
    elapsed < 200,
    `README validation took ${elapsed.toFixed(1)}ms (limit: 200ms)`,
  );
});

Deno.test("benchmark: validating all required files completes within 500ms", async () => {
  const start = performance.now();

  await Promise.all([
    readRepoFile("README.md"),
    readRepoFile("LICENSE"),
    readRepoFile("SECURITY.md"),
    readRepoFile("EXPLAINME.adoc"),
  ]);

  const elapsed = performance.now() - start;
  assert(
    elapsed < 500,
    `Full validation took ${elapsed.toFixed(1)}ms (limit: 500ms)`,
  );
});
