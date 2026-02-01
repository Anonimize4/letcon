# Premium Pages Implementation - TODO

## Task
Remove `/frontend/src/pages/premium/` directory (not necessary) and ensure dashboard for premium users is properly set up at `/frontend/src/pages/dashboard/premium/`

## Steps

### Phase 1: Clean up unnecessary premium directory
- [x] 1.1 Remove `/frontend/src/pages/premium/` directory if it exists
- [ ] 1.2 Remove references to premium pages from routes.tsx if any

### Phase 2: Ensure Premium Dashboard structure is complete
- [x] 2.1 Verify `/frontend/src/pages/dashboard/premium/` components exist:
  - [x] PremiumDashboard.tsx
  - [x] PremiumLabs.tsx
  - [x] PremiumAnalytics.tsx
  - [x] PremiumMentoring.tsx
  - [x] index.ts (barrel export)
- [x] 2.2 Create missing components if needed

### Phase 3: Update routes for premium dashboard
- [x] 3.1 Add route `/dashboard/premium` → PremiumDashboard
- [x] 3.2 Add route `/dashboard/premium/labs` → PremiumLabs
- [x] 3.3 Add route `/dashboard/premium/analytics` → PremiumAnalytics
- [x] 3.4 Add route `/dashboard/premium/mentoring` → PremiumMentoring
- [x] 3.5 Keep existing `/pro` route pointing to PremiumDashboard for backward compatibility

### Phase 4: Update DashboardPage navigation
- [x] 4.1 Add sidebar navigation to premium sections from DashboardPage
- [x] 4.2 Make sure "Upgrade to Pro" button links work correctly

### Phase 5: Remove old duplicate files
- [ ] 5.1 Remove PremiumDashboardPage.tsx (old duplicate)
- [ ] 5.2 Remove ProDashboardPage.tsx (old duplicate)

## Final Structure
```
/frontend/src/pages/dashboard/
├── DashboardPage.tsx
├── ProfilePage.tsx
└── premium/
    ├── index.ts (barrel export)
    ├── PremiumDashboard.tsx (main dashboard)
    ├── PremiumLabs.tsx
    ├── PremiumAnalytics.tsx
    └── PremiumMentoring.tsx
```

## Routes Added
- `/dashboard/premium` - Main premium dashboard
- `/dashboard/premium/labs` - Premium labs listing
- `/dashboard/premium/analytics` - Premium analytics
- `/dashboard/premium/mentoring` - Premium mentoring sessions



