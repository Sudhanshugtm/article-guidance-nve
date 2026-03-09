// ABOUTME: Staged research content for the entry flow prototype.
// ABOUTME: One article per language with 2-3 red-link topics each, rendered on reading pages.

// Paragraphs are either plain strings or arrays of segments.
// A segment is a string (rendered as text) or { redLinkIndex: N } (rendered as an inline red link
// referencing article.redLinks[N]).

export const researchContent = {
  en: {
    code: 'en',
    label: 'English',
    articles: [
      {
        id: 'assam-wetlands',
        title: 'Wetlands of Assam',
        summary: [
          'The wetlands of Assam are a network of freshwater ecosystems spread across the Brahmaputra and Barak river valleys in the Indian state of Assam. They include marshes, swamps, floodplain lakes (locally called beels), and riverine wetlands that together cover over 101,232 hectares.',
          'These wetlands support a rich biodiversity including the greater adjutant stork, the Gangetic river dolphin, and several species of migratory waterfowl. They play a critical role in flood regulation, groundwater recharge, and sustaining the livelihoods of fishing communities across the region.',
        ],
        sections: [
          {
            heading: 'Geography',
            paragraphs: [
              'Assam lies in the northeastern corner of India, bordered by Bhutan and Arunachal Pradesh to the north and Meghalaya and Nagaland to the south. The Brahmaputra river, one of the largest in Asia, flows through the centre of the state and creates an extensive floodplain that gives rise to numerous wetland habitats.',
              [
                'The largest concentration of beels is found in the lower Brahmaputra valley, particularly in the districts of Nagaon, Morigaon, and Barpeta. Deepor Beel, located near Guwahati, is a Ramsar site recognized for its ecological significance. To the east, forested wetlands extend toward ',
                { redLinkIndex: 0 },
                ', where seasonal flooding supports unique assemblages of aquatic plants and animals.',
              ],
            ],
          },
          {
            heading: 'Biodiversity',
            paragraphs: [
              'The wetlands of Assam harbour more than 200 species of birds, including globally threatened species such as the greater adjutant, the spot-billed pelican, and Baer\u2019s pochard. The floodplain grasslands and marshes adjacent to the wetlands also serve as crucial habitat for the Indian rhinoceros and the wild water buffalo.',
              [
                { redLinkIndex: 1 },
                ', in the upper Brahmaputra valley, is noted for its populations of feral horses and rare migratory birds. Aquatic life in the beels includes over 120 species of freshwater fish. The fisheries sustained by these wetlands are a primary source of protein for local communities and contribute significantly to the rural economy of the Brahmaputra valley.',
              ],
            ],
          },
          {
            heading: 'Conservation',
            paragraphs: [
              'Several wetlands in Assam fall within the boundaries of protected areas. Kaziranga National Park, a UNESCO World Heritage Site, encompasses large areas of riverine wetland and floodplain grassland. Manas National Park, another World Heritage Site, includes wetland zones along the Manas river.',
              [
                'Despite these protections, Assam\u2019s wetlands face ongoing threats from encroachment, siltation, invasive species such as water hyacinth, and changes in river hydrology. The ',
                { redLinkIndex: 2 },
                ' along the northern bank of the Brahmaputra have been identified as a priority area for floodplain restoration. Conservation efforts led by the Assam State Wetland Authority aim to balance ecological preservation with the needs of dependent communities.',
              ],
            ],
          },
        ],
        redLinks: [
          { id: 'dehing-patkai-national-park', label: 'Dehing Patkai National Park' },
          { id: 'dibru-saikhowa-biosphere-reserve', label: 'Dibru-Saikhowa Biosphere Reserve' },
          { id: 'orang-grasslands', label: 'Orang grasslands' },
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
          'Van G\u00F6l\u00FC havzas\u0131, T\u00FCrkiye\u2019nin do\u011Fu Anadolu B\u00F6lgesi\u2019nde yer alan ve d\u00FCnyan\u0131n en b\u00FCy\u00FCk soda g\u00F6l\u00FC olan Van G\u00F6l\u00FC\u2019n\u00FC \u00E7evreleyen co\u011Frafi aland\u0131r. G\u00F6l 3,755 km\u00B2 y\u00FCz\u00F6l\u00E7\u00FCm\u00FCyle T\u00FCrkiye\u2019nin en b\u00FCy\u00FCk g\u00F6l\u00FCd\u00FCr.',
          'Havza, y\u00FCksek da\u011Flar, volkanik arazi ve step bitki \u00F6rt\u00FCs\u00FCyle \u00E7evrilidir. B\u00F6lge, zengin ku\u015F \u00E7e\u015Fitlili\u011Fi, endemik inci kefali populasyonu ve Urartular\u2019dan kalan arkeolojik kal\u0131nt\u0131lar\u0131yla tan\u0131n\u0131r.',
        ],
        sections: [
          {
            heading: 'Co\u011Frafya',
            paragraphs: [
              'Van G\u00F6l\u00FC deniz seviyesinden 1,648 metre y\u00FCkseklikte, S\u00FCphan Da\u011F\u0131 ve Nemrut Da\u011F\u0131 gibi volkanik da\u011Flar\u0131n aras\u0131nda yer al\u0131r. G\u00F6l\u00FCn suyu a\u015F\u0131r\u0131 alkali olup pH de\u011Feri yakla\u015F\u0131k 9,8\u2019dir; bu \u00F6zellik g\u00F6l\u00FC bal\u0131k \u00E7e\u015Fitlili\u011Fi a\u00E7\u0131s\u0131ndan s\u0131n\u0131rland\u0131r\u0131r.',
              [
                'Havzaya d\u00F6k\u00FClen ba\u015Fl\u0131ca akarsular Bendimahi \u00C7ay\u0131, Zilan Deresi ve Karasu\u2019dur. Bu akarsular\u0131n ta\u015F\u0131d\u0131\u011F\u0131 tatl\u0131 su, ',
                { redLinkIndex: 0 },
                ' boyunca \u00FCreme alanlar\u0131na ula\u015Fan bal\u0131klar i\u00E7in hayati \u00F6nem ta\u015F\u0131r.',
              ],
            ],
          },
          {
            heading: 'Biyolojik \u00E7e\u015Fitlilik',
            paragraphs: [
              [
                'Van G\u00F6l\u00FC\u2019n\u00FCn en bilinen canl\u0131s\u0131, g\u00F6l\u00FCn alkali sular\u0131na uyum sa\u011Flam\u0131\u015F endemik bir t\u00FCr olan inci kefalidir (Alburnus tarichi). G\u00F6le komşu ',
                { redLinkIndex: 1 },
                ', alpin \u00E7ay\u0131rlardan subalpin ormanlara kadar geni\u015F bir habitat yelpazesine sahiptir. \u0130nci kefali her ilkbaharda tatl\u0131 su akarsular\u0131na g\u00F6\u00E7 ederek \u00FCrer.',
              ],
              'Havza ayr\u0131ca flamingo, angut ve akkuyruklu kartal gibi ku\u015F t\u00FCrlerine ev sahipli\u011Fi yapar. G\u00F6l\u00FCn g\u00FCneyindeki sulak alanlar, g\u00F6\u00E7men ku\u015Flar i\u00E7in \u00F6nemli konaklama noktalar\u0131d\u0131r.',
            ],
          },
          {
            heading: 'K\u00FClt\u00FCrel miras',
            paragraphs: [
              'Havzada Urartu uygarl\u0131\u011F\u0131na ait \u00F6nemli kal\u0131nt\u0131lar bulunur. Van Kalesi, \u0130\u00D6 9. y\u00FCzy\u0131lda in\u015Fa edilmi\u015F bir Urartu kalesidir ve g\u00F6l\u00FC \u00E7evreleyen en b\u00FCy\u00FCk arkeolojik yap\u0131lardan biridir.',
              [
                '\u00C7avu\u015Ftepe Kilisesi, 10. y\u00FCzy\u0131la ait bir Ermeni Havariler Kilisesi\u2019dir ve Akdamar Adas\u0131\u2019nda yer al\u0131r. B\u00F6lge ayr\u0131ca ',
                { redLinkIndex: 2 },
                ' ara\u015Ft\u0131rmalar\u0131 a\u00E7\u0131s\u0131ndan da \u00F6nem ta\u015F\u0131r; Van kedisi, farkl\u0131 renklerdeki g\u00F6zleriyle tan\u0131nan nadir bir ev kedisi t\u00FCr\u00FCd\u00FCr.',
              ],
            ],
          },
        ],
        redLinks: [
          { id: 'inci-kefali-goc-yollari', label: '\u0130nci kefali g\u00F6\u00E7 yollar\u0131' },
          { id: 'suphan-dagi-ekosistemi', label: 'S\u00FCphan Da\u011F\u0131 ekosistemi' },
          { id: 'van-kedisi-genetigi', label: 'Van kedisi geneti\u011Fi' },
        ],
      },
    ],
  },
  pt: {
    code: 'pt',
    label: 'Portugu\u00EAs',
    articles: [
      {
        id: 'amazonia-reserves',
        title: 'Reservas ecol\u00F3gicas da Amaz\u00F4nia',
        summary: [
          'As reservas ecol\u00F3gicas da Amaz\u00F4nia s\u00E3o \u00E1reas protegidas distribu\u00EDdas pela Floresta Amaz\u00F4nica nos estados do Amazonas, Par\u00E1, Amap\u00E1 e Rond\u00F4nia, entre outros. Juntas, cobrem mais de 120 milh\u00F5es de hectares e constituem a maior rede de \u00E1reas de conserva\u00E7\u00E3o florestal do mundo.',
          'Essas reservas abrigam uma biodiversidade extraordin\u00E1ria, incluindo esp\u00E9cies como a on\u00E7a-pintada, o boto-cor-de-rosa e o gavi\u00E3o-real. Al\u00E9m de sua import\u00E2ncia biol\u00F3gica, as reservas desempenham um papel fundamental na regula\u00E7\u00E3o do clima global ao armazenar bilh\u00F5es de toneladas de carbono.',
        ],
        sections: [
          {
            heading: 'Distribui\u00E7\u00E3o geogr\u00E1fica',
            paragraphs: [
              'A Floresta Amaz\u00F4nica se estende por nove pa\u00EDses da Am\u00E9rica do Sul, mas a maior parte de sua \u00E1rea est\u00E1 em territ\u00F3rio brasileiro. As reservas federais, estaduais e municipais variam em categoria, desde parques nacionais at\u00E9 reservas extrativistas e florestas nacionais.',
              [
                'Entre as maiores unidades de conserva\u00E7\u00E3o est\u00E3o a Esta\u00E7\u00E3o Ecol\u00F3gica de Anavilhanas, no Rio Negro, e a Reserva Biol\u00F3gica do Uatum\u00E3, ambas no estado do Amazonas. O ',
                { redLinkIndex: 0 },
                ', com seus 2,3 milh\u00F5es de hectares, \u00E9 a maior \u00E1rea protegida de floresta cont\u00EDnua da Amaz\u00F4nia.',
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
              [
                'Comunidades ind\u00EDgenas e ribeirinhas desempenham um papel essencial na fiscaliza\u00E7\u00E3o e preserva\u00E7\u00E3o dessas \u00E1reas. Programas de manejo comunit\u00E1rio, como os adotados na ',
                { redLinkIndex: 1 },
                ', t\u00EAm demonstrado resultados positivos na redu\u00E7\u00E3o do desmatamento.',
              ],
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
