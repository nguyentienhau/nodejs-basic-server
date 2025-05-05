const fs = require("fs");
const https = require("https");
require("./custom");
const env = require("./.env.json");
const _routes = require("./routes");

for (const key in env) {
	process.env[key] = env[key];
}

https
	.createServer(
		{
			key: fs.readFileSync("./server.key"),
			cert: fs.readFileSync("./server.cert")
		},
		function (request, response) {
			response.writeHead(200, { "content-type": "application/json" });
			response.write(JSON.stringify({ test: "test" }));
			response.end();
		}
	)
	.listen(5000);
