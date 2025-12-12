const fs = require('fs');

const content = fs.readFileSync('src/hooks/useLinks.ts', 'utf-8');
const match = content.match(/const DEFAULT_LINKS:\s*LinkCard\[\]\s*=\s*(\[[\s\S]*?\n\];)/);

if (!match) {
    console.log('ERROR: No match found');
    process.exit(1);
}

let s = match[1];
console.log('1. Original length:', s.length);

s = s.replace(/\];$/, ']');
console.log('2. After removing ];');

s = s.replace(/([^:]|^)\/\/.*$/gm, '$1');
console.log('3. After removing // comments');

s = s.replace(/\/\*[\s\S]*?\*\//g, '');
console.log('4. After removing /* */ comments');

// PRIMEIRO normalizar aspas
s = s.replace(/[""]/g, '"');
console.log('5. After normalizing quotes');

// DEPOIS adicionar aspas nas chaves (apenas se tiver espaço antes)
s = s.replace(/(\s+)(\w+):/g, '$1"$2":');
console.log('6. After adding quotes to keys');

s = s.replace(/,(\s*[}\]])/g, '$1');
console.log('7. After removing trailing commas');

console.log('\nFirst 500 chars:');
console.log(s.substring(0, 500));

console.log('\nTrying JSON.parse...');
try {
    const links = JSON.parse(s);
    console.log('SUCCESS! Parsed', links.length, 'links');
} catch (error) {
    console.log('ERROR:', error.message);
    console.log('\nProblematic area (chars 100-200):');
    console.log(s.substring(100, 200));
}
