# Copilot Instructions for GKD Subscription

This repository is my personal GKD subscription.

When editing rules:

1. Prefer app-specific rules over global rules.
2. Do not invent appId, activityId, text, id, vid, or snapshotUrls.
3. Every rule must include snapshotUrls.
4. Prefer stable selectors:
   - vid/id first
   - text with activityId second
   - relationship selectors if needed
   - avoid pure text matching when possible
5. For splash ads, prefer matchTime, actionMaximum, and resetMatch.
6. For multi-step dialogs, use key and preKeys.
7. Before editing, check docs/failure-log.md.
8. If a rule fails and is fixed, update docs/failure-log.md.
9. Never remove existing working rules unless explicitly requested.
10. After editing, explain what changed and how to test it.
