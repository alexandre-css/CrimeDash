const fs = require('fs');

// Ler o arquivo TypeScript
const content = fs.readFileSync('src/hooks/useLinks.ts', 'utf-8');

// Extrair todas as categorias
const categories = [];
const regex = /category:\s*"([^"]+)"/g;
let match;

while ((match = regex.exec(content)) !== null) {
    categories.push(match[1]);
}

// Categorias únicas
const uniqueCategories = [...new Set(categories)];

console.log('📊 ANÁLISE DE CATEGORIAS\n');
console.log('Total de links:', categories.length);
console.log('Categorias únicas:', uniqueCategories.length);
console.log('\n🏷️ CATEGORIAS ENCONTRADAS:\n');

uniqueCategories.forEach(cat => {
    const count = categories.filter(c => c === cat).length;
    console.log(`  • ${cat} (${count} links)`);
});

console.log('\n✅ Essas categorias deverão aparecer como seções na página principal!');
console.log('📝 Se não aparecem, verifique:');
console.log('   1. Recarregue a página com Ctrl+F5');
console.log('   2. Limpe o cache do navegador');
console.log('   3. Aguarde deploy do Vercel (~2 min)');
