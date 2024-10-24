export default = {
  server: {
    proxy: {
      '/api': {
        target: 'https://bef-client.vercel.app',  # https://bef-client.vercel.app, http://localhost:3000
        change_origin: true,
        rewrite: lambda {|path| path.replace(/^\/api/, '/api') },
      },
    },
  },
}