#!/usr/bin/env node
const nodeModule = require("node:module");

// enable on-disk code caching of all modules loaded by Node.js
// requires Nodejs >= 22.8.0
const { enableCompileCache } = nodeModule;
if (enableCompileCache) {
	try {
		enableCompileCache();
	} catch {
		// ignore errors
	}
}

// make it easier to identify the process via activity monitor or other tools
process.title = "rspack-build-web";

const { RspackCLI, rspackPluginWeb } = require("../dist/index");

async function runCLI() {
	const cli = new RspackCLI();
	cli.formatConfig = await rspackPluginWeb;
	await cli.run(process.argv);
}

runCLI();
