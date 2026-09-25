# Aluma Salon — full project

This folder is the whole website. Open it as your main project folder.

    cd aluma-salon
    npm install
    npm run dev

Then open http://localhost:3000 (Home) and http://localhost:3000/about.

Needs Node.js 20 or newer.

## Where things live
- src/components/aluma/   the new Home and About sections
- src/styles/aluma.css    all their styles (mobile first)
- src/components/aluma/palette.ts   brand colours and the rotating palettes
- src/components/aluma/fx.ts        WhatsApp number and phone used by every Book button
- public/aluma/           the web-ready photos used by the new pages

## Not included
public/photos/ (the 244 MB original camera files) is left out to keep the download small.
The site doesn't use them; the compressed versions are in public/aluma/.
Copy that folder back in from your old project if you want to keep the originals here.
