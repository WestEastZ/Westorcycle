import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const sitemap = new SitemapStream({
  hostname: "https://d33ycy02npbsmv.cloudfront.net/",
});

const writeStream = createWriteStream("sitemap.xml");

sitemap.pipe(writeStream);

sitemap.write({ url: "/", changefreq: "daily", priority: 1 });
sitemap.write({ url: "/login", changefreq: "monthly", priority: 0.5 });
sitemap.write({ url: "/signup", changefreq: "monthly", priority: 0.5 });
sitemap.write({ url: "/category", changefreq: "weekly", priority: 0.8 });
sitemap.write({
  url: "/category/Motorcycle",
  changefreq: "weekly",
  priority: 0.8,
});
sitemap.write({ url: "/category/Helmet", changefreq: "weekly", priority: 0.8 });
sitemap.write({
  url: "/category/Clothes",
  changefreq: "weekly",
  priority: 0.8,
});
sitemap.write({ url: "/category/Gloves", changefreq: "weekly", priority: 0.8 });

streamToPromise(sitemap).then(() => console.log("Sitemap created!"));

sitemap.end();
