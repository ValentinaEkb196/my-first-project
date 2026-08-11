# Charm Parfume

Лендинг аромастилиста **Charm Parfume** — авторские композиции по мотивам мировых шедевров с индивидуальным подбором.

## Структура проекта

```
charm-parfume-site/
├── index.html
├── css/
│   ├── main.css        # Основные стили лендинга
│   └── extras.css      # Модалка, квиз, мобильное меню
├── js/
│   ├── products.js     # Данные каталога
│   └── main.js         # Интерактивность
├── assets/images/      # Папка для изображений
├── package.json
└── README.md
```

## Быстрый старт

Откройте `index.html` в браузере или запустите локальный сервер:

```bash
npm start
```

## Подключение стилей

В `index.html` стили подключаются относительными путями:

```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/extras.css">
```

Скрипты темы в `<head>` оставлены inline — они должны выполниться до первой отрисовки страницы.
