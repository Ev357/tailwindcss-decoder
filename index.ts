await Bun.build({
  entrypoints: ["./src/index.ts", "./src/background.ts"],
  outdir: "./out",
});
