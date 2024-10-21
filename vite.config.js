export default {server: {proxy: {
  "/api": {
    target: "http://localhost:3000",
    changeOrigin: true,

    rewrite(path) {
      return path.replace(/^\/api/m, "/api")
    }
  }
}}}