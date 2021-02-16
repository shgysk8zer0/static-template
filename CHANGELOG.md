<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.1.0] - 2021-02-16

### Changed
- Load `polyfill.io` and custom elements shim as `<script nomodule>`
- Use own (single) npm package instead of serveral others

## [v1.1.0] - 2020-12-15

### Added
- Theme handling via `cookieStore`
- `<button is="app-list">` to show KRV Apps menu
- Add SVG icons via submodules (no that it's supported)
- Version bumping scripts via `npm run version:bump`

### Changed
- Move `<button is="pwa-install">` to `<nav>`
- Use `init()` to set listeners for all `data-*` handlers
- Misc. style changes

### Removed
- Git stored version of `icons.svg`

## [v1.0.7] - 2020-11-28

### Changed
- Use `_headers` for setting HTTP headers (including CSP)
- Add `/reset` page
- Implement preloading
- Add `<weather-current>`, `<spotify-player>`, `<youtube-player>`, & `<ad-block>` examples
- Misc. style changes
- Update service worker

### Fixed
- Add missing classes to properly style share button
- Update to match theme colors

### Removed
- Do not set (old) `data-service-worker` attribute

## [v1.0.6] - 2020-08-21

### Added
- Add `htmlhint` as dev dependency

### Removed
- Delete redundant CSS

### Changed
- Dynamically load Polyfill and Google Analytics scripts
- Update Super Linter config
- Check for config files before running linting scripts

### Fixed
- Remove duplicate attributes caught by `htmlhint`

## [v1.0.5] - 2020-07-17

### Updated
- eslint now indents on each `case` for a `switch`
- Set indent style & width in editor config file

## [v1.0.4] - 2020-07-07

### Updated
- eslint now indents on each `case` for a `switch

## [v1.0.3] - 2020-07-16

### Changed
- Update all dependencies
- Maintain consistency with [jekyll-template](https://github.com/shgysk8zer0/jekyll-template)
- Update `eslint` config / rules

## [v1.0.1] - 2020-06-19

### Updated
- Enable linting of config files
- Update dependencies
- Update service worker & config
- Bring other assets up-to-date

### Added
- Include Changelog
- Implement GitHub's Super Linter
- Add empty `/.well-known/` directory (with `.gitkeep` file)

### Changed
- Update all templates & config in `/.github/` directory

## [v1.0.0] - 2019-06-11

### Added
- Basic HTML, JS, CSS, & SVG icons
<!-- markdownlint-restore -->
