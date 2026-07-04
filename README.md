# AI CI/CD Pipeline Generator

A lightweight web app that helps developers generate GitHub Actions workflow files for common stacks such as Next.js, React, Node.js, Laravel, WordPress, and more.

## What it does

The tool collects a few project details:
- project type
- package manager
- deployment target
- branch flow
- quality checks
- deployment environments

It then generates:
- CI workflow
- staging deployment workflow
- production deployment workflow
- environment example file
- deployment notes

## How the experience works

1. The user chooses their stack and deployment target.
2. The site shows a live summary of the intended pipeline.
3. The user clicks Generate Workflows.
4. The app returns YAML files and deployment guidance for GitHub Actions.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## Product goals

This project is designed to feel more like a guided developer product than a simple form. The experience explains:
- what the tool is for
- how the generated workflow will behave
- which secrets and environments are required
- how the output can be used in a real repository

