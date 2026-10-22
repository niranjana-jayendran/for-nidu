# For Nidu ✦

A handmade, delft-blue digital scrapbook for Nidu's birthday, with love from AKKA.

**→ [niranjana-jayendran.github.io/for-nidu](https://niranjana-jayendran.github.io/for-nidu/)**

## What's inside

1. **You've Got Mail**: a wax-sealed envelope that flips, cracks open and unfolds the birthday letter.
2. **The Nidu Archives**: a polaroid collage. Hover over a photo (or tap it) to see it bigger.
3. **Open When…**: sealed letters for the days that need one.
4. **Remember When**: a memory jar. Pull one out to read it.
5. **A tiny quiz**: how well do you know us?

## How it's built

Plain HTML, CSS and JavaScript. No build step, no backend, no dependencies apart from Google Fonts.
All the illustrations (butterflies, hydrangeas, wax seals, stamps, doodles) are drawn in code as SVG.

```
index.html        page structure
css/style.css     all styling and animation
js/config.js      ALL the content: letters, photos, captions, memories, quiz
js/art.js         procedural SVG illustrations and paper textures
js/main.js        builds each section from the config
photos/           full-size photos (1600px)
photos/thumb/     collage thumbnails (720px)
```

Photos have had all metadata stripped (including location) before upload.

## Editing

Everything you'd want to change lives in **`js/config.js`**:

- **Photos**: add a JPG to `photos/` and `photos/thumb/`, then add an entry with `src`, `thumb`,
  `date`, `caption`, plus `wide: true` if it's landscape.
- **Open-when letters**: each one has `when`, `tone` (envelope colour), `seal` (wax-seal emblem) and `paper`.
- **Memory jar**: each memory has `text` and `art` (a doodle: `leaves`, `snow`, `car`, `bike`, `fort`).
- **Quiz**: `answer` is the 0-based index of the right option. For typed questions, `accept` lists other
  spellings to count as correct. Set `quiz.enabled: false` to hide it.

## Run it locally

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Publishing

Served by GitHub Pages from the `main` branch root, so every push to `main` goes live in about a minute.

Tip: the site remembers which letters have been opened. To see the first-visit envelope again,
open it in a private window.
