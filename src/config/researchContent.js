// ABOUTME: Staged research content for the entry flow prototype.
// ABOUTME: One "Popular Beverages" article per language with Coffee as the red link.

// Paragraphs are either plain strings or arrays of segments.
// A segment is a string (rendered as text) or { redLinkIndex: N } (rendered as an inline red link
// referencing article.redLinks[N]).

export const researchContent = {
  en: {
    code: 'en',
    label: 'English',
    articles: [
      {
        id: 'popular-beverages',
        title: 'Popular beverages',
        summary: [
          'A beverage is a liquid intended for human consumption. In addition to satisfying thirst, beverages play important roles in culture, social gatherings, and daily routines around the world.',
          [
            'Common types include water, milk, tea, juice, and soft drinks. Among the most widely consumed is ',
            { redLinkIndex: 0 },
            ', a brewed drink prepared from roasted seeds of the Coffea plant, enjoyed by an estimated 2 billion people every day.',
          ],
        ],
        sections: [
          {
            heading: 'Non-alcoholic beverages',
            paragraphs: [
              [
                'Non-alcoholic beverages range from plain water to complex preparations like ',
                { redLinkIndex: 0 },
                ' and tea. Tea, made by steeping cured leaves in hot water, is the most consumed beverage in the world after water. Juice, extracted from fruits and vegetables, is valued for its nutritional content.',
              ],
              'Soft drinks, typically containing carbonated water and sweeteners, became widely popular in the 20th century. Hot chocolate, made from cocoa powder or melted chocolate, has been consumed since the ancient Maya and Aztec civilisations.',
            ],
          },
          {
            heading: 'Alcoholic beverages',
            paragraphs: [
              'Alcoholic beverages have been produced and consumed by humans since the Neolithic period. They are typically divided into three categories: beer, wine, and spirits. The production of alcoholic beverages is regulated in most countries.',
              'In many cultures, alcoholic drinks play a central role in social gatherings and ceremonies. The global trade in wine, beer, and spirits has shaped international commerce for centuries.',
            ],
          },
          {
            heading: 'Cultural significance',
            paragraphs: [
              [
                'Beverages are deeply embedded in cultural rituals across the world. The Japanese tea ceremony, the tradition of Turkish ',
                { redLinkIndex: 0 },
                ' reading, and the Brazilian ritual of sharing chimarrão all demonstrate how drinks serve as vehicles for social bonding and cultural identity.',
              ],
              'The global beverage industry is one of the largest economic sectors worldwide, supporting the livelihoods of hundreds of millions of people from farming communities to urban cafés.',
            ],
          },
        ],
        redLinks: [{ id: 'coffee', label: 'coffee' }],
      },
    ],
  },
  tr: {
    code: 'tr',
    label: 'Türkçe',
    articles: [
      {
        id: 'populer-icecekler',
        title: 'Popüler içecekler',
        summary: [
          'İçecek, insan tüketimi için hazırlanmış sıvılardır. Susuzluğu gidermenin ötesinde içecekler, kültürde, sosyal buluşmalarda ve günlük yaşamda önemli roller oynar.',
          [
            'Yaygın türler arasında su, süt, çay, meyve suyu ve gazlı içecekler bulunur. En çok tüketilen içeceklerden biri de ',
            { redLinkIndex: 0 },
            ' olup, Coffea bitkisinin kavrulmuş tohumlarından hazırlanan bu içecek dünya genelinde tahminen 2 milyar kişi tarafından her gün tüketilmektedir.',
          ],
        ],
        sections: [
          {
            heading: 'Alkolsüz içecekler',
            paragraphs: [
              [
                'Alkolsüz içecekler, sade sudan ',
                { redLinkIndex: 0 },
                ' ve çay gibi karmaşık hazırlıklara kadar geniş bir yelpazeyi kapsar. Çay, kurutulmuş yaprakların sıcak suda demlenmesiyle hazırlanır ve sudan sonra dünyada en çok tüketilen içecektir.',
              ],
              'Gazlı içecekler, genellikle karbonatlı su ve tatlandırıcı içeren içeceklerdir ve 20. yüzyılda yaygınlaşmıştır. Sıcak çikolata ise kakao tozu veya eritilmiş çikolatadan hazırlanır ve Maya ile Aztek uygarlıklarından bu yana tüketilmektedir.',
            ],
          },
          {
            heading: 'Alkollü içecekler',
            paragraphs: [
              'Alkollü içecekler, Neolitik dönemden bu yana insanlar tarafından üretilip tüketilmektedir. Genel olarak bira, şarap ve distile içkiler olmak üzere üç kategoriye ayrılır.',
              'Pek çok kültürde alkollü içecekler sosyal buluşmalarda ve törenlerde merkezi bir rol oynar. Şarap, bira ve distile içkilerin küresel ticareti yüzyıllar boyunca uluslararası ticareti şekillendirmiştir.',
            ],
          },
          {
            heading: 'Kültürel önemi',
            paragraphs: [
              [
                'İçecekler, dünya genelinde kültürel ritüellerin ayrılmaz bir parçasıdır. Japon çay töreni, Türk ',
                { redLinkIndex: 0 },
                ' geleneği ve Brezilya\u2019nın chimarrão paylaşma ritüeli, içeceklerin sosyal bağ kurma ve kültürel kimlik aracı olarak nasıl hizmet ettiğini gösterir.',
              ],
              'Küresel içecek sektörü, dünyanın en büyük ekonomik sektörlerinden biridir ve çiftçi topluluklarından şehir kafelerine kadar yüz milyonlarca insanın geçimini desteklemektedir.',
            ],
          },
        ],
        redLinks: [{ id: 'kahve', label: 'kahve' }],
      },
    ],
  },
  pt: {
    code: 'pt',
    label: 'Português',
    articles: [
      {
        id: 'bebidas-populares',
        title: 'Bebidas populares',
        summary: [
          'Uma bebida é um líquido destinado ao consumo humano. Além de saciar a sede, as bebidas desempenham papéis importantes na cultura, nos encontros sociais e nas rotinas diárias ao redor do mundo.',
          [
            'Os tipos mais comuns incluem água, leite, chá, suco e refrigerantes. Entre as mais consumidas está o ',
            { redLinkIndex: 0 },
            ', uma bebida preparada a partir das sementes torradas da planta Coffea, apreciada por cerca de 2 bilhões de pessoas todos os dias.',
          ],
        ],
        sections: [
          {
            heading: 'Bebidas não alcoólicas',
            paragraphs: [
              [
                'As bebidas não alcoólicas vão desde a água pura até preparações complexas como o ',
                { redLinkIndex: 0 },
                ' e o chá. O chá, feito pela infusão de folhas curadas em água quente, é a bebida mais consumida no mundo depois da água. Os sucos, extraídos de frutas e vegetais, são valorizados por seu conteúdo nutricional.',
              ],
              'Os refrigerantes, que normalmente contêm água gaseificada e adoçantes, tornaram-se amplamente populares no século XX. O chocolate quente, feito com cacau em pó ou chocolate derretido, é consumido desde as antigas civilizações maia e asteca.',
            ],
          },
          {
            heading: 'Bebidas alcoólicas',
            paragraphs: [
              'As bebidas alcoólicas são produzidas e consumidas pelo ser humano desde o período Neolítico. São geralmente divididas em três categorias: cerveja, vinho e destilados. A produção de bebidas alcoólicas é regulamentada na maioria dos países.',
              'Em muitas culturas, as bebidas alcoólicas desempenham um papel central em encontros sociais e cerimônias. O comércio global de vinho, cerveja e destilados moldou o comércio internacional por séculos.',
            ],
          },
          {
            heading: 'Significância cultural',
            paragraphs: [
              [
                'As bebidas estão profundamente enraizadas nos rituais culturais do mundo. A cerimônia do chá japonesa, a tradição do ',
                { redLinkIndex: 0 },
                ' turco e o ritual brasileiro de compartilhar chimarrão demonstram como as bebidas servem como veículos de vínculo social e identidade cultural.',
              ],
              'A indústria global de bebidas é um dos maiores setores econômicos do mundo, sustentando a subsistência de centenas de milhões de pessoas, desde comunidades agrícolas até cafés urbanos.',
            ],
          },
        ],
        redLinks: [{ id: 'cafe', label: 'café' }],
      },
    ],
  },
}
