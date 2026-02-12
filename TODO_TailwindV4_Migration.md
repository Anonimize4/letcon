# Tailwind v4 Migration Plan

## Objective
Complete the migration to Tailwind CSS v4 by removing the deprecated `tailwind.config.ts` file and moving all configuration into the CSS file using `@source` and `@theme` directives.

## Steps Completed
1. ✅ Analyze current Tailwind configuration
2. ✅ Add @tailwindcss/vite plugin to vite.config.ts
3. ✅ Update globals.css with v4 @theme directive
4. ✅ Add @tailwindcss/vite dependency to package.json
5. ✅ Remove legacy tailwind.config.ts.bak file
6. ✅ Force reinstall @tailwindcss/vite for Vite 7 compatibility
7. ✅ Rebuild @tailwindcss/oxide binary
8. ✅ Fix "o is not defined" error - removed stray `o` character from vite.config.ts
9. ✅ Clear Vite cache

## Migration Summary

### Configuration Files
- **vite.config.ts**: ✅ Using `@tailwindcss/vite` plugin (syntax error fixed)
- **globals.css**: ✅ Using v4 syntax (`@import "tailwindcss"`, `@source`, `@theme`)
- **tailwind.config.ts**: ✅ Does not exist (already deleted)
- **postcss.config.js**: ✅ Does not exist (not needed for v4)
- **tailwind.config.ts.bak**: ✅ Deleted
- **tailwind.config.js**: ✅ Does not exist

### Commands Executed
```bash
rm /home/login/LETHCON/frontend/tailwind.config.ts.bak
cd /home/login/LETHCON/frontend && npm install @tailwindcss/vite --force
cd /home/login/LETHCON/frontend && npm rebuild @tailwindcss/oxide
rm -rf /home/login/LETHCON/frontend/node_modules/.vite
```

## Final Configuration

### globals.css (v4 style)
```css
@import "tailwindcss";

@source "../index.html";
@source "./**/*.{js,ts,jsx,tsx}";

@theme {
  /* Your custom theme variables */
}
```

## Files to Modify
1. `frontend/tailwind.config.ts` → Rename to `tailwind.config.ts.bak`
2. `frontend/src/styles/globals.css` → Add @source directives

## Files that may exist (to check/remove)
- `frontend/tailwind.config.js`
- `frontend/postcss.config.js`

