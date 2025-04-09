import Head from 'next/head'

export default function SEORegister() {
  const title = 'Crear cuenta - Mantenipro'
  const description =
    'Regístrate en Mantenipro y empieza a gestionar el mantenimiento de tus equipos de manera eficiente. Control total sobre tus activos y tareas.'
  const image = 'https://www.mantenipro.net/images/registro-og.jpg'
  const url = 'https://www.mantenipro.net/registro'

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index, follow' />
      <meta
        name='keywords'
        content='registro mantenimiento, crear cuenta Mantenipro, registro software mantenimiento, gestión de equipos, gestión de activos'
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
