import { Helmet } from "react-helmet-async";

interface SEOHelmetProps {
  title: string;
  description: string;
  imageUrl?: string;
  pageUrl?: string;
}

export default function SEOHelmet({
  title,
  description,
  imageUrl,
  pageUrl,
}: SEOHelmetProps) {
  return (
    <Helmet>
      <meta charSet="utf-8"></meta>
      <title>{title} | WESTORCYCLE</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index,nofollow"></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
    </Helmet>
  );
}
