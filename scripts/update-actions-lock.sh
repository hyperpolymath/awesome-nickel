#!/usr/bin/env bash
# SPDX-License-Identifier: MPL-2.0
#
# Compatibility entry point for the estate governance workflow.  This
# repository's lock-sync gate uses check-lock-sync.sh because gh actions-lock's
# local verifier does not model every GitHub startup constraint that we check.

set -euo pipefail

if [ "${1:-}" != "--verify-local" ]; then
  echo "usage: $0 --verify-local [workflow-directory]" >&2
  exit 2
fi
shift

if [ "$#" -gt 1 ]; then
  echo "usage: $0 --verify-local [workflow-directory]" >&2
  exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "$SCRIPT_DIR/check-lock-sync.sh" "${1:-.github/workflows}"
