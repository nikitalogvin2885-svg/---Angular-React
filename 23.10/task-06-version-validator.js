/**
 * Задача 06: Валидатор версий в package.json
 * npm, SemVer, детерминизм сборки
 */

const fs = require('fs');
const path = require('path');

function validateDependencies(filePath = './package.json') {
  try {
    // Читаем package.json
    const absolutePath = path.resolve(filePath);
    const content = fs.readFileSync(absolutePath, 'utf-8');
    const packageJson = JSON.parse(content);

    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    // Объединяем все зависимости
    const allDependencies = { ...dependencies, ...devDependencies };

    if (Object.keys(allDependencies).length === 0) {
      console.log('No dependencies found.');
      return [];
    }

    // Ищем версии с диапазонами
    const problematicPackages = [];

    for (const [packageName, version] of Object.entries(allDependencies)) {
      // Пропускаем локальные ссылки (file:), npm:, git: и т.д.
      if (typeof version !== 'string') continue;
      if (version.startsWith('file:') || version.startsWith('npm:') || version.startsWith('git:')) {
        continue;
      }

      // Проверяем на префиксы ^ или ~
      if (version.startsWith('^') || version.startsWith('~')) {
        problematicPackages.push({
          package: packageName,
          version: version,
          message: `Range operator found: ${version}`,
        });
      }
    }

    // Выводим результаты
    if (problematicPackages.length > 0) {
      console.log('⚠️  Packages with loose version ranges:');
      console.log('─'.repeat(50));
      problematicPackages.forEach(({ package: pkg, version }) => {
        console.log(`  ${pkg.padEnd(40)} ${version}`);
      });
      console.log('─'.repeat(50));
      console.log(`Total: ${problematicPackages.length} package(s) with non-locked versions`);
    } else {
      console.log('✅ All dependencies have pinned versions (no ^ or ~ prefixes)');
    }

    return problematicPackages;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Error: package.json not found at ${filePath}`);
    } else if (error instanceof SyntaxError) {
      console.error(`Error: Invalid JSON in package.json - ${error.message}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
    return [];
  }
}

// Если запускаем напрямую
if (require.main === module) {
  validateDependencies();
}

module.exports = { validateDependencies };