// Підключення необхідних модулів
const fs = require('fs');
const path = require('path');

// Шлях до файлу з курсами валют
const inputFilePath = path.resolve('data.json');

// Перевірка наявності вхідного файлу
if (!fs.existsSync(inputFilePath)) {
  console.error("Cannot find input file");
  process.exit(1);  // Завершення програми з помилкою
}

// Читання вхідного JSON файлу
let data;

try {
  const rawData = fs.readFileSync(inputFilePath, 'utf-8');
  data = JSON.parse(rawData);
} catch (error) {
  console.error('Помилка під час читання або парсингу JSON файлу:', error);
  process.exit(1);
}

// Перевірка наявності поля "currencies" у даних
if (!Array.isArray(data)) {
  console.error('Невірний формат даних: очікується масив курсів валют.');
  process.exit(1);
}

// Форматування результатів у форматі <дата>:<курс>
const formattedResults = data
  .map(currency => `${currency.exchangedate}:${currency.rate}`)
  .join('\n');

// Записуємо результат у файл exchange_rate.txt
const outputFilePath = path.resolve('exchange_rate.txt');

try {
  fs.writeFileSync(outputFilePath, formattedResults, 'utf-8');
  console.log(`Результат записано у файл: ${outputFilePath}`);
} catch (error) {
  console.error('Помилка під час запису у файл:', error);
  process.exit(1);
}
