import { init, WASI } from "@wasmer/wasi";

const editor = document.querySelector("textarea");

editor.addEventListener("change", (e) => {
  const value = e.target.value;
});

(async () => {
  const wasmFilePath =
    "https://github.com/wasmerio/wasmer-js/raw/main/tests/demo.wasm"; // Path to our WASI module
  const echoStr = "Hello World!"; // Text string to echo

  // This is needed to load the WASI library first (since is a Wasm module)
  await init();

  let wasi = new WASI({
    env: {
      // 'ENVVAR1': '1',
      // 'ENVVAR2': '2'
    },
    args: [
      // 'command', 'arg1', 'arg2'
    ]
  });

  const moduleBytes = fetch("https://deno.land/x/wasm/tests/demo.wasm");
  const module = await WebAssembly.compileStreaming(moduleBytes);
  // Instantiate the WASI module
  await wasi.instantiate(module, {});

  // Run the start function
  let exitCode = wasi.start();
  let stdout = wasi.getStdoutString();

  // This should print "hello world (exit code: 0)"
  console.log(`${stdout}(exit code: ${exitCode})`);
})();
