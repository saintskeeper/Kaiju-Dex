import Head from "next/head";

const Metadata = () => {
  return (
    <Head>
      <title>KaijuDex</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS Feed for Your Site's Title" />


      {/* Basic meta tags */}
      <meta
        name="description"
        content="Find the perfect match for your artistry or engineering skills with Kaiju-Dex: The ultimate platform for the KaijuKingz community."
      />

      {/* Open Graph meta tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://kaijudex.app"/>
      <meta property="og:title" content="KaijuDex" />
      <meta
        property="og:description"
        content="Find the perfect match for your artistry or engineering skills with Kaiju-Dex: The ultimate platform for the KaijuKingz community."
      />
      <meta
        property="og:image"
        content="https://kaijudex.app/kaijudex-varient-2.png"
      />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="KaijuDex" />
      <meta
        name="twitter:description"
        content="Find the perfect match for your artistry or engineering skills with Kaiju-Dex: The ultimate platform for the KaijuKingz community."
      />
      <meta
        name="twitter:image"
        content="https://kaijudex.app/kaijudex-varient-2.png"
      />
    </Head>
  );
};

export default Metadata;
