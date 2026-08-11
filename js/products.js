/** Каталог ароматов Charm Parfume */
const PRODUCTS = {
  'charm-no-5': {
    id: 'charm-no-5',
    name: 'Charm No. 5',
    category: 'classic',
    motive: 'По мотивам Chanel No. 5',
    notes: 'Иланг-иланг · Роза · Sandalwood',
    mood: 'Элегантность, уверенность',
    price: 'от 3 500 ₽',
    description: 'Иконическая композиция с цветочно-альдегидным сердцем. Идеальна для вечерних выходов и деловых встреч — звучит утончённо и запоминается.',
    volumes: ['30 мл — 3 500 ₽', '50 мл — 5 200 ₽', '100 мл — 8 900 ₽']
  },
  'bois-de-provence': {
    id: 'bois-de-provence',
    name: 'Bois de Provence',
    category: 'classic',
    motive: 'По мотивам Guerlain Shalimar',
    notes: 'Bergamot · Ваниль · Ладан',
    mood: 'Тепло, благородство',
    price: 'от 3 400 ₽',
    description: 'Восточно-цитрусовый аромат с бархатной ванилью и дымным ладаном. Согревает и создаёт ауру зрелой элегантности.',
    volumes: ['30 мл — 3 400 ₽', '50 мл — 5 000 ₽', '100 мл — 8 500 ₽']
  },
  'velvet-noir': {
    id: 'velvet-noir',
    name: 'Velvet Noir',
    category: 'selective',
    motive: 'По мотивам Tom Ford Black Orchid',
    notes: 'Чёрная орхидея · Пачули · Ваниль',
    mood: 'Загадочность, чувственность',
    price: 'от 3 800 ₽',
    description: 'Тёмный, бархатный аромат для смелых личностей. Чёрная орхидея и пачули создают интригующий шлейф.',
    volumes: ['30 мл — 3 800 ₽', '50 мл — 5 600 ₽', '100 мл — 9 400 ₽']
  },
  'encre-nocturne': {
    id: 'encre-nocturne',
    name: 'Encre Nocturne',
    category: 'selective',
    motive: 'По мотивам Serge Lutens La Fille de Berlin',
    notes: 'Роза · Пеппер · Patchouli',
    mood: 'Драма, интенсивность',
    price: 'от 4 100 ₽',
    description: 'Перечная роза с драматичным характером. Для тех, кто выбирает аромат как заявление, а не аксессуар.',
    volumes: ['30 мл — 4 100 ₽', '50 мл — 6 000 ₽', '100 мл — 10 200 ₽']
  },
  'lumiere-d-ete': {
    id: 'lumiere-d-ete',
    name: "Lumière d'Été",
    category: 'premium',
    motive: "По мотивам Dior J'adore",
    notes: 'Жасмин · Магнолия · Амбра',
    mood: 'Светлость, женственность',
    price: 'от 3 200 ₽',
    description: 'Сияющий цветочный букет с солнечным характером. Лёгкий, но стойкий — идеален для каждого дня.',
    volumes: ['30 мл — 3 200 ₽', '50 мл — 4 800 ₽', '100 мл — 8 200 ₽']
  },
  'or-imperial': {
    id: 'or-imperial',
    name: 'Or Impérial',
    category: 'premium',
    motive: 'По мотивам Clive Christian No. 1',
    notes: 'Шафран · Уд · Белый мускус',
    mood: 'Роскошь, величие',
    price: 'от 5 900 ₽',
    description: 'Эксклюзивная композиция высшей концентрации. Редкие ингредиенты и безупречное звучание на коже.',
    volumes: ['30 мл — 5 900 ₽', '50 мл — 8 500 ₽', '100 мл — 14 000 ₽']
  }
};

const CATEGORY_LABELS = {
  classic: 'Классика',
  selective: 'Селектив',
  premium: 'Премиум'
};
