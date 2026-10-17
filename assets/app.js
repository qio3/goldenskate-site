/* GoldenSkate — shared behaviour for all three landing variants.
   i18n (TR default, auto from browser), stories viewer, WhatsApp form, map, reveals. */
(function () {
  'use strict';

  var WA_NUMBER = '905335183201';
  var IG_URL = 'https://www.instagram.com/goldenskate.samsun/';
  var RINK = { lat: 41.3193252, lng: 36.3325103 };
  var LANGS = ['tr', 'ru', 'en'];

  var T = {
    tr: {
      'meta.title': 'GoldenSkate Samsun — Rus ekolü artistik buz pateni okulu',
      'meta.desc': 'Samsun’da çocuklar için artistik buz pateni. Rusya’dan antrenörler, buz + bale + kara antrenmanı tek programda. Ücretsiz deneme dersi.',
      'nav.method': 'Okul', 'nav.coaches': 'Antrenörler', 'nav.results': 'Başarılar', 'nav.stories': 'Videolar',
      'nav.pricing': 'Gruplar', 'nav.contact': 'İletişim', 'nav.menu': 'Menü',
      'cta.trial': 'Ücretsiz deneme dersi', 'cta.wa': 'WhatsApp’tan yazın', 'cta.ig': 'Instagram',
      'hero.eyebrow': 'Samsun · Rus ekolü artistik patinaj okulu',
      'hero.title': 'Buzda ilk adımdan<br>ilk aksele.',
      'hero.sub': 'Rusya’dan gelen antrenörler, 3 yaşından itibaren çocuklar için buz, bale ve kara antrenmanını tek programda birleştiriyor.',
      'hero.f1': 'Ekim 2025’ten beri Samsun’da', 'hero.f2': '3 yaşından itibaren', 'hero.f3': 'Rusya’dan antrenörler',
      'hero.scroll': 'Aşağı kaydırın',

      'method.eyebrow': 'Rus ekolü', 'method.title': 'Güzel kayış, sağlam temelden başlar.',
      'method.lead': 'Samsun’daki ilk ve tek Rus ekolü artistik patinaj kulübüyüz. Atlayışlardan önce kenar, duruş ve koordinasyon üzerinde çalışıyoruz — hızlı sonuç değil, kalıcı teknik.',
      'method.ice.t': 'Buz', 'method.ice.d': 'Kayış tekniği, kenarlar, dönüşler ve atlayışlar. Her sporcunun hataları tek tek ele alınır.',
      'method.ballet.t': 'Bale ve koreografi', 'method.ballet.d': 'Doğru duruş, esneklik ve müzikalite. Program, sadece elementlerden değil hareketin güzelliğinden oluşur.',
      'method.off.t': 'Kara antrenmanı', 'method.off.d': 'Güç, patlayıcılık ve koordinasyon. Her atlayış önce salonda öğrenilir, sonra buza taşınır.',
      'method.one': 'Üçü de tek kulüpte, tek kayıtla.',
      'founder.label': 'Kurucu', 'founder.text': 'GoldenSkate, Moskova bölgesindeki “Golden Star” okullar ağının Samsun şubesidir. Ağda 15’ten fazla uzman antrenör çalışıyor; en iyileri Samsun’da.',

      'coaches.eyebrow': 'Antrenörler', 'coaches.title': 'Rus ekolünü Samsun’a getiren ekip.',
      'coaches.lead': 'Antrenörlerimiz Rusya’da yetişti ve orada sporcu yetiştirdi. Derslerde aynı sistemle çalışıyoruz: temel, düzen, her gün küçük bir adım.',
      'coach.from': 'Rusya',
      'coach.daniil.rank': 'Spor Ustası', 'coach.daniil.role': 'Kara antrenmanı ve fiziksel gelişim',
      'coach.daniil.bio': 'Sporcuların fiziksel hazırlığından sorumlu: koordinasyon, dayanıklılık ve atlayışlar için patlayıcı güç.',
      'coach.alina.rank': 'Spor Ustası Adayı', 'coach.alina.role': 'Buz tekniği ve kayış',
      'coach.alina.bio': '5 yılı aşkın antrenörlük deneyimi. Tekniği küçük yaşlardan resmi spor derecelerine kadar kuruyor.',
      'coach.olga.rank': 'Kurucu · baş antrenör', 'coach.olga.role': 'Program ve koreografi',
      'coach.olga.bio': 'Moskova ve Moskova bölgesinde on yılı aşkın antrenörlük. “Golden Star” okullar ağının kurucusu.',

      'results.eyebrow': 'Başarılar', 'results.title': 'İlk sezonun sonuçları.',
      'results.lead': 'Kulüp Ekim 2025’te açıldı. Bir yılda öğrencilerimiz Türkiye ve Rusya’da yarıştı, federasyon testlerini geçti ve ilk zor atlayışlarını yaptı.',
      'results.h.place': 'Derece', 'results.h.event': 'Yarışma / test', 'results.h.athlete': 'Sporcu', 'results.h.date': 'Tarih',
      'r1.event': '“Golden Star” turnuvası · Rusya', 'r1.place': '2.',
      'r2.event': 'Ümitler Türkiye Şampiyonası · Ankara', 'r2.place': 'Finalist', 'r2.note': 'Samsun’u temsil etti',
      'r3.event': 'Artistik Patinaj İl Birinciliği · Samsun', 'r3.place': '1.',
      'r4.event': 'İzmir Kupası · İzmir', 'r4.place': '3.',
      'r5.event': 'Sportoto Kupası · Ankara', 'r5.place': '2.',
      'r6.event': 'Federasyon testi Basic Novice 2 · Ankara', 'r6.place': 'Geçti', 'r6.note': 'ilk denemede',
      'r7.event': 'Federasyon testi Cubs · Ankara', 'r7.place': 'Geçti',
      'm.title': 'Bu sezon yapılan ilk atlayışlar', 'm.axel': 'Aksel', 'm.2s': 'Çift salchow', 'm.2a': 'Çift aksel',
      'm.note': 'Feyza, akseli okulumuzdaki 5. ayında yaptı.',

      'stories.eyebrow': 'Buzdan', 'stories.title': 'Antrenmanlardan kareler.',
      'stories.lead': 'Instagram’da her hafta yeni video. İzlemek için bir karta dokunun.',
      'stories.open': 'Instagram’da aç', 'stories.sound': 'Ses', 'stories.close': 'Kapat', 'stories.prev': 'Önceki', 'stories.next': 'Sonraki',
      's.club': 'Kulübümüz', 's.discipline': 'Disiplin', 's.work': 'Emek', 's.axel': 'İlk aksel', 's.edge': 'Her kenar',
      's.off': 'Kara antrenmanı', 's.izmir': 'İzmir', 's.gstar': 'Golden Star', 's.spiral': 'Spiraller', 's.camp': 'Rusya kampı',

      'pricing.eyebrow': 'Gruplar ve ücretler', 'pricing.title': 'İki grup, tek sistem.',
      'pricing.lead': 'Çocuğunuzun seviyesini ilk derste birlikte belirleriz. Deneme dersi ücretsizdir.',
      'p1.name': 'Başlangıç', 'p1.who': 'Buzla yeni tanışanlar · 3–10 yaş',
      'p1.price': '4 500 ₺', 'p1.per': '/ ay',
      'p1.i1': 'Haftada 2 buz antrenmanı', 'p1.i2': 'Haftada 1 bale ve kara antrenmanı', 'p1.i3': 'Düşmeden kalkma, denge, ilk kayış', 'p1.i4': 'Küçük gruplar',
      'p2.name': 'Sportif', 'p2.who': 'Test ve yarışmalara hazırlık',
      'p2.price': '8 500 ₺', 'p2.per': '/ ay',
      'p2.i1': 'Haftada 4–5 buz antrenmanı', 'p2.i2': 'Kara antrenmanı, bale ve koreografi', 'p2.i3': 'Federasyon testleri ve yarışma programı', 'p2.i4': 'Rusya ve Türkiye kampları',
      'pricing.choose': 'Bu gruba yazılın', 'pricing.note': 'Bireysel dersler için fiyatı WhatsApp’tan sorun.',
      'pricing.badge': 'Sporcular için',

      'camps.eyebrow': 'Kamplar ve misafirler', 'camps.title': 'Sezon sadece salonda geçmiyor.',
      'camp1.t': 'Samsun yaz kampı', 'camp1.d': '11 antrenman günü: her gün 2 saat buz ve 2 saat kara antrenmanı, 3 profesyonel antrenörle.',
      'camp2.t': 'Rusya kampı · Lytkarino', 'camp2.d': 'Ağustosta Moskova bölgesinde iki haftalık buz kampı ve Rus sporcularla ortak antrenman.',
      'camp3.t': 'Misafir antrenörler', 'camp3.d': 'Artemiy Buzhor ve Arina Beskova Samsun’da ustalık dersleri verdi.',
      'camps.next': 'Yaz 2027 kampı için ön kayıt açık.',

      'place.eyebrow': 'Nerede', 'place.title': 'Samsun Buz Sporları Salonu, İlkadım.',
      'place.club': 'Samsun Buz Okulu Spor Kulübü bünyesinde', 'place.addr': 'Buz Sporları Salonu, İlkadım / Samsun',
      'place.route': 'Yol tarifi al', 'place.hours': 'Antrenman saatleri gruba göre belirlenir',

      'contact.eyebrow': 'Kayıt', 'contact.title': 'Deneme dersine yazılın.',
      'contact.lead': 'Formu doldurun — mesaj WhatsApp’ta hazır olarak açılır. Genellikle aynı gün dönüyoruz.',
      'form.name': 'Veli adı', 'form.phone': 'Telefon', 'form.age': 'Çocuğun yaşı', 'form.group': 'Grup',
      'form.g.beg': 'Başlangıç', 'form.g.pro': 'Sportif', 'form.g.unsure': 'Emin değilim',
      'form.msg': 'Not (isteğe bağlı)', 'form.submit': 'WhatsApp’ta gönder',
      'form.err.name': 'Adınızı yazın.', 'form.err.phone': 'Size ulaşabileceğimiz bir numara yazın.',
      'form.wa.hello': 'Merhaba! Deneme dersine kaydolmak istiyorum.', 'form.wa.name': 'Veli', 'form.wa.phone': 'Telefon',
      'form.wa.age': 'Çocuğun yaşı', 'form.wa.group': 'Grup', 'form.wa.note': 'Not',
      'contact.or': 'veya doğrudan',

      'footer.rights': '© 2026 GoldenSkate Samsun · Artistik buz pateni okulu', 'footer.net': '“Golden Star” okullar ağının bir parçası',
      'lv.eyebrow': 'Program', 'lv.title': 'Seviye seviye, element element.',
      'lv.lead': 'Rus ekolünde her element bir öncekinin üzerine kurulur. Çocuğunuz hangi basamakta olduğunu her zaman bilir.',
      'lv1.n': 'Başlangıç', 'lv1.d': 'Kayış, durma, kenarlar, ilk tek atlayışlar ve dik dönüş.',
      'lv2.n': 'Temel', 'lv2.d': 'Tüm tek atlayışlar, aksel, dönüş pozisyonları; federasyon testleri.',
      'lv3.n': 'Sportif', 'lv3.d': 'Çift atlayışlar, kombine dönüşler, yarışma programı.',
      'lbl.rank': 'Unvan', 'lbl.role': 'Uzmanlık', 'lbl.country': 'Ülke', 'lbl.season': '2025–26 sezonu',
      'lbl.live': 'Antrenman', 'lbl.elements': 'Bu sezon öğrendiğimiz elementler',
      'lang.label': 'Dil'
    },

    ru: {
      'meta.title': 'GoldenSkate Самсун — школа фигурного катания русской школы',
      'meta.desc': 'Фигурное катание для детей в Самсуне. Тренеры из России, лёд + хореография + ОФП в одной программе. Бесплатное пробное занятие.',
      'nav.method': 'Школа', 'nav.coaches': 'Тренеры', 'nav.results': 'Результаты', 'nav.stories': 'Видео',
      'nav.pricing': 'Группы', 'nav.contact': 'Контакты', 'nav.menu': 'Меню',
      'cta.trial': 'Бесплатное пробное занятие', 'cta.wa': 'Написать в WhatsApp', 'cta.ig': 'Instagram',
      'hero.eyebrow': 'Самсун · фигурное катание русской школы',
      'hero.title': 'От первого шага на льду<br>до первого акселя.',
      'hero.sub': 'Тренеры из России соединяют лёд, хореографию и ОФП в одну программу для детей от 3 лет.',
      'hero.f1': 'В Самсуне с октября 2025', 'hero.f2': 'С 3 лет', 'hero.f3': 'Тренеры из России',
      'hero.scroll': 'Листайте вниз',

      'method.eyebrow': 'Русская школа', 'method.title': 'Красивое катание начинается с базы.',
      'method.lead': 'Мы — первый и единственный клуб русской школы фигурного катания в Самсуне. До прыжков ставим рёбра, осанку и координацию: не быстрый результат, а техника, которая остаётся.',
      'method.ice.t': 'Лёд', 'method.ice.d': 'Скольжение, рёбра, вращения и прыжки. Ошибки каждого спортсмена разбираем индивидуально.',
      'method.ballet.t': 'Хореография', 'method.ballet.d': 'Осанка, растяжка и музыкальность. Программа — это не только элементы, но и красота движения.',
      'method.off.t': 'ОФП', 'method.off.d': 'Сила, взрывная мощь и координация. Каждый прыжок сначала осваиваем в зале, потом переносим на лёд.',
      'method.one': 'Всё в одном клубе, по одному абонементу.',
      'founder.label': 'Основатель', 'founder.text': 'GoldenSkate — самсунский филиал сети школ «Golden Star» из Подмосковья. В сети работают больше 15 тренеров; лучшие — в Самсуне.',

      'coaches.eyebrow': 'Тренеры', 'coaches.title': 'Команда, которая привезла русскую школу в Самсун.',
      'coaches.lead': 'Наши тренеры выросли в российском фигурном катании и готовили там спортсменов. На занятиях — та же система: база, порядок, каждый день маленький шаг.',
      'coach.from': 'Россия',
      'coach.daniil.rank': 'Мастер спорта', 'coach.daniil.role': 'ОФП и физическое развитие',
      'coach.daniil.bio': 'Отвечает за физическую подготовку: координация, выносливость и взрывная сила для прыжков.',
      'coach.alina.rank': 'Кандидат в мастера спорта', 'coach.alina.role': 'Техника катания',
      'coach.alina.bio': 'Тренирует больше 5 лет. Ставит технику с самого юного возраста до официальных спортивных разрядов.',
      'coach.olga.rank': 'Основатель · старший тренер', 'coach.olga.role': 'Программы и хореография',
      'coach.olga.bio': 'Больше десяти лет тренерской работы в Москве и Подмосковье. Основатель сети школ «Golden Star».',

      'results.eyebrow': 'Результаты', 'results.title': 'Итоги первого сезона.',
      'results.lead': 'Клуб открылся в октябре 2025. За год наши ученики выступили в Турции и России, сдали тесты федерации и сделали первые сложные прыжки.',
      'results.h.place': 'Место', 'results.h.event': 'Соревнование / тест', 'results.h.athlete': 'Спортсмен', 'results.h.date': 'Дата',
      'r1.event': 'Турнир «Golden Star» · Россия', 'r1.place': '2',
      'r2.event': 'Первенство Турции среди юниоров (Ümitler) · Анкара', 'r2.place': 'Финал', 'r2.note': 'представляла Самсун',
      'r3.event': 'Первенство провинции Самсун', 'r3.place': '1',
      'r4.event': 'Кубок Измира · Измир', 'r4.place': '3',
      'r5.event': 'Кубок Sportoto · Анкара', 'r5.place': '2',
      'r6.event': 'Тест федерации Basic Novice 2 · Анкара', 'r6.place': 'Сдан', 'r6.note': 'с первой попытки',
      'r7.event': 'Тест федерации Cubs · Анкара', 'r7.place': 'Сдан',
      'm.title': 'Первые прыжки этого сезона', 'm.axel': 'Аксель', 'm.2s': 'Двойной сальхов', 'm.2a': 'Двойной аксель',
      'm.note': 'Фейза прыгнула аксель на 5-м месяце занятий в школе.',

      'stories.eyebrow': 'Со льда', 'stories.title': 'Кадры с тренировок.',
      'stories.lead': 'Новые видео в Instagram каждую неделю. Нажмите на карточку, чтобы посмотреть.',
      'stories.open': 'Открыть в Instagram', 'stories.sound': 'Звук', 'stories.close': 'Закрыть', 'stories.prev': 'Назад', 'stories.next': 'Далее',
      's.club': 'О клубе', 's.discipline': 'Дисциплина', 's.work': 'Труд', 's.axel': 'Первый аксель', 's.edge': 'Каждое ребро',
      's.off': 'ОФП', 's.izmir': 'Измир', 's.gstar': 'Golden Star', 's.spiral': 'Спирали', 's.camp': 'Сборы в России',

      'pricing.eyebrow': 'Группы и стоимость', 'pricing.title': 'Две группы, одна система.',
      'pricing.lead': 'Уровень ребёнка определим вместе на первом занятии. Пробное занятие — бесплатно.',
      'p1.name': 'Начинающие', 'p1.who': 'Впервые на льду · 3–10 лет',
      'p1.price': '4 500 ₺', 'p1.per': '/ мес',
      'p1.i1': '2 тренировки на льду в неделю', 'p1.i2': '1 хореография и ОФП в неделю', 'p1.i3': 'Равновесие, падать и вставать, первое скольжение', 'p1.i4': 'Небольшие группы',
      'p2.name': 'Спортивная', 'p2.who': 'Подготовка к тестам и соревнованиям',
      'p2.price': '8 500 ₺', 'p2.per': '/ мес',
      'p2.i1': '4–5 тренировок на льду в неделю', 'p2.i2': 'ОФП, хореография и постановка', 'p2.i3': 'Тесты федерации и соревновательная программа', 'p2.i4': 'Сборы в России и Турции',
      'pricing.choose': 'Записаться в группу', 'pricing.note': 'Стоимость индивидуальных занятий уточняйте в WhatsApp.',
      'pricing.badge': 'Для спортсменов',

      'camps.eyebrow': 'Сборы и гости', 'camps.title': 'Сезон — это не только каток.',
      'camp1.t': 'Летние сборы в Самсуне', 'camp1.d': '11 тренировочных дней: каждый день 2 часа льда и 2 часа ОФП с тремя тренерами.',
      'camp2.t': 'Сборы в России · Лыткарино', 'camp2.d': 'Две недели льда в Подмосковье в августе и совместные тренировки с российскими спортсменами.',
      'camp3.t': 'Приглашённые тренеры', 'camp3.d': 'В Самсуне проводили мастер-классы Артемий Бужор и Арина Бескова.',
      'camps.next': 'Открыта предварительная запись на лето 2027.',

      'place.eyebrow': 'Где мы', 'place.title': 'Ледовый дворец Самсуна, Илкадым.',
      'place.club': 'На базе Samsun Buz Okulu Spor Kulübü', 'place.addr': 'Buz Sporları Salonu, İlkadım / Samsun',
      'place.route': 'Построить маршрут', 'place.hours': 'Время тренировок зависит от группы',

      'contact.eyebrow': 'Запись', 'contact.title': 'Запишитесь на пробное занятие.',
      'contact.lead': 'Заполните форму — сообщение откроется в WhatsApp уже готовым. Обычно отвечаем в тот же день.',
      'form.name': 'Имя родителя', 'form.phone': 'Телефон', 'form.age': 'Возраст ребёнка', 'form.group': 'Группа',
      'form.g.beg': 'Начинающие', 'form.g.pro': 'Спортивная', 'form.g.unsure': 'Пока не знаю',
      'form.msg': 'Комментарий (необязательно)', 'form.submit': 'Отправить в WhatsApp',
      'form.err.name': 'Напишите ваше имя.', 'form.err.phone': 'Укажите номер, по которому с вами связаться.',
      'form.wa.hello': 'Здравствуйте! Хочу записаться на пробное занятие.', 'form.wa.name': 'Родитель', 'form.wa.phone': 'Телефон',
      'form.wa.age': 'Возраст ребёнка', 'form.wa.group': 'Группа', 'form.wa.note': 'Комментарий',
      'contact.or': 'или напрямую',

      'footer.rights': '© 2026 GoldenSkate Самсун · школа фигурного катания', 'footer.net': 'Часть сети школ «Golden Star»',
      'lv.eyebrow': 'Программа', 'lv.title': 'Ступень за ступенью, элемент за элементом.',
      'lv.lead': 'В русской школе каждый элемент строится на предыдущем. Вы всегда знаете, на какой ступени ваш ребёнок.',
      'lv1.n': 'Начальный', 'lv1.d': 'Скольжение, торможение, рёбра, первые одинарные прыжки и вращение стоя.',
      'lv2.n': 'Базовый', 'lv2.d': 'Все одинарные прыжки, аксель, позиции вращений; тесты федерации.',
      'lv3.n': 'Спортивный', 'lv3.d': 'Двойные прыжки, комбинированные вращения, соревновательная программа.',
      'lbl.rank': 'Звание', 'lbl.role': 'Специализация', 'lbl.country': 'Страна', 'lbl.season': 'Сезон 2025–26',
      'lbl.live': 'Тренировка', 'lbl.elements': 'Элементы, которые учим в этом сезоне',
      'lang.label': 'Язык'
    },

    en: {
      'meta.title': 'GoldenSkate Samsun — Russian-school figure skating academy',
      'meta.desc': 'Figure skating for kids in Samsun. Coaches from Russia; ice, ballet and off-ice training in one programme. Free trial lesson.',
      'nav.method': 'School', 'nav.coaches': 'Coaches', 'nav.results': 'Results', 'nav.stories': 'Videos',
      'nav.pricing': 'Groups', 'nav.contact': 'Contact', 'nav.menu': 'Menu',
      'cta.trial': 'Free trial lesson', 'cta.wa': 'Message on WhatsApp', 'cta.ig': 'Instagram',
      'hero.eyebrow': 'Samsun · Russian-school figure skating',
      'hero.title': 'From the first step on ice<br>to the first axel.',
      'hero.sub': 'Coaches from Russia combine ice, ballet and off-ice training into one programme for children from age 3.',
      'hero.f1': 'In Samsun since October 2025', 'hero.f2': 'From age 3', 'hero.f3': 'Coaches from Russia',
      'hero.scroll': 'Scroll down',

      'method.eyebrow': 'The Russian school', 'method.title': 'Beautiful skating starts with the basics.',
      'method.lead': 'We are the first and only Russian-school figure skating club in Samsun. Before jumps come edges, posture and coordination — not quick results, but technique that lasts.',
      'method.ice.t': 'On ice', 'method.ice.d': 'Gliding, edges, spins and jumps. Every skater’s mistakes are worked through one by one.',
      'method.ballet.t': 'Ballet & choreography', 'method.ballet.d': 'Posture, flexibility and musicality. A programme is more than elements — it is the beauty of movement.',
      'method.off.t': 'Off-ice', 'method.off.d': 'Strength, power and coordination. Every jump is learned in the gym first, then taken to the ice.',
      'method.one': 'All three in one club, on one membership.',
      'founder.label': 'Founder', 'founder.text': 'GoldenSkate is the Samsun branch of the “Golden Star” school network from the Moscow region. The network has more than 15 coaches; the best of them are in Samsun.',

      'coaches.eyebrow': 'Coaches', 'coaches.title': 'The team that brought the Russian school to Samsun.',
      'coaches.lead': 'Our coaches grew up in Russian figure skating and trained athletes there. Lessons follow the same system: fundamentals, discipline, a small step every day.',
      'coach.from': 'Russia',
      'coach.daniil.rank': 'Master of Sport', 'coach.daniil.role': 'Off-ice and physical development',
      'coach.daniil.bio': 'Responsible for physical preparation: coordination, endurance and explosive power for jumps.',
      'coach.alina.rank': 'Candidate Master of Sport', 'coach.alina.role': 'Skating technique',
      'coach.alina.bio': 'Coaching for more than 5 years. Builds technique from the youngest age up to official sport grades.',
      'coach.olga.rank': 'Founder · head coach', 'coach.olga.role': 'Programmes and choreography',
      'coach.olga.bio': 'More than ten years of coaching in Moscow and the Moscow region. Founder of the “Golden Star” school network.',

      'results.eyebrow': 'Results', 'results.title': 'Our first season.',
      'results.lead': 'The club opened in October 2025. In one year our students competed in Turkey and Russia, passed federation tests and landed their first difficult jumps.',
      'results.h.place': 'Place', 'results.h.event': 'Competition / test', 'results.h.athlete': 'Skater', 'results.h.date': 'Date',
      'r1.event': '“Golden Star” tournament · Russia', 'r1.place': '2nd',
      'r2.event': 'Turkish Junior Championship (Ümitler) · Ankara', 'r2.place': 'Finalist', 'r2.note': 'represented Samsun',
      'r3.event': 'Samsun Provincial Championship', 'r3.place': '1st',
      'r4.event': 'İzmir Cup · İzmir', 'r4.place': '3rd',
      'r5.event': 'Sportoto Cup · Ankara', 'r5.place': '2nd',
      'r6.event': 'Federation test Basic Novice 2 · Ankara', 'r6.place': 'Passed', 'r6.note': 'first attempt',
      'r7.event': 'Federation test Cubs · Ankara', 'r7.place': 'Passed',
      'm.title': 'First jumps landed this season', 'm.axel': 'Axel', 'm.2s': 'Double salchow', 'm.2a': 'Double axel',
      'm.note': 'Feyza landed her axel in her fifth month at the school.',

      'stories.eyebrow': 'From the ice', 'stories.title': 'Moments from practice.',
      'stories.lead': 'New videos on Instagram every week. Tap a card to watch.',
      'stories.open': 'Open on Instagram', 'stories.sound': 'Sound', 'stories.close': 'Close', 'stories.prev': 'Previous', 'stories.next': 'Next',
      's.club': 'Our club', 's.discipline': 'Discipline', 's.work': 'Hard work', 's.axel': 'First axel', 's.edge': 'Every edge',
      's.off': 'Off-ice', 's.izmir': 'İzmir', 's.gstar': 'Golden Star', 's.spiral': 'Spirals', 's.camp': 'Russia camp',

      'pricing.eyebrow': 'Groups & fees', 'pricing.title': 'Two groups, one system.',
      'pricing.lead': 'We find your child’s level together at the first lesson. The trial lesson is free.',
      'p1.name': 'Beginners', 'p1.who': 'New to the ice · ages 3–10',
      'p1.price': '4,500 ₺', 'p1.per': '/ month',
      'p1.i1': '2 ice sessions a week', 'p1.i2': '1 ballet & off-ice session a week', 'p1.i3': 'Balance, falling safely, first glides', 'p1.i4': 'Small groups',
      'p2.name': 'Competitive', 'p2.who': 'Preparing for tests and competitions',
      'p2.price': '8,500 ₺', 'p2.per': '/ month',
      'p2.i1': '4–5 ice sessions a week', 'p2.i2': 'Off-ice, ballet and choreography', 'p2.i3': 'Federation tests and a competition programme', 'p2.i4': 'Camps in Russia and Turkey',
      'pricing.choose': 'Join this group', 'pricing.note': 'Ask about private lessons on WhatsApp.',
      'pricing.badge': 'For athletes',

      'camps.eyebrow': 'Camps & guests', 'camps.title': 'The season goes beyond our rink.',
      'camp1.t': 'Samsun summer camp', 'camp1.d': '11 training days: 2 hours on ice and 2 hours off-ice every day, with three professional coaches.',
      'camp2.t': 'Russia camp · Lytkarino', 'camp2.d': 'Two weeks on ice near Moscow in August, training alongside Russian skaters.',
      'camp3.t': 'Guest coaches', 'camp3.d': 'Artemiy Buzhor and Arina Beskova gave masterclasses in Samsun.',
      'camps.next': 'Pre-registration for summer 2027 is open.',

      'place.eyebrow': 'Where', 'place.title': 'Samsun Ice Sports Hall, İlkadım.',
      'place.club': 'Training with Samsun Buz Okulu Spor Kulübü', 'place.addr': 'Buz Sporları Salonu, İlkadım / Samsun',
      'place.route': 'Get directions', 'place.hours': 'Training times depend on the group',

      'contact.eyebrow': 'Sign up', 'contact.title': 'Book a trial lesson.',
      'contact.lead': 'Fill in the form and the message opens ready in WhatsApp. We usually reply the same day.',
      'form.name': 'Parent’s name', 'form.phone': 'Phone', 'form.age': 'Child’s age', 'form.group': 'Group',
      'form.g.beg': 'Beginners', 'form.g.pro': 'Competitive', 'form.g.unsure': 'Not sure yet',
      'form.msg': 'Note (optional)', 'form.submit': 'Send on WhatsApp',
      'form.err.name': 'Enter your name.', 'form.err.phone': 'Enter a number we can reach you on.',
      'form.wa.hello': 'Hello! I would like to book a trial lesson.', 'form.wa.name': 'Parent', 'form.wa.phone': 'Phone',
      'form.wa.age': 'Child’s age', 'form.wa.group': 'Group', 'form.wa.note': 'Note',
      'contact.or': 'or directly',

      'footer.rights': '© 2026 GoldenSkate Samsun · Figure skating school', 'footer.net': 'Part of the “Golden Star” school network',
      'lv.eyebrow': 'Programme', 'lv.title': 'Level by level, element by element.',
      'lv.lead': 'In the Russian school every element is built on the one before. You always know which step your child is on.',
      'lv1.n': 'Starter', 'lv1.d': 'Gliding, stopping, edges, first single jumps and an upright spin.',
      'lv2.n': 'Foundation', 'lv2.d': 'All single jumps, the axel, spin positions; federation tests.',
      'lv3.n': 'Competitive', 'lv3.d': 'Double jumps, combination spins, a competition programme.',
      'lbl.rank': 'Rank', 'lbl.role': 'Focus', 'lbl.country': 'Country', 'lbl.season': 'Season 2025–26',
      'lbl.live': 'Practice', 'lbl.elements': 'Elements we are learning this season',
      'lang.label': 'Language'
    }
  };

  var STORIES = [
    { id: 'DQMJ-_0CE13', key: 's.club' },
    { id: 'DekTbvjowG7', key: 's.discipline' },
    { id: 'DXUptkpiBbg', key: 's.axel' },
    { id: 'DP5fAOUiOJ5', key: 's.off' },
    { id: 'DbG1qG2ojmo', key: 's.edge' },
    { id: 'DVHWMc3COD5', key: 's.izmir' },
    { id: 'DWhTEEhCLQE', key: 's.gstar' },
    { id: 'Dd_17pkIzTY', key: 's.work' },
    { id: 'DWa3d4hiB9m', key: 's.spiral' },
    { id: 'Db6N7QxIKYi', key: 's.camp' }
  ];

  var root = document.documentElement;
  var base = root.getAttribute('data-assets') || '../assets/';
  var lang = 'tr';

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  function detect() {
    var saved = store('gs-lang');
    if (saved && LANGS.indexOf(saved) > -1) return saved;
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < prefs.length; i++) {
      var p = String(prefs[i]).toLowerCase().slice(0, 2);
      if (LANGS.indexOf(p) > -1) return p;
    }
    return 'tr';
  }

  function t(key) { return (T[lang] && T[lang][key]) || T.tr[key] || key; }

  function apply(l) {
    lang = l;
    root.lang = l;
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === l;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-active', on);
    });
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(t('form.wa.hello'));
    });
    root.dispatchEvent(new CustomEvent('gs:lang', { detail: l }));
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (!b) return;
    store('gs-lang', b.getAttribute('data-lang'));
    apply(b.getAttribute('data-lang'));
  });

  document.querySelectorAll('[data-ig]').forEach(function (a) { a.href = IG_URL; a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- mobile nav ---------- */
  var navBtn = document.querySelector('[data-nav-toggle]');
  if (navBtn) {
    navBtn.addEventListener('click', function () {
      var open = root.classList.toggle('nav-open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('[data-nav] a').forEach(function (a) {
      a.addEventListener('click', function () { root.classList.remove('nav-open'); navBtn.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---------- reduced motion + hero video ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('video[data-hero]').forEach(function (v) {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    var p = v.play && v.play();
    if (p && p.catch) p.catch(function () {});
  });

  /* ---------- scroll reveals ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- stories ---------- */
  function buildStories() {
    var rail = document.querySelector('[data-stories]');
    if (!rail) return;
    rail.innerHTML = '';
    STORIES.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'story';
      b.setAttribute('data-story', i);
      b.innerHTML =
        '<span class="story__media"><img src="' + base + 'stories/' + s.id + '.jpg" alt="" loading="lazy" decoding="async">' +
        '<video muted playsinline loop preload="none" src="' + base + 'stories/' + s.id + '.mp4"></video></span>' +
        '<span class="story__label" data-i18n="' + s.key + '">' + t(s.key) + '</span>';
      // short muted preview on hover (desktop only)
      if (!reduce && window.matchMedia('(hover: hover)').matches) {
        var v = b.querySelector('video');
        b.addEventListener('mouseenter', function () { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); b.classList.add('is-playing'); });
        b.addEventListener('mouseleave', function () { v.pause(); b.classList.remove('is-playing'); });
      }
      b.addEventListener('click', function () { openViewer(i); });
      rail.appendChild(b);
    });
  }

  var viewer, vVideo, vBars, vIdx = 0, vMuted = true, lastFocus;
  function ensureViewer() {
    if (viewer) return;
    viewer = document.createElement('div');
    viewer.className = 'viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.hidden = true;
    viewer.innerHTML =
      '<div class="viewer__frame">' +
      '<div class="viewer__bars"></div>' +
      '<div class="viewer__top"><span class="viewer__brand">goldenskate.samsun</span>' +
      '<button type="button" class="viewer__btn" data-v="sound"></button>' +
      '<button type="button" class="viewer__btn viewer__close" data-v="close" aria-label="Close">✕</button></div>' +
      '<video class="viewer__video" playsinline></video>' +
      '<button type="button" class="viewer__nav viewer__nav--prev" data-v="prev"></button>' +
      '<button type="button" class="viewer__nav viewer__nav--next" data-v="next"></button>' +
      '<a class="viewer__ig" data-v="ig" target="_blank" rel="noopener"></a>' +
      '</div>';
    document.body.appendChild(viewer);
    vVideo = viewer.querySelector('video');
    vBars = viewer.querySelector('.viewer__bars');
    STORIES.forEach(function () { var s = document.createElement('span'); s.innerHTML = '<i></i>'; vBars.appendChild(s); });
    viewer.addEventListener('click', function (e) {
      var a = e.target.closest('[data-v]');
      if (!a) { if (e.target === viewer) closeViewer(); return; }
      var k = a.getAttribute('data-v');
      if (k === 'close') closeViewer();
      if (k === 'prev') show(vIdx - 1);
      if (k === 'next') show(vIdx + 1);
      if (k === 'sound') { vMuted = !vMuted; vVideo.muted = vMuted; labelViewer(); }
    });
    vVideo.addEventListener('timeupdate', function () {
      var bar = vBars.children[vIdx];
      if (bar && vVideo.duration) bar.firstChild.style.transform = 'scaleX(' + (vVideo.currentTime / vVideo.duration) + ')';
    });
    vVideo.addEventListener('ended', function () { show(vIdx + 1); });
    document.addEventListener('keydown', function (e) {
      if (viewer.hidden) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') show(vIdx + 1);
      if (e.key === 'ArrowLeft') show(vIdx - 1);
    });
    root.addEventListener('gs:lang', labelViewer);
  }
  function labelViewer() {
    if (!viewer) return;
    viewer.querySelector('[data-v="sound"]').textContent = (vMuted ? '🔇 ' : '🔊 ') + t('stories.sound');
    viewer.querySelector('[data-v="close"]').setAttribute('aria-label', t('stories.close'));
    viewer.querySelector('[data-v="prev"]').setAttribute('aria-label', t('stories.prev'));
    viewer.querySelector('[data-v="next"]').setAttribute('aria-label', t('stories.next'));
    viewer.querySelector('[data-v="ig"]').textContent = t('stories.open') + ' ↗';
  }
  function show(i) {
    if (i < 0) i = 0;
    if (i >= STORIES.length) { closeViewer(); return; }
    vIdx = i;
    var s = STORIES[i];
    Array.prototype.forEach.call(vBars.children, function (b, j) { b.firstChild.style.transform = 'scaleX(' + (j < i ? 1 : 0) + ')'; });
    vVideo.src = base + 'stories/' + s.id + '.mp4';
    vVideo.poster = base + 'stories/' + s.id + '.jpg';
    vVideo.muted = vMuted;
    var p = vVideo.play(); if (p && p.catch) p.catch(function () {});
    viewer.querySelector('[data-v="ig"]').href = 'https://www.instagram.com/reel/' + s.id + '/';
  }
  function openViewer(i) {
    ensureViewer(); labelViewer();
    lastFocus = document.activeElement;
    viewer.hidden = false;
    root.classList.add('viewer-open');
    show(i);
    viewer.querySelector('[data-v="close"]').focus();
  }
  function closeViewer() {
    if (!viewer) return;
    vVideo.pause(); vVideo.removeAttribute('src'); vVideo.load();
    viewer.hidden = true;
    root.classList.remove('viewer-open');
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- form → WhatsApp ---------- */
  document.querySelectorAll('[data-wa-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = f.elements.name.value.trim();
      var phone = f.elements.phone.value.trim();
      var err = f.querySelector('[data-form-error]');
      var msg = '';
      if (!name) msg = t('form.err.name');
      else if (phone.replace(/\D/g, '').length < 7) msg = t('form.err.phone');
      if (msg) {
        if (err) { err.textContent = msg; err.hidden = false; }
        (name ? f.elements.phone : f.elements.name).focus();
        return;
      }
      if (err) err.hidden = true;
      var g = f.elements.group ? f.elements.group.value : '';
      var lines = [t('form.wa.hello'), '', t('form.wa.name') + ': ' + name, t('form.wa.phone') + ': ' + phone];
      if (f.elements.age && f.elements.age.value) lines.push(t('form.wa.age') + ': ' + f.elements.age.value);
      if (g) lines.push(t('form.wa.group') + ': ' + t('form.g.' + g));
      if (f.elements.note && f.elements.note.value.trim()) lines.push(t('form.wa.note') + ': ' + f.elements.note.value.trim());
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  });

  /* ---------- map: MapLibre + OpenFreeMap vector tiles, every layer recoloured from the page's --map-* tokens ---------- */
  function initMap() {
    var el = document.querySelector('[data-map]');
    if (!el || !window.maplibregl) return;
    var cs = getComputedStyle(root);
    var c = function (k, d) { return cs.getPropertyValue(k).trim() || d; };
    var pal = {
      bg: c('--map-bg', '#082229'), water: c('--map-water', '#0c3a45'), park: c('--map-park', '#0b2d2a'),
      building: c('--map-building', '#0d313a'), road: c('--map-road', 'rgba(232,242,241,.16)'),
      major: c('--map-road-major', 'rgba(214,178,110,.34)'), label: c('--map-label', '#8fb0b2'), halo: c('--map-halo', '#061a20')
    };
    var map = new maplibregl.Map({
      container: el, style: 'https://tiles.openfreemap.org/styles/positron',
      center: [RINK.lng, RINK.lat], zoom: 14.6, attributionControl: { compact: true }, cooperativeGestures: true
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('style.load', function () {
      map.getStyle().layers.forEach(function (l) {
        var id = l.id, set = function (p, v) { try { map.setPaintProperty(id, p, v); } catch (e) {} };
        if (l.type === 'background') set('background-color', pal.bg);
        else if (l.type === 'fill') {
          if (/water/.test(id)) set('fill-color', pal.water);
          else if (/building|aeroway/.test(id)) set('fill-color', pal.building);
          else set('fill-color', pal.park);
        } else if (l.type === 'line') {
          if (/boundary|railway/.test(id)) map.setLayoutProperty(id, 'visibility', 'none');
          else if (/water/.test(id)) set('line-color', pal.water);
          else if (/casing/.test(id)) set('line-color', pal.bg);
          else if (/motorway|major|trunk|primary/.test(id)) set('line-color', pal.major);
          else set('line-color', pal.road);
        } else if (l.type === 'symbol') {
          if (/shield|airport/.test(id)) map.setLayoutProperty(id, 'visibility', 'none');
          else { set('text-color', pal.label); set('text-halo-color', pal.halo); }
        }
      });
    });
    var pin = document.createElement('div');
    pin.className = 'map-pin'; pin.innerHTML = '<span></span>';
    new maplibregl.Marker({ element: pin }).setLngLat([RINK.lng, RINK.lat]).addTo(map);
  }

  /* ---------- stories rail: arrows, progress thumb, mouse drag ---------- */
  function initRail() {
    var rail = document.querySelector('[data-stories]');
    if (!rail) return;
    var wrap = rail.parentElement;
    var prev = document.querySelector('[data-rail-prev]');
    var next = document.querySelector('[data-rail-next]');
    var thumb = document.querySelector('[data-rail-progress]');
    function step() { var card = rail.querySelector('.story'); return card ? (card.offsetWidth + 18) * 2 : 320; }
    function update() {
      var max = rail.scrollWidth - rail.clientWidth;
      var atEnd = rail.scrollLeft >= max - 4;
      if (prev) prev.disabled = rail.scrollLeft <= 4;
      if (next) next.disabled = atEnd;
      wrap.classList.toggle('at-end', atEnd);
      if (thumb) {
        thumb.style.width = Math.min(100, rail.clientWidth / rail.scrollWidth * 100) + '%';
        thumb.style.transform = 'translateX(' + (rail.scrollLeft / rail.clientWidth * 100) + '%)';
      }
    }
    if (prev) prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    var sx = 0, sl = 0, down = false, moved = false;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 6) { moved = true; rail.classList.add('is-dragging'); }
      if (moved) rail.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false; rail.classList.remove('is-dragging');
    });
    rail.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    rail.addEventListener('dragstart', function (e) { e.preventDefault(); });
    update();
  }
  document.querySelectorAll('[data-route]').forEach(function (a) {
    a.href = 'https://www.google.com/maps/dir/?api=1&destination=' + RINK.lat + ',' + RINK.lng;
    a.target = '_blank'; a.rel = 'noopener';
  });

  buildStories();
  initRail();
  apply(detect());
  if (document.readyState === 'complete') initMap(); else window.addEventListener('load', initMap);
})();
