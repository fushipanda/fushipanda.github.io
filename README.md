# fushipanda.github.io

Personal portfolio and blog for Lewis Wood — AI Specialist.

**Live site:** <https://fushipanda.github.io/>

Built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). Deployed to GitHub Pages.

## Structure

```
docs/
  index.md            Home — bio, experience, projects, education
  blog/
    index.md          Blog landing — manual post index
    posts/            Individual posts
  assets/             Images and media
mkdocs.yml            Site config, theme, nav
```

## Local development

```bash
python -m venv venv
source venv/bin/activate
pip install mkdocs mkdocs-material
mkdocs serve
```

Site runs at <http://127.0.0.1:8000/>.

## Adding a blog post

1. Copy `docs/blog/posts/post-template.md` to `docs/blog/posts/your-slug.md`.
2. Link it from `docs/blog/index.md` under `## Posts` (newest first).

## Deployment

Push to `gh-pages` → auto-deploys via GitHub Actions.

## Development notes

All commits and pushes are made manually. Any AI assistance used for scaffolding does not commit to this repository.

## License

MIT
