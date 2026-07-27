# Graph Report - .  (2026-07-01)

## Corpus Check
- 56 files · ~221,317 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 38 nodes · 16 edges · 23 communities (2 shown, 21 thin omitted)
- Extraction: 31% EXTRACTED · 69% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `Portfolio Overview` - 5 edges
2. `Brain Tumour Segmentation Report` - 5 edges
3. `Brain MRI Tumor Segmentation Samples` - 2 edges
4. `Brain Tumor Model IoU Curve` - 2 edges
5. `Brain Tumor Training Loss and Dice Score` - 2 edges
6. `Next.js 14 App Router` - 1 edges
7. `Glassmorphism UI Design` - 1 edges
8. `Framer Motion Animations` - 1 edges
9. `Dark/Light Theme Switching` - 1 edges
10. `GitHub Contribution Integration` - 1 edges

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

## Communities (23 total, 21 thin omitted)

### Community 0 - "Brain Tumor Training Metrics"
Cohesion: 0.33
Nodes (7): Brain Tumor Model Accuracy Curve, Brain Tumor Train-Val Dice Gap Chart, Brain Tumor Model IoU Curve, Brain Tumor Training Loss and Dice Score, Brain MRI Tumor Segmentation Samples, Brain Tumour Project Statement, Brain Tumour Segmentation Report

### Community 1 - "Portfolio Design System"
Cohesion: 0.33
Nodes (6): Dark/Light Theme Switching, Framer Motion Animations, GitHub Contribution Integration, Glassmorphism UI Design, Next.js 14 App Router, Portfolio Overview

## Knowledge Gaps
- **32 isolated node(s):** `RootLayout`, `Home`, `generateStaticParams`, `generateMetadata`, `ThemeProvider` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 5 inferred relationships involving `Brain Tumour Segmentation Report` (e.g. with `Brain Tumor Model Accuracy Curve` and `Brain Tumor Train-Val Dice Gap Chart`) actually correct?**
  _`Brain Tumour Segmentation Report` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Brain MRI Tumor Segmentation Samples` (e.g. with `Brain Tumor Model IoU Curve` and `Brain Tumor Training Loss and Dice Score`) actually correct?**
  _`Brain MRI Tumor Segmentation Samples` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Brain Tumor Model IoU Curve` (e.g. with `Brain Tumour Segmentation Report` and `Brain MRI Tumor Segmentation Samples`) actually correct?**
  _`Brain Tumor Model IoU Curve` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Brain Tumor Training Loss and Dice Score` (e.g. with `Brain Tumour Segmentation Report` and `Brain MRI Tumor Segmentation Samples`) actually correct?**
  _`Brain Tumor Training Loss and Dice Score` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RootLayout`, `Home`, `generateStaticParams` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._