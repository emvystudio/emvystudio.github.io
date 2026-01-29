# RECOVERY GUIDE — Emvy Studio Eleventy Site

This document is for **when things go wrong**.
Follow steps in order. Do not skip ahead.

---

## 🚨 First Rule: Stop and Check State

```bash
git branch --show-current
git status
```

If you are not on `11ty-restructure`, switch back immediately:

```bash
git checkout 11ty-restructure
```

---

## 🔍 Find a Known-Good Commit

```bash
git log --oneline
```

Identify the last commit where:
- CSS was correct
- Local preview worked
- No merge conflict markers existed

---

## ⏪ Hard Restore to Known-Good Commit

```bash
git reset --hard <commit-hash>
```

⚠️ This discards local changes.

---

## 🧹 Clean the Build Environment

```bash
rm -rf _site
rm -rf node_modules
npm ci
npx @11ty/eleventy
```

Verify locally:
```bash
npm start
```

---

## 🧪 Check for Merge Conflict Markers

Search for these strings:
```
<<<<<<<
=======
>>>>>>>
```

Especially in:
- assets/css/styles.css
- templates
- includes

If found, the file is broken until fixed.

---

## 💾 Create Emergency Backup Branch

```bash
git checkout -b recovery-backup-YYYY-MM-DD
git push origin recovery-backup-YYYY-MM-DD
```

This preserves the restored state.

---

## 🚀 Redeploy Correct State

```bash
git checkout 11ty-restructure
git push origin 11ty-restructure --force
```

Then verify GitHub Actions completes successfully.

---

## 🛑 What NOT To Do During Recovery

- Do NOT merge branches
- Do NOT edit `_site/`
- Do NOT change workflows
- Do NOT panic-push to main

---

## 🧠 If All Else Fails

1. Clone repo fresh
2. Checkout `11ty-restructure`
3. Reset to known-good commit
4. Rebuild
5. Deploy

---

## ✅ Recovery Complete When:

- Local preview matches expected
- No conflict markers exist
- GitHub Actions passes
- Live site matches local build
