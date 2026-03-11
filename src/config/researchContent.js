// ABOUTME: Staged research content for the entry flow prototype.
// ABOUTME: Two articles per language with red-link topics, rendered on reading pages.

// Paragraphs are either plain strings or arrays of segments.
// A segment is a string (rendered as text) or { redLinkIndex: N } (rendered as an inline red link
// referencing article.redLinks[N]).

export const researchContent = {
  en: {
    code: 'en',
    label: 'English',
    articles: [
      {
        id: 'culinaria-da-bahia',
        title: 'Cuisine of Bahia',
        summary: [
          'Bahian cuisine is a regional culinary tradition from the state of Bahia in northeastern Brazil. It is distinguished by its extensive use of palm oil (dend\u00EA), coconut milk, fresh seafood, and spices introduced through the African diaspora during the colonial period.',
          [
            'The food of Bahia occupies a central place in Brazilian cultural identity, with dishes like acaraj\u00E9, moqueca, and vatap\u00E1 recognized nationally and internationally. Some dishes, such as ',
            { redLinkIndex: 0 },
            ', remain closely tied to Afro-Brazilian religious traditions and have no Wikipedia article yet. Salvador, the state capital, is often called the culinary capital of Brazil.',
          ],
        ],
        sections: [
          {
            heading: 'Origins',
            paragraphs: [
              'Bahian cuisine is the product of three culinary traditions: Indigenous Tupi cooking techniques using manioc, fish, and tropical fruits; Portuguese colonial recipes brought by settlers from the 16th century; and West African foodways carried by enslaved peoples from present-day Nigeria, Benin, and Angola.',
              [
                'The African influence is the most distinctive element. Enslaved cooks in Salvador\u2019s households adapted recipes from Yoruba and Fon traditions using local ingredients, creating an entirely new culinary vocabulary. Palm oil, black-eyed peas, and dried shrimp became foundational ingredients. Street vendors still serve traditional preparations like ',
                { redLinkIndex: 1 },
                ', a savoury porridge of dried shrimp, roasted peanuts, and palm oil, from aluminium pots in the Pelourinho district.',
              ],
            ],
          },
          {
            heading: 'Signature dishes',
            paragraphs: [
              'Moqueca baiana is a slow-cooked stew of fish or shrimp prepared in a clay pot (panela de barro) with dend\u00EA oil, coconut milk, tomatoes, onions, and coriander. It is distinct from moqueca capixaba from neighbouring Esp\u00EDrito Santo, which uses no palm oil or coconut milk.',
              'Acaraj\u00E9, deep-fried fritters made from black-eyed pea batter, are perhaps the most iconic Bahian street food. They are traditionally prepared by baianas de acaraj\u00E9 \u2014 women in white lace dresses who sell them from tabuleiro trays on street corners. Vatap\u00E1, a creamy paste of bread, shrimp, coconut milk, and palm oil, is typically served as a filling inside the acaraj\u00E9.',
            ],
          },
          {
            heading: 'Cultural significance',
            paragraphs: [
              'Salvador\u2019s street food tradition is inseparable from the city\u2019s Afro-Brazilian religious practices. Many dishes served on the street originated as offerings in Candombl\u00E9 terreiros and were later adapted for everyday consumption. The baianas who prepare and sell these foods are recognized as bearers of intangible cultural heritage by Brazil\u2019s national heritage institute, IPHAN.',
              'In 2005, the of\u00EDcio das baianas de acaraj\u00E9 was inscribed in Brazil\u2019s national registry of intangible cultural heritage, recognizing the practice as a living tradition that connects food preparation, religious devotion, and community identity in Salvador and across Bahia.',
            ],
          },
        ],
        redLinks: [
          { id: 'abara', label: 'Abar\u00E1' },
          { id: 'mingau-de-tapioca', label: 'Mingau de tapioca' },
        ],
      },
      {
        id: 'kebabs-of-turkey',
        title: 'Kebabs of Turkey',
        summary: [
          [
            'Turkish kebabs are a diverse family of grilled and roasted meat dishes that form a cornerstone of Turkish cuisine. Regional specialties such as ',
            { redLinkIndex: 0 },
            ', a tray-grilled dish from Gaziantep combining pistachios, lamb fat, and minced meat, reflect the deep local traditions behind each preparation.',
          ],
          'From the world-famous d\u00F6ner to lesser-known provincial specialties, Turkey\u2019s kebab culture reflects centuries of migration, trade, and local adaptation. Each province claims its own signature preparation, often tied to local livestock breeds, spice blends, and charcoal-grilling traditions.',
        ],
        sections: [
          {
            heading: 'History',
            paragraphs: [
              'The word \u201Ckebab\u201D derives from the Arabic kab\u0101b, meaning roasted meat. Grilling meat on skewers has been practiced across Anatolia for millennia, with archaeological evidence of spit-roasting dating back to the Hittite period. The Ottoman court kitchens refined and diversified kebab preparations from the 15th century onward.',
              [
                'By the 19th century, regional kebab styles had become strongly associated with specific cities. Adana, Urfa, and Beyti (Istanbul) each developed distinctive techniques that remain central to their culinary identity today. ',
                { redLinkIndex: 1 },
                ' is a serving style from Bursa where thin slices of d\u00F6ner are arranged over cubed pide bread and topped with hot tomato sauce and melted butter.',
              ],
            ],
          },
          {
            heading: 'Regional varieties',
            paragraphs: [
              'Adana kebab\u0131, made from hand-minced lamb seasoned with red pepper flakes and grilled on flat skewers over charcoal, is one of the most recognized Turkish kebabs internationally. Its preparation is protected by a geographic indication and must use meat from specific breeds raised in the \u00C7ukurova region.',
              'Further east, the city of Diyarbak\u0131r is known for its kaburga kebab, prepared with whole lamb ribs slow-cooked in a tandoor oven. In Urfa, the kebab tradition favours a milder seasoning profile, with the meat shaped by hand around broad flat skewers without the fiery red pepper that defines the Adana style.',
            ],
          },
          {
            heading: 'Preparation and serving',
            paragraphs: [
              'Most Turkish kebabs are grilled over hardwood charcoal, which imparts a distinctive smoky flavour. The choice of wood, the coarseness of the mince, and the fat-to-meat ratio are considered critical variables that distinguish a skilled kebab master (kebap\u00E7\u0131) from an amateur.',
              'Kebabs are traditionally served on flatbread (lava\u015F or pide) with grilled tomatoes, peppers, and a garnish of sumac-dressed onions. In some regions, yogurt or tomato-butter sauce is ladled over the meat, while in others the kebab is wrapped in thin lavash with fresh herbs and eaten by hand.',
            ],
          },
        ],
        redLinks: [
          { id: 'tepsi-kebabi', label: 'Tepsi kebab\u0131' },
          { id: 'iskender-kebab', label: '\u0130skender kebab' },
        ],
      },
    ],
  },
  tr: {
    code: 'tr',
    label: 'T\u00FCrk\u00E7e',
    articles: [
      {
        id: 'van-golu-havzasi',
        title: 'Van G\u00F6l\u00FC havzas\u0131',
        summary: [
          [
            'Van G\u00F6l\u00FC havzas\u0131, T\u00FCrkiye\u2019nin Do\u011Fu Anadolu B\u00F6lgesi\u2019nde yer alan ve d\u00FCnyan\u0131n en b\u00FCy\u00FCk soda g\u00F6l\u00FC olan Van G\u00F6l\u00FC\u2019n\u00FC \u00E7evreleyen co\u011Frafi aland\u0131r. Havzan\u0131n kuzeyinde y\u00FCkselen ',
            { redLinkIndex: 0 },
            ', alpin \u00E7ay\u0131rlardan subalpin ormanlara kadar geni\u015F bir habitat yelpazesine sahiptir.',
          ],
          'Havza, y\u00FCksek da\u011Flar, volkanik arazi ve step bitki \u00F6rt\u00FCs\u00FCyle \u00E7evrilidir. B\u00F6lge, zengin ku\u015F \u00E7e\u015Fitlili\u011Fi, endemik inci kefali populasyonu ve Urartular\u2019dan kalan arkeolojik kal\u0131nt\u0131lar\u0131yla tan\u0131n\u0131r.',
        ],
        sections: [
          {
            heading: 'Co\u011Frafya',
            paragraphs: [
              'Van G\u00F6l\u00FC deniz seviyesinden 1.648 metre y\u00FCkseklikte, S\u00FCphan Da\u011F\u0131 ve Nemrut Da\u011F\u0131 gibi volkanik da\u011Flar\u0131n aras\u0131nda yer al\u0131r. G\u00F6l 3.755 km\u00B2 y\u00FCz\u00F6l\u00E7\u00FCm\u00FCyle T\u00FCrkiye\u2019nin en b\u00FCy\u00FCk g\u00F6l\u00FCd\u00FCr. Suyu a\u015F\u0131r\u0131 alkali olup pH de\u011Feri yakla\u015F\u0131k 9,8\u2019dir.',
              [
                'Havzaya d\u00F6k\u00FClen ba\u015Fl\u0131ca akarsular Bendimahi \u00C7ay\u0131, Zilan Deresi ve Karasu\u2019dur. Bu akarsular\u0131n ta\u015F\u0131d\u0131\u011F\u0131 tatl\u0131 su, ',
                { redLinkIndex: 1 },
                ' boyunca \u00FCreme alanlar\u0131na ula\u015Fan bal\u0131klar i\u00E7in hayati \u00F6nem ta\u015F\u0131r.',
              ],
            ],
          },
          {
            heading: 'Biyolojik \u00E7e\u015Fitlilik',
            paragraphs: [
              'Van G\u00F6l\u00FC\u2019n\u00FCn en bilinen canl\u0131s\u0131, g\u00F6l\u00FCn alkali sular\u0131na uyum sa\u011Flam\u0131\u015F endemik bir t\u00FCr olan inci kefalidir (Alburnus tarichi). \u0130nci kefali her ilkbaharda tatl\u0131 su akarsular\u0131na g\u00F6\u00E7 ederek \u00FCrer.',
              'Havza ayr\u0131ca flamingo, angut ve akkuyruklu kartal gibi ku\u015F t\u00FCrlerine ev sahipli\u011Fi yapar. G\u00F6l\u00FCn g\u00FCneyindeki sulak alanlar, g\u00F6\u00E7men ku\u015Flar i\u00E7in \u00F6nemli konaklama noktalar\u0131d\u0131r.',
            ],
          },
          {
            heading: 'K\u00FClt\u00FCrel miras',
            paragraphs: [
              'Havzada Urartu uygarl\u0131\u011F\u0131na ait \u00F6nemli kal\u0131nt\u0131lar bulunur. Van Kalesi, \u0130\u00D6 9. y\u00FCzy\u0131lda in\u015Fa edilmi\u015F bir Urartu kalesidir ve g\u00F6l\u00FC \u00E7evreleyen en b\u00FCy\u00FCk arkeolojik yap\u0131lardan biridir.',
              '\u00C7avu\u015Ftepe Kilisesi, 10. y\u00FCzy\u0131la ait bir Ermeni Havariler Kilisesi\u2019dir ve Akdamar Adas\u0131\u2019nda yer al\u0131r. Van kedisi, farkl\u0131 renklerdeki g\u00F6zleriyle tan\u0131nan nadir bir ev kedisi t\u00FCr\u00FC olup b\u00F6lgenin simgelerinden biridir.',
            ],
          },
        ],
        redLinks: [
          { id: 'suphan-dagi-ekosistemi', label: 'S\u00FCphan Da\u011F\u0131 ekosistemi' },
          { id: 'inci-kefali-goc-yollari', label: '\u0130nci kefali g\u00F6\u00E7 yollar\u0131' },
        ],
      },
      {
        id: 'turk-kebap-kulturu',
        title: 'T\u00FCrk kebap k\u00FClt\u00FCr\u00FC',
        summary: [
          [
            'T\u00FCrk kebaplar\u0131, Anadolu\u2019nun k\u00F6kl\u00FC mutfak gelene\u011Finden do\u011Fan, \u0131zgara ve f\u0131r\u0131n y\u00F6ntemleriyle haz\u0131rlanan et yemekleri ailesidir. B\u00F6lgeden b\u00F6lgeye de\u011Fi\u015Fen lezzetler aras\u0131nda ',
            { redLinkIndex: 0 },
            ' gibi Gaziantep\u2019e \u00F6zg\u00FC, bak\u0131r tepside pi\u015Firilen \u00E7e\u015Fitler de bulunur.',
          ],
          'D\u00FCnyaca \u00FCnl\u00FC d\u00F6nerden yerel \u00E7e\u015Fitlere kadar T\u00FCrkiye\u2019nin kebap k\u00FClt\u00FCr\u00FC, y\u00FCzy\u0131llarca s\u00FCren g\u00F6\u00E7, ticaret ve yerel uyumun izlerini ta\u015F\u0131r. Her il kendine \u00F6zg\u00FC bir haz\u0131rl\u0131k y\u00F6ntemiyle tan\u0131n\u0131r.',
        ],
        sections: [
          {
            heading: 'Tarih\u00E7e',
            paragraphs: [
              'Kebap s\u00F6zc\u00FC\u011F\u00FC Arap\u00E7a kab\u0101b kelimesinden gelir ve k\u0131zart\u0131lm\u0131\u015F et anlam\u0131na gelir. Anadolu\u2019da \u015Fi\u015Fte et pi\u015Firme gelene\u011Fi binlerce y\u0131l \u00F6ncesine, Hitit d\u00F6nemine kadar uzan\u0131r. Osmanl\u0131 saray mutfaklar\u0131 15. y\u00FCzy\u0131ldan itibaren kebap \u00E7e\u015Fitlerini geli\u015Ftirmi\u015Ftir.',
              [
                '19. y\u00FCzy\u0131la gelindi\u011Finde b\u00F6lgesel kebap tarzlar\u0131 belirli \u015Fehirlerle \u00F6zde\u015Fle\u015Fmi\u015Fti. Adana, Urfa ve Beyti (Istanbul) her biri kendine \u00F6zg\u00FC teknikler geli\u015Ftirmi\u015Ftir. ',
                { redLinkIndex: 1 },
                ', Bursa\u2019da do\u011Fan bir sunum bi\u00E7imidir: ince dilimlenmi\u015F d\u00F6ner, k\u00FCp kesilmi\u015F pide ekme\u011Finin \u00FCzerine dizilir ve s\u0131cak domates sosu ile eritilmi\u015F tereyağıyla servis edilir.',
              ],
            ],
          },
          {
            heading: 'B\u00F6lgesel \u00E7e\u015Fitler',
            paragraphs: [
              'Adana kebab\u0131, el ile k\u0131y\u0131lm\u0131\u015F ku\u015Fba\u015F\u0131 kuzudan yap\u0131l\u0131r, pul biber ile tatland\u0131r\u0131l\u0131r ve yass\u0131 \u015Fi\u015Flerde k\u00F6m\u00FCr ate\u015Finde pi\u015Firilir. Haz\u0131rlan\u0131\u015F\u0131 co\u011Frafi i\u015Faret ile korunmaktad\u0131r ve \u00C7ukurova b\u00F6lgesinde yeti\u015Ftirilen belirli \u0131rklardan elde edilen et kullan\u0131lmas\u0131 zorunludur.',
              'Daha do\u011Fuda Diyarbak\u0131r, tand\u0131rda yava\u015F pi\u015Firilen b\u00FCt\u00FCn kuzu kaburgalardan haz\u0131rlanan kaburga kebab\u0131yla \u00FCnl\u00FCd\u00FCr. Urfa\u2019da ise daha yumu\u015Fak bir baharat profili tercih edilir; et, Adana tarz\u0131ndaki k\u0131rm\u0131z\u0131 biber olmaks\u0131z\u0131n elle geni\u015F yass\u0131 \u015Fi\u015Flere sar\u0131l\u0131r.',
            ],
          },
          {
            heading: 'Haz\u0131rlan\u0131\u015F ve servis',
            paragraphs: [
              'T\u00FCrk kebaplar\u0131n\u0131n \u00E7o\u011Fu sert odun k\u00F6m\u00FCr\u00FC \u00FCzerinde \u0131zgaralan\u0131r; bu y\u00F6ntem ete kendine has dumanl\u0131 bir lezzet katar. Odun se\u00E7imi, k\u0131yma kal\u0131nl\u0131\u011F\u0131 ve ya\u011F-et oran\u0131 usta bir kebap\u00E7\u0131y\u0131 amat\u00F6rden ay\u0131ran kritik de\u011Fi\u015Fkenlerdir.',
              'Kebaplar geleneksel olarak lava\u015F veya pide \u00FCzerinde, \u0131zgara domates, biber ve suma\u011Fl\u0131 so\u011Fanla servis edilir. Baz\u0131 b\u00F6lgelerde etin \u00FCzerine yo\u011Furt ya da domates-tereyağı sosu d\u00F6k\u00FCl\u00FCr.',
            ],
          },
        ],
        redLinks: [
          { id: 'tepsi-kebabi', label: 'Tepsi kebab\u0131' },
          { id: 'iskender-kebab', label: '\u0130skender kebab' },
        ],
      },
    ],
  },
  pt: {
    code: 'pt',
    label: 'Portugu\u00EAs',
    articles: [
      {
        id: 'culinaria-da-bahia-pt',
        title: 'Culin\u00E1ria da Bahia',
        summary: [
          [
            'A culin\u00E1ria baiana \u00E9 uma tradi\u00E7\u00E3o culin\u00E1ria regional do estado da Bahia, no Nordeste do Brasil. Pratos como o acaraj\u00E9, a moqueca e o vatap\u00E1 s\u00E3o reconhecidos nacional e internacionalmente. Alguns pratos, como o ',
            { redLinkIndex: 0 },
            ', permanecem intimamente ligados \u00E0s tradi\u00E7\u00F5es religiosas afro-brasileiras e ainda n\u00E3o possuem artigo na Wikip\u00E9dia.',
          ],
          'A comida da Bahia ocupa um lugar central na identidade cultural brasileira. Salvador, a capital do estado, \u00E9 frequentemente chamada de capital gastron\u00F4mica do Brasil, gra\u00E7as \u00E0 riqueza de sabores que combinam influ\u00EAncias ind\u00EDgenas, portuguesas e africanas.',
        ],
        sections: [
          {
            heading: 'Origens',
            paragraphs: [
              [
                'A culin\u00E1ria baiana \u00E9 produto de tr\u00EAs tradi\u00E7\u00F5es: t\u00E9cnicas de cozinha ind\u00EDgena tupi com mandioca, peixes e frutas tropicais; receitas coloniais portuguesas trazidas a partir do s\u00E9culo XVI; e pr\u00E1ticas alimentares da \u00C1frica Ocidental trazidas por pessoas escravizadas. Vendedores de rua ainda servem prepara\u00E7\u00F5es tradicionais como o ',
                { redLinkIndex: 1 },
                ', um mingau salgado de camar\u00E3o seco, amendoim torrado e azeite de dend\u00EA, servido em copos no bairro do Pelourinho.',
              ],
              'A influ\u00EAncia africana \u00E9 o elemento mais distintivo. Cozinheiros escravizados nas casas de Salvador adaptaram receitas das tradi\u00E7\u00F5es iorub\u00E1 e fon usando ingredientes locais, criando um vocabul\u00E1rio culin\u00E1rio inteiramente novo. Azeite de dend\u00EA, feij\u00E3o-fradinho, quiabo e camar\u00E3o seco tornaram-se ingredientes fundamentais.',
            ],
          },
          {
            heading: 'Pratos t\u00EDpicos',
            paragraphs: [
              'A moqueca baiana \u00E9 um ensopado de peixe ou camar\u00E3o preparado em panela de barro com azeite de dend\u00EA, leite de coco, tomates, cebolas e coentro. Distingue-se da moqueca capixaba do Esp\u00EDrito Santo, que n\u00E3o utiliza azeite de dend\u00EA nem leite de coco.',
              'O acaraj\u00E9, bolinho frito feito de massa de feij\u00E3o-fradinho, \u00E9 talvez a comida de rua baiana mais ic\u00F4nica. \u00C9 tradicionalmente preparado pelas baianas de acaraj\u00E9 \u2014 mulheres vestidas de branco que vendem em tabuleiros nas esquinas. O vatap\u00E1, uma pasta cremosa de p\u00E3o, camar\u00E3o, leite de coco e azeite de dend\u00EA, \u00E9 normalmente servido como recheio do acaraj\u00E9.',
            ],
          },
          {
            heading: 'Signific\u00E2ncia cultural',
            paragraphs: [
              'A tradi\u00E7\u00E3o da comida de rua de Salvador \u00E9 insepar\u00E1vel das pr\u00E1ticas religiosas afro-brasileiras. Muitos pratos vendidos nas ruas tiveram origem como oferendas em terreiros de Candombl\u00E9 e foram posteriormente adaptados para o consumo cotidiano. As baianas que preparam e vendem esses alimentos s\u00E3o reconhecidas como portadoras de patrim\u00F4nio cultural imaterial pelo IPHAN.',
              'Em 2005, o of\u00EDcio das baianas de acaraj\u00E9 foi inscrito no registro nacional de patrim\u00F4nio cultural imaterial do Brasil, reconhecendo a pr\u00E1tica como uma tradi\u00E7\u00E3o viva que conecta prepara\u00E7\u00E3o de alimentos, devo\u00E7\u00E3o religiosa e identidade comunit\u00E1ria em Salvador e em toda a Bahia.',
            ],
          },
        ],
        redLinks: [
          { id: 'abara', label: 'Abar\u00E1' },
          { id: 'mingau-de-tapioca', label: 'Mingau de tapioca' },
        ],
      },
      {
        id: 'amazonia-reserves',
        title: 'Reservas ecol\u00F3gicas da Amaz\u00F4nia',
        summary: [
          [
            'As reservas ecol\u00F3gicas da Amaz\u00F4nia s\u00E3o \u00E1reas protegidas distribu\u00EDdas pela Floresta Amaz\u00F4nica nos estados do Amazonas, Par\u00E1, Amap\u00E1 e Rond\u00F4nia, entre outros. O ',
            { redLinkIndex: 0 },
            ', com seus 2,3 milh\u00F5es de hectares, \u00E9 a maior \u00E1rea protegida de floresta cont\u00EDnua da Amaz\u00F4nia.',
          ],
          'Essas reservas abrigam uma biodiversidade extraordin\u00E1ria, incluindo esp\u00E9cies como a on\u00E7a-pintada, o boto-cor-de-rosa e o gavi\u00E3o-real. Al\u00E9m de sua import\u00E2ncia biol\u00F3gica, desempenham um papel fundamental na regula\u00E7\u00E3o do clima global ao armazenar bilh\u00F5es de toneladas de carbono.',
        ],
        sections: [
          {
            heading: 'Distribui\u00E7\u00E3o geogr\u00E1fica',
            paragraphs: [
              'A Floresta Amaz\u00F4nica se estende por nove pa\u00EDses da Am\u00E9rica do Sul, mas a maior parte de sua \u00E1rea est\u00E1 em territ\u00F3rio brasileiro. As reservas federais, estaduais e municipais variam em categoria, desde parques nacionais at\u00E9 reservas extrativistas e florestas nacionais.',
              [
                'Comunidades ind\u00EDgenas e ribeirinhas desempenham um papel essencial na fiscaliza\u00E7\u00E3o e preserva\u00E7\u00E3o dessas \u00E1reas. Programas de manejo comunit\u00E1rio, como os adotados na ',
                { redLinkIndex: 1 },
                ', t\u00EAm demonstrado resultados positivos na redu\u00E7\u00E3o do desmatamento.',
              ],
            ],
          },
          {
            heading: 'Biodiversidade',
            paragraphs: [
              'A regi\u00E3o amaz\u00F4nica abriga aproximadamente 10% de todas as esp\u00E9cies conhecidas do planeta. Nas reservas, j\u00E1 foram catalogadas mais de 2.500 esp\u00E9cies de peixes, 1.300 de aves e 400 de mam\u00EDferos.',
              'A ictiofauna \u00E9 particularmente diversificada nos igap\u00F3s e v\u00E1rzeas, onde as flutua\u00E7\u00F5es sazonais do n\u00EDvel dos rios criam microhabitats distintos. O pirarucu, um dos maiores peixes de \u00E1gua doce do mundo, \u00E9 encontrado em diversas dessas unidades de conserva\u00E7\u00E3o.',
            ],
          },
          {
            heading: 'Desafios de conserva\u00E7\u00E3o',
            paragraphs: [
              'As reservas enfrentam press\u00F5es crescentes do desmatamento ilegal, da minera\u00E7\u00E3o e da expans\u00E3o da fronteira agr\u00EDcola. Segundo dados do INPE, a taxa de desmatamento na Amaz\u00F4nia Legal tem apresentado flutua\u00E7\u00F5es significativas nas \u00FAltimas d\u00E9cadas.',
              'Entre as maiores unidades de conserva\u00E7\u00E3o est\u00E3o a Esta\u00E7\u00E3o Ecol\u00F3gica de Anavilhanas, no Rio Negro, e a Reserva Biol\u00F3gica do Uatum\u00E3, ambas no estado do Amazonas. A preserva\u00E7\u00E3o dessas \u00E1reas depende cada vez mais da articula\u00E7\u00E3o entre comunidades locais, governos estaduais e organiza\u00E7\u00F5es internacionais.',
            ],
          },
        ],
        redLinks: [
          { id: 'jau-national-park', label: 'Parque Nacional do Ja\u00FA' },
          { id: 'mamiraua-sustentavel', label: 'Reserva Mamirau\u00E1' },
        ],
      },
    ],
  },
}
