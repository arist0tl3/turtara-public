# Engineering Manager Dashboard

Internal tools I built to help me manage 12 engineers across two teams when existing tools weren't cutting it.

## The Problem

As an Engineering Manager at StyleSeat, I needed better visibility into:
- Individual and team performance metrics
- Cycle time breakdowns to identify bottlenecks
- Team health signals beyond standup updates
- 1:1 preparation and follow-up tracking
- Sprint velocity and capacity planning

Existing tools (Jira, Lattice, etc.) gave me data, but not the insights I actually needed to be an effective manager.

## The Solution

Built a lightweight dashboard that aggregates data from multiple sources and surfaces the metrics that actually matter for team health and productivity.

## Features

- **Cycle Time Analysis**: Visualize where work gets stuck (code review, QA, deployment)
- **Team Health Tracking**: Monitor engagement, workload balance, and potential burnout signals
- **1:1 Management**: Prep tracking, action items, and follow-up reminders
- **Performance Patterns**: Identify trends in individual and team output
- **Sprint Analytics**: Velocity tracking, capacity planning, and commitment accuracy

## Tech Stack

- React / TypeScript
- Node.js backend
- MongoDB
- Jira/Github Integrations

## Note on Repository

This is a clean copy of tools I built and used internally 2023-2025. The original repository contained employee names and performance data in early commits, so I've published a fresh copy with just the current codebase to protect privacy.

The lack of commit history doesn't reflect the iterative development - this tool evolved significantly over 2+ years based on what I learned managing teams.

## Impact

Used this daily for 2+ years while managing engineering teams. Helped me:
- Identify bottlenecks early (avg 30% reduction in cycle time)
- Have more productive 1:1s (data-informed conversations)
- Spot team health issues before they became problems
- Make better resourcing decisions during reorgs

## Status

Built iteratively 2023-2025 as my management needs evolved. Works great for my use case. Not production-ready for others (single-user assumptions, basic auth, etc.).

## Why I'm Sharing This

Building this taught me something important: I'm much more energized by building tools than by the meetings and process that come with management. That realization is why I'm now looking for product engineer roles where I can be closer to shipping features.

---

Built by [@arist0tl3](https://github.com/arist0tl3)
