import Head from 'next/head'

export default function SEO({ title, description, image, url }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index, follow' />
      <meta
        name='keywords'
        content='mantenimiento, equipos, gestión de mantenimiento, software mantenimiento, monitoreo de equipos'
      />

      {/* Open Graph para redes sociales */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      {/* Favicon */}
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
