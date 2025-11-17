# NextJS Internship Documentation for SVS Organization

## Online Access

Visit the deployed documentation at [web.svs.ong](http://web.svs.ong/) .

## Local Run

Install Docsify if not already installed (`npm install -g docsify-cli`) and run:

```bash
docsify serve ./site
```

## Deployment

Deploy updates via Firebase with:

```Copy code
firebase deploy
```

### Generate sitemap locally.

The sitemap should be also available at `https://web.svs.ong/sitemap.xml`

```
npx docsify-sitemap local -u https://web.svs.ong/ -f ./site/sitemap.xml
```
