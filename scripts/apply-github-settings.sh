#!/usr/bin/env bash
# Applies the repo settings kept in code to GitHub:
#   - every .github/rulesets/*.json (created, or updated by name)
#   - merge settings: squash only, delete branches after merge
#   - GitHub Pages off (Cloudflare serves the site)
#
# Needs a repo admin. On this repo that is only the CrystalWaterWorks account:
#   gh auth login                          # once, to add the CrystalWaterWorks account
#   gh auth switch --user CrystalWaterWorks
#   scripts/apply-github-settings.sh
#   gh auth switch --user kevinbradleykb   # back to your day-to-day account
#
# Safe to re-run: it converges GitHub to what is in the repo.
set -euo pipefail

REPO="CrystalWaterWorks/CrystalWaterWorks.github.io"
cd "$(dirname "$0")/.."

if [ "$(gh api "repos/$REPO" --jq .permissions.admin)" != "true" ]; then
  echo "Error: $(gh api user --jq .login) is not an admin of $REPO. See the header of this script." >&2
  exit 1
fi

for file in .github/rulesets/*.json; do
  name=$(jq -r .name "$file")
  id=$(gh api "repos/$REPO/rulesets" --jq ".[] | select(.name == \"$name\") | .id")
  if [ -n "$id" ]; then
    gh api --method PUT "repos/$REPO/rulesets/$id" --input "$file" --silent
    echo "Updated ruleset '$name' (id $id) from $file"
  else
    gh api --method POST "repos/$REPO/rulesets" --input "$file" --silent
    echo "Created ruleset '$name' from $file"
  fi
done

gh api --method PATCH "repos/$REPO" --silent \
  -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true \
  -f squash_merge_commit_title=PR_TITLE -f squash_merge_commit_message=PR_BODY
echo "Merge settings: squash only, PR title as commit message, delete branches after merge"

if gh api "repos/$REPO/pages" --silent 2>/dev/null; then
  gh api --method DELETE "repos/$REPO/pages" --silent
  echo "GitHub Pages: disabled"
else
  echo "GitHub Pages: already off"
fi
