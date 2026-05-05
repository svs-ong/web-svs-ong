# NextJS Internship Documentation for SVS Organization

## Online Access

Visit the deployed documentation at [web.svs.ong](http://web.svs.ong/) .

## Local Run

Run the following commands:
```bash
npm install 
npm start
```

## Deployment

Deploy updates via Firebase with:

```Copy code
firebase deploy
```

### Generate sitemap locally.

The sitemap should be also available at `https://web.svs.ong/sitemap.xml`

```
npx docsify-sitemap local -u https://web.svs.ong/ -b ./site -f ./site/sitemap.xml -i
```
