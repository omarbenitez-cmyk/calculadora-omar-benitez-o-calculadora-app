# Copilot Instructions

## Project Overview

This repository contains the **Calculadora Omar Benitez** Android app, a calculator Progressive Web App (PWA) packaged for the Google Play Store using [PWABuilder](https://docs.pwabuilder.com/#/builder/android).

## Repository Structure

- `Calculadora - Google Play package (1).zip` — The Google Play release package, which includes:
  - `Calculadora omar.apk` — Android installable package
  - `Calculadora omar.aab` — Android App Bundle (used for Play Store submission)
  - `signing.keystore` — App signing keystore
  - `signing-key-info.txt` — Signing key metadata
  - `assetlinks.json` — Digital Asset Links file for verifying app ownership
- `README.md` — Project readme
- `LICENSE` — Project license

## Key Notes for Copilot

- This app is a **PWA wrapped for Android** using PWABuilder. There is no native Android source code (Java/Kotlin) in this repository.
- To update the app, changes should first be made to the underlying web app, then the Android package should be regenerated via PWABuilder.
- The `signing.keystore` file must be kept safe — it is required to publish future updates to the same Google Play listing.
- The `assetlinks.json` file should be hosted at `/.well-known/assetlinks.json` on the web app's domain to enable trusted web activity (TWA) linking.

## Conventions

- Keep any secrets (keystore passwords, signing credentials) out of source control. The `signing-key-info.txt` in the zip is included only as a reference; do not add raw credentials to files tracked by git.
- Document any changes to the Play Store package in the `README.md`.
