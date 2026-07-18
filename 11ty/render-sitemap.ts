type SitemapItem = {
  date: Date;
  url: string;
};

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        '"': "&quot;",
        "'": "&apos;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
      })[character]
  );

export const renderSitemap = (items: SitemapItem[], hostname: string) => {
  const urls = items
    .map((item) => {
      const location = escapeXml(new URL(item.url, hostname).toString());
      const lastModified = item.date.toISOString();

      return [
        "  <url>",
        `    <loc>${location}</loc>`,
        `    <lastmod>${lastModified}</lastmod>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    ""
  ].join("\n");
};
