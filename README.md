# Lab-noSQL-injection
Lab: SQL injection attack, querying the database type and version on Mangodb

To run lab :
```bash
docker compose up
```

This lab is a fictitious e-commerce site. Only products with the attribute "visible" set to true are displayed. The purpose of this lab is to display invisible products.
You can access the website at:
http://127.0.0.1:3000

<details>
  <summary>Cliquer ici pour révéler la solution</summary>
  http://127.0.0.1:3000/search?query={%22name%22:{%22$regex%22:%22.*%22}}
</details>