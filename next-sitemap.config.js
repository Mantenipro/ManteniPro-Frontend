module.exports = {
  siteUrl: 'https://www.mantenipro.net', // Tu dominio principal
  generateRobotsTxt: true, // Genera robots.txt automáticamente
  sitemapSize: 5000, // Maneja hasta 5000 URLs por archivo
  exclude: ['/admin', '/api/*'] // Excluye rutas privadas o de API
}
