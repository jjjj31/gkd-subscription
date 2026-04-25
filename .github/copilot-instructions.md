# Copilot Instructions for GKD Subscription

This repository is a personal GKD subscription based on `@gkd-kit/subscription-template`.

## Build, check, and lint commands

- Install dependencies: `pnpm install`
- Type + subscription validation: `pnpm run check`
- Build `dist/` artifacts (`gkd.json5`, `gkd.version.json5`, changelog/readme sync): `pnpm run build`
- Lint (auto-fix): `pnpm run lint`
- Format (auto-fix): `pnpm run format`

### Single-test command

There is no unit-test framework configured (`test` script does not exist). For the smallest validation run, use:

- `pnpm exec tsx ./scripts/check.ts`

## High-level architecture

- `src/subscription.ts` is the single entry point. It defines subscription metadata and wires together:
  - `src/categories.ts` (category definitions)
  - `src/globalGroups.ts` (global rules)
  - `src/apps/*` (per-app rules, loaded via `batchImportApps`)
- `src/apps/*.ts` holds app-specific rule groups. Each file exports `defineGkdApp(...)` and maps to one app package id.
- `scripts/check.ts` performs schema/compatibility validation (`checkApiVersion`, `checkSubscription`) before publishing.
- `scripts/build.ts` calls `updateDist(subscription)` to generate release artifacts in `dist/`.
- CI workflows:
  - `.github/workflows/check_fix_push.yml`: on push, runs check/format/lint and may auto-commit fixes.
  - `.github/workflows/pull_request_check.yml`: validates and enforces PR scope (subscription source changes must be limited; >1 of tracked files fails).
  - `.github/workflows/build_release.yml`: manual release flow that builds, commits generated artifacts, tags, and creates GitHub release.

## Key repository conventions

When editing rules:

1. Prefer app-specific rules over global rules.
2. Do not invent `appId`, `activityId`, `text`, `id`, `vid`, or `snapshotUrls`.
3. Every rule must include `snapshotUrls`.
4. Prefer stable selectors:
   - `vid`/`id` first
   - `text` with `activityId` second
   - relationship selectors if needed
   - avoid pure text matching when possible
5. For splash ads, prefer `matchTime`, `actionMaximum`, and `resetMatch`.
6. For multi-step dialogs, use `key` and `preKeys`.
7. Before editing, check `docs/failure-log.md`.
8. If a rule fails and is fixed, update `docs/failure-log.md`.
9. Never remove existing working rules unless explicitly requested.
10. After editing, explain what changed and how to test it.

Additional project-specific guidance:

- Keep rule changes scoped and app-focused: app rules belong in `src/apps/<package>.ts`; avoid moving app behavior into `globalGroups` unless explicitly global.
- Follow the existing `@gkd-kit/define` pattern (`defineGkdSubscription`, `defineGkdApp`, `defineGkdCategories`, `defineGkdGlobalGroups`) instead of custom wrappers.
- Environment assumptions in this repo: Node.js `>=22`, pnpm, ESM TypeScript.

## Local snapshot workflow

1. 用户会手动下载 GKD 快照 zip，并解压到 snapshots/latest。
2. snapshots/ 是本地隐私目录，不允许提交到 GitHub；如果项目的 `.gitignore` 还没有忽略 snapshots/，请在 `.gitignore` 中添加 `snapshots/`（本仓库已包含此规则）。
3. 添加规则时，优先读取 snapshots/latest 中的截图、节点树和元信息，用来提取 appId、activityId 和目标节点信息；从本地快照中提取的信息应作为首要来源。
4. 用户只需要用自然语言描述目标控件的位置和目标行为，例如“右上角关闭按钮”、“跳过广告按钮”。
5. 只有在无法从本地快照确定目标节点时，才向用户询问补充信息，并仅请求最少量必要的信息。
6. 严格禁止伪造或编造 `appId`、`activityId`、`text`、`id`、`vid` 或 `snapshotUrls`；规则应以实测或快照数据为依据。
7. 修改规则后，运行 `pnpm run check`，通过后再提交并推送变更（commit message: `chore: document local snapshot workflow`）。

