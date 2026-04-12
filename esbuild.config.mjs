import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const sharedOptions = {
  bundle: true,
  format: 'esm',
  target: 'es2020',
  minify: !isWatch,
  sourcemap: isWatch ? 'inline' : false,
};

if (isWatch) {
  const ctx1 = await esbuild.context({ ...sharedOptions, entryPoints: ['src/person-card.ts'], outfile: 'dist/person-card.js' });
  const ctx2 = await esbuild.context({ ...sharedOptions, entryPoints: ['src/family-card.ts'], outfile: 'dist/family-card.js' });
  await Promise.all([ctx1.watch(), ctx2.watch()]);
  console.log('Watching for changes...');
} else {
  await Promise.all([
    esbuild.build({ ...sharedOptions, entryPoints: ['src/person-card.ts'], outfile: 'dist/person-card.js' }),
    esbuild.build({ ...sharedOptions, entryPoints: ['src/family-card.ts'], outfile: 'dist/family-card.js' }),
  ]);
  console.log('Build complete: dist/person-card.js + dist/family-card.js');
}
