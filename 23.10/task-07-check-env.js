/**
 * Задача 07: Скрипт проверки окружения перед сборкой
 * Node.js CLI, системные переменные
 */

function checkEnvironment() {
  const currentVersion = process.version;
  const majorVersion = parseInt(currentVersion.slice(1).split('.')[0], 10);

  const MIN_MAJOR_VERSION = 18;

  console.log(`🔍 Node.js version check:`);
  console.log(`   Current version: ${currentVersion}`);
  console.log(`   Required minimum: ${MIN_MAJOR_VERSION}.0.0`);

  if (majorVersion < MIN_MAJOR_VERSION) {
    console.error(`❌ Error: Node.js ${currentVersion} is too old.`);
    console.error(`   Please upgrade to Node.js ${MIN_MAJOR_VERSION} or higher.`);
    console.error(`   Visit: https://nodejs.org/`);

    process.exit(1);
  }

  console.log(`✅ Node.js version is compatible.`);
  console.log(`   Build can proceed.`);
}

// Запускаем проверку
checkEnvironment();