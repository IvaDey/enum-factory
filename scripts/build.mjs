import pkg from '../package.json' assert { type: 'json' };
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

pkg.devDependencies = {};
pkg.scripts = {};

const distPath = path.resolve(process.cwd(), 'dist');

if (fs.existsSync(distPath)) child_process.execSync('rm -r dist');

child_process.execSync('tsc --project tsconfig.build.json');
fs.writeFileSync(path.resolve(distPath, 'package.json'), JSON.stringify(pkg, null, 2));
