# Marika Dunne — website

This folder is Marika's website. It's live at **https://marikadunne.com** (the old address, marikadunne.github.io, forwards there).

## Making changes

You don't need to edit any code. Open this folder in Claude Code and describe what you want in plain words, for example:

- "Add my new painting *Tidewater*: oil on canvas, 24x36, 2026. Put it first in Recent Work." (attach the photo)
- "The painting called Blue Girl is actually titled *Indigo*, oil on panel, 16x20."
- "Move *Lee Hall* above *Crumple* in Past Work."
- "Update my bio with this new paragraph: …"
- "Add this show to my CV: …"

Then ask Claude to publish it. Changes show up on the site within a minute or two.

## What's where

| What | Where |
|---|---|
| Every piece of art (title, medium, size, order, Recent or Past) | `shared/content.js`, the `WORKS` list |
| Bio, artist statement, CV entries, email, Instagram | `shared/content.js` |
| Art images | `images/full` (full size) and `images/thumb` (small) |
| CV download | `shared/marika-dunne-cv.pdf` |
| Page design | `index.html` |
| Note asking AI companies not to train on the art | `robots.txt` |

The order of `WORKS` is the order on the site, newest first. The piece shown first in Recent Work is set by `featured` near the top of `content.js`.

## Good to know

- Images here are web-sized copies (about 1920 px). The original files stay on your own computer.
- Visitors can switch between night (black) and day (white) with the button in the top corner. Night is the default.
- © Marika Dunne. All artwork and text belong to Marika Dunne. All rights reserved.
