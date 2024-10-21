export default = {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  # https://bef-client.vercel.app, http://localhost:3000
        change_origin: true,
        rewrite: lambda {|path| path.replace(/^\/api/, '/api') },
      },
    },
  },
}