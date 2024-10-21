export default {server: {proxy: {
  "/api": {
    target: "https://bef-client.vercel.app",
    changeOrigin: true,

    rewrite(path) {
      return path.replace(/^\/api/m, "/api")
    }
  }
}}}