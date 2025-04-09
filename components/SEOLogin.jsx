import Head from 'next/head'

export default function SEOLogin() {
  const title = 'Iniciar sesión - Mantenipro'
  const description =
    'Accede a tu cuenta en Mantenipro para gestionar y monitorear el mantenimiento de tus equipos de forma sencilla y eficiente.'
  const image = 'https://www.mantenipro.net/images/login-og.jpg'
  const url = 'https://www.mantenipro.net/login'

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content='index, follow' />
      <meta
        name='keywords'
        content='iniciar sesión mantenimiento, acceso sistema mantenimiento, login Mantenipro, gestión de equipos, mantenimiento industrial'
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
