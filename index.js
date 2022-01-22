const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // File Path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // File Extention
  let fileExt = path.extname(filePath);

  // Initial Content-Type
  let contentType = "text/html";

  // Set Content-Type Based on File Extention
  switch (fileExt) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
  }

  // Read Files
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page Not Found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data, "utf8");
        });
      } else {
        // Other Errors
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
