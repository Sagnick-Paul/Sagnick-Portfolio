# Graph Report - Portfolio  (2026-07-27)

## Corpus Check
- 38 files · ~221,321 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 177 nodes · 165 edges · 33 communities (14 shown, 19 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e03143eb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Brain Tumor Training Metrics|Brain Tumor Training Metrics]]
- [[_COMMUNITY_Portfolio Design System|Portfolio Design System]]
- [[_COMMUNITY_Graphify Agent Rules|Graphify Agent Rules]]
- [[_COMMUNITY_AI Visual Assets|AI Visual Assets]]
- [[_COMMUNITY_ML & IIT-K Certificates|ML & IIT-K Certificates]]
- [[_COMMUNITY_Traffiq Project|Traffiq Project]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_Theme Provider|Theme Provider]]
- [[_COMMUNITY_Project Lookup Utility|Project Lookup Utility]]
- [[_COMMUNITY_Project Data Model|Project Data Model]]
- [[_COMMUNITY_Dynamic Page Metadata|Dynamic Page Metadata]]
- [[_COMMUNITY_Static Page Params|Static Page Params]]
- [[_COMMUNITY_Footer Layout|Footer Layout]]
- [[_COMMUNITY_Data Analysis Certificate|Data Analysis Certificate]]
- [[_COMMUNITY_SQL Certificate|SQL Certificate]]
- [[_COMMUNITY_SP Favicon Brand|SP Favicon Brand]]
- [[_COMMUNITY_Electric Motor Visual|Electric Motor Visual]]
- [[_COMMUNITY_CV  Resume|CV / Resume]]
- [[_COMMUNITY_Research Section|Research Section]]
- [[_COMMUNITY_Floating UI Shapes|Floating UI Shapes]]
- [[_COMMUNITY_Parallax UI Element|Parallax UI Element]]
- [[_COMMUNITY_Theme Toggle Component|Theme Toggle Component]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Sagnick Paul | Portfolio` - 7 edges
3. `scripts` - 5 edges
4. `Portfolio Overview` - 5 edges
5. `Brain Tumour Segmentation Report` - 5 edges
6. `projects` - 4 edges
7. `getProjectById()` - 4 edges
8. `ProjectDetail()` - 3 edges
9. `Project` - 3 edges
10. `🏁 Getting Started` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Brain Tumor Model IoU Curve` --references--> `Brain Tumour Segmentation Report`  [INFERRED]
  public/Brain tumour segmentation/my_plot1.png → public/brain-tumor-report.pdf
- `Brain Tumor Training Loss and Dice Score` --references--> `Brain Tumour Segmentation Report`  [INFERRED]
  public/Brain tumour segmentation/my_plot1 (1).png → public/brain-tumor-report.pdf
- `Brain Tumor Model Accuracy Curve` --references--> `Brain Tumour Segmentation Report`  [INFERRED]
  public/Brain tumour segmentation/my_plot3.png → public/brain-tumor-report.pdf
- `Brain Tumor Train-Val Dice Gap Chart` --references--> `Brain Tumour Segmentation Report`  [INFERRED]
  public/Brain tumour segmentation/my_plot4.png → public/brain-tumor-report.pdf
- `AI Brain-in-Machine Visual` --semantically_similar_to--> `AI Humanoid Cyberpunk Background`  [INFERRED] [semantically similar]
  public/ai-section.png → public/scroll-bg.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Brain Tumour Segmentation Project Assets** — public_brain_tumor_mri_samples, public_brain_tumor_iou_curve, public_brain_tumor_loss_dice, public_brain_tumor_accuracy_curve, public_brain_tumor_dice_gap, public_brain_tumor_report, public_brain_tumor_ps [INFERRED 0.95]
- **Portfolio Academic Certificates** — public_cert_eict_iitk, public_cert_machine_learning, public_cert_sql, public_cert_data_analysis [INFERRED 0.85]

## Communities (33 total, 19 thin omitted)

### Community 0 - "Brain Tumor Training Metrics"
Cohesion: 0.33
Nodes (7): Brain Tumor Model Accuracy Curve, Brain Tumor Train-Val Dice Gap Chart, Brain Tumor Model IoU Curve, Brain Tumor Training Loss and Dice Score, Brain MRI Tumor Segmentation Samples, Brain Tumour Project Statement, Brain Tumour Segmentation Report

### Community 1 - "Portfolio Design System"
Cohesion: 0.33
Nodes (6): Dark/Light Theme Switching, Framer Motion Animations, GitHub Contribution Integration, Glassmorphism UI Design, Next.js 14 App Router, Portfolio Overview

### Community 6 - "Root Layout"
Cohesion: 0.19
Nodes (6): AIAssistant, inter, metadata, ThemeProvider(), Footer(), ThemeToggle()

### Community 7 - "Home Page"
Cohesion: 0.12
Nodes (4): AIParallaxSection, MotorParallaxSection, Research(), GridBackground()

### Community 8 - "Theme Provider"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "Project Lookup Utility"
Cohesion: 0.13
Nodes (9): getProjectById(), Project, projects, generateMetadata(), getProjectImages(), ProjectDetail(), Document, ProjectGalleryProps (+1 more)

### Community 10 - "Project Data Model"
Cohesion: 0.18
Nodes (10): 🛠️ Built With, 🚀 Deployment, 🏁 Getting Started, Installation, ✨ Key Features, 📄 License, 🚀 Overview, Prerequisites (+2 more)

### Community 11 - "Dynamic Page Metadata"
Cohesion: 0.20
Nodes (10): dependencies, clsx, framer-motion, lucide-react, next, next-themes, react, react-dom (+2 more)

### Community 12 - "Static Page Params"
Cohesion: 0.20
Nodes (10): devDependencies, autoprefixer, eslint, eslint-config-next, postcss, tailwindcss, @types/node, @types/react (+2 more)

### Community 13 - "Footer Layout"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

## Knowledge Gaps
- **88 isolated node(s):** `extends`, `nextConfig`, `name`, `version`, `private` (+83 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Dynamic Page Metadata` to `Footer Layout`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Static Page Params` to `Footer Layout`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `extends`, `nextConfig`, `name` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Home Page` be split into smaller, more focused modules?**
  _Cohesion score 0.11695906432748537 - nodes in this community are weakly interconnected._
- **Should `Theme Provider` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Project Lookup Utility` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._