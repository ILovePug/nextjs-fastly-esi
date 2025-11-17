export default function Home() {
  // The template delivered from origin includes ESI tags when requested via Varnish.
  // For local dev when you hit 3000 directly, this will simply render without ESI.
  // For hitting Varnish (http://localhost:8080), Varnish will fetch from origin and
  // parse/replace the ESI includes.

  return (
    <>
      <header
        dangerouslySetInnerHTML={{
          __html: `
            <esi:include src="/api/user-profile" />
            <esi:include src="/api/cart-summary" />
          `,
        }}
      />
      <main>
        <h1>Home — template with ESI</h1>
        <p>
          This content is the main page. The header is personalized via ESI
          fragments.
        </p>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  return { props: {} };
}
