// Данные форматных страниц. Один источник правды для всех 9 страниц.
// Каждая страница = объект здесь + тонкий HTML в /formats/<slug>.html

const FORMATS_DATA = [
  {
    slug: 'gastroboxes',
    name: 'Гастробоксы',
    nameAcc: 'гастробоксы',          // "Кейтеринг на ___ в Казани"
    nameForYour: 'ваших гастробоксов', // "...для ___..."
    heroTitle: (<>Гастробоксы<br/><em className="accent-italic">с доставкой</em><br/>в Казани</>),
    photo: ASSET('/images/gastrobox.jpg'),
    metaTitle: 'Кейтеринг гастробоксами в Казани — Gastronom Catering',
    metaDescription: 'Гастробоксы с доставкой в Казани. Подберем меню, подачу и формат обслуживания под ваше мероприятие.',
  },
  {
    slug: 'furshet',
    name: 'Фуршет',
    nameAcc: 'фуршет',
    nameForYour: 'вашего фуршета',
    photo: ASSET('/images/optimized/s2-1200.jpg'),
    metaTitle: 'Кейтеринг на фуршет в Казани — Gastronom Catering',
    metaDescription: 'Фуршетное обслуживание в Казани. Канапе, закуски, бар — подбираем меню и подачу под ваше мероприятие.',
  },
  {
    slug: 'banket',
    name: 'Банкет',
    nameAcc: 'банкет',
    nameForYour: 'вашего банкета',
    photo: ASSET('/images/optimized/s3-1200.jpg'),
    metaTitle: 'Кейтеринг на банкет в Казани — Gastronom Catering',
    metaDescription: 'Банкетное обслуживание в Казани. Сервировка, меню, официанты — полный формат под ключ.',
  },
  {
    slug: 'detskiy-prazdnik',
    name: 'Детский праздник',
    nameAcc: 'детский праздник',
    nameForYour: 'вашего детского праздника',
    photo: ASSET('/images/detskiy.jpg'),
    metaTitle: 'Кейтеринг на детский праздник в Казани — Gastronom Catering',
    metaDescription: 'Детские праздники в Казани: меню для детей и взрослых, яркая подача, безопасные ингредиенты.',
  },
  {
    slug: 'svadba',
    name: 'Свадьба',
    nameAcc: 'свадьбу',
    nameForYour: 'вашей свадьбы',
    photo: ASSET('/images/svadba.jpg'),
    metaTitle: 'Свадебный кейтеринг в Казани — Gastronom Catering',
    metaDescription: 'Организация кейтеринга на свадьбу в Казани. Под ключ: меню, сервировка, обслуживание гостей.',
  },
  {
    slug: 'korporativ',
    name: 'Корпоратив',
    nameAcc: 'корпоратив',
    nameForYour: 'вашего корпоратива',
    photo: ASSET('/images/optimized/s6-1200.jpg'),
    metaTitle: 'Кейтеринг на корпоратив в Казани — Gastronom Catering',
    metaDescription: 'Корпоративные мероприятия в Казани. Офисный кейтеринг, фуршеты, банкеты — под задачу компании.',
  },
  {
    slug: 'vypusknoy',
    name: 'Выпускной',
    nameAcc: 'выпускной',
    nameForYour: 'вашего выпускного',
    photo: ASSET('/images/optimized/s7-1200.jpg'),
    metaTitle: 'Кейтеринг на выпускной в Казани — Gastronom Catering',
    metaDescription: 'Выпускные вечера в Казани: меню, подача и обслуживание под формат школы или вуза.',
  },
  {
    slug: 'den-rozhdeniya',
    name: 'День рождения',
    nameAcc: 'день рождения',
    nameForYour: 'вашего дня рождения',
    photo: ASSET('/images/birthday.jpg'),
    metaTitle: 'Кейтеринг на день рождения в Казани — Gastronom Catering',
    metaDescription: 'День рождения в Казани: подберём меню и формат под количество гостей и площадку.',
  },
  {
    slug: 'devichnik-malchishnik',
    name: 'Девичник / Мальчишник',
    nameAcc: 'девичник или мальчишник',
    nameForYour: 'вашего девичника или мальчишника',
    photo: ASSET('/images/devichnik.jpg'),
    metaTitle: 'Кейтеринг на девичник и мальчишник в Казани — Gastronom Catering',
    metaDescription: 'Девичник и мальчишник в Казани: лёгкие закуски, бар, удобная подача под любую площадку.',
  },
];

Object.assign(window, { FORMATS_DATA });
