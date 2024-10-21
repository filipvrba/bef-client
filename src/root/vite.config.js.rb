export default = {
  server: {
    proxy: {
      '/api': {
        target: 'https://bef-client.vercel.app',
        change_origin: true,
        rewrite: lambda {|path| path.replace(/^\/api/, '/api') },
      },
    },
  },
}