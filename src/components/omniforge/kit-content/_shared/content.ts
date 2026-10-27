/* ════════════════════════════════════════════════════════════════════
   Shared archetype root files — real for EVERY offer in the catalog.
   The KitCompiler interpolates {{kit}}, {{offerId}}, {{version}},
   {{date}} and {{flagTable}} when it builds the ZIP. Hero kits get a
   specialisation line via {{heroNote}}.
   ════════════════════════════════════════════════════════════════════ */

export const sharedKitId = "_shared";

export const files: Record<string, string> = {
  "root/README.md": `# {{kit}}

{{heroNote}}

OMNIFORGE {{offerId}} · {{version}} · {{date}}

This archive is the complete kit. Every file is labelled with its status:

{{flagTable}}

## Folder map

- \`01\`…\`NN\` — numbered deliverable folders, matching the "What's included" manifest on the product page
- \`EXTENDED-PACK/\` — bonus content currently in production; the stub inside states exactly what the finished file will contain
- root — this README, LICENSE, CHANGELOG and QUICK-START

## Support

Questions, corrections and improvement ideas: support@omniforge.example
`,

  "root/LICENSE.md": `# License — OMNIFORGE {{offerId}}

## Grant

Subject to the terms below, you receive a perpetual, worldwide,
non-exclusive, commercial license to use, modify and combine the
contents of this kit ("the Kit") in your own projects and in work you
perform for clients.

## You may

- Use the Kit in unlimited personal, client and commercial projects
- Modify the Kit and combine it with your own work
- Use the Kit in products you sell, where the Kit forms part of a larger work you authored

## You may not

- Resell, redistribute or repackage the Kit as a competing template or
  asset product, on its own or as a bundle
- Publish the Kit's source files in a public repository or marketplace
- Use the Kit to train commercial machine-learning systems

## Attribution

Not required, always appreciated.

THE KIT IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. For the full
warranty disclaimer and limitation of liability, see the QUICK-START guide.
`,

  "root/CHANGELOG.md": `# Changelog — {{kit}}

All notable changes to this kit are documented here. Dates are UTC.

## {{version}} — {{date}}

- Edition 2026 release
- Numbered folders aligned 1:1 with the product-page manifest
- Honest content flags introduced: \`real\` (authored), \`sample\`
  (trimmed excerpt), \`extended\` (in production — stub states what the
  finished file will contain)
- README now embeds the full flag table for this archive

## 1.0 — May 2025

- Initial release
`,

  "root/QUICK-START.md": `# Quick start — {{kit}}

You are five minutes away from your first result.

## 1. Open the kit

Unzip this archive. Read \`README.md\` first — it contains the flag table
that says exactly what every file contains.

## 2. Pick your entry point

Start with the first numbered folder (\`01-…\`). Folders are ordered the
way a first run flows, not alphabetically.

## 3. Make it yours

Replace every \`{{merge_field}}\`-style placeholder with your own values.
A search for \`{{\` finds all of them — there are no hidden ones.

## 4. Ship

The kit's outputs are plain files: open them in Word/Google Docs, your
browser, or your editor. No build step, no account, no install.

## Warranty

30-day money-back guarantee, no questions asked. Support:
support@omniforge.example
`,

  "root/duplicate-link.md": `# Duplicate into Notion — {{kit}}

The live workspace is duplicated with a single click:

1. Open the walkthrough link in \`04-setup/walkthrough-link.md\`
2. Click **Duplicate** in the top-right corner of the workspace
3. Choose the destination team space in the dialog
4. All databases, views, relations and formulas come across intact
   (databases arrive empty of the seeding rows shown on the product
   page unless "Copy content" is ticked)

## Importing the CSVs instead

Prefer your own workspace? Import the CSVs from \`01-databases/\`
directly: Notion → New page → /csv import. The column headers match the
Notion property names one-to-one, so the formula reference in
\`03-formulas/formula-reference.md\` plugs straight in.

## Support

support@omniforge.example — 30-day money-back guarantee.
`,
};
