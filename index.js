// Підключення необхідних модулів
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Налаштування командного рядка з використанням Commander.js
program
  .requiredOption('-i, --input <path>', 'Шлях до вхідного JSON файлу')  // обов'язковий параметр
  .option('-o, --output <path>', 'Шлях до вихідного файлу для запису результату')  // необов'язковий параметр
  .option('-d, --display', 'Вивести результат у консоль')  // необов'язковий параметр
  .parse(process.argv);  // Парсинг аргументів

// Отримання значень опцій
const options = program.opts();

// Перевірка наявності вхідного файлу
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);  // Завершення програми з помилкою
}

// Читання вхідного JSON файлу
const inputFilePath = path.resolve(options.input);
let data;

try {
  const rawData = fs.readFileSync(inputFilePath, 'utf-8');
  data = JSON.parse(rawData);
} catch (error) {
  console.error('Помилка під час читання або парсингу JSON файлу:', error);
  process.exit(1);
}

// Якщо задано параметр --output, записуємо результат у файл
if (options.output) {
  const outputFilePath = path.resolve(options.output);
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Результат записано у файл: ${outputFilePath}`);
}

// Якщо задано параметр --display, виводимо результат у консоль
if (options.display) {
  console.log(JSON.stringify(data, null, 2));
}

// Якщо не задано ні --output, ні --display, програма не повинна нічого виводити
if (!options.output && !options.display) {
  process.exit(0);  // Завершуємо програму без виведення
}
