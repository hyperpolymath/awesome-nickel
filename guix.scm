; SPDX-License-Identifier: PMPL-1.0-or-later
;; guix.scm — GNU Guix package definition for awesome-nickel
;; Usage: guix shell -f guix.scm

(use-modules (guix packages)
             (guix build-system gnu)
             (guix licenses))

(package
  (name "awesome-nickel")
  (version "0.1.0")
  (source #f)
  (build-system gnu-build-system)
  (synopsis "awesome-nickel")
  (description "awesome-nickel — part of the hyperpolymath ecosystem.")
  (home-page "https://github.com/hyperpolymath/awesome-nickel")
  (license ((@@ (guix licenses) license) "PMPL-1.0-or-later"
             "https://github.com/hyperpolymath/palimpsest-license")))
