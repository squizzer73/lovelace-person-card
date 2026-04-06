import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const options = {
  entryPoints: ['src/person-card.ts'],
  bundle: true,
  outfile: 'dist/person-card.js',
  format: 'esm',
  target: 'es2020',
  minify: !isWatch,
  sourcemap: isWatch ? 'inline' : false,
};

if (isWatch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(options);
  console.log('Build complete: dist/person-card.js');
}
