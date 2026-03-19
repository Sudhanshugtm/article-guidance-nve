// ABOUTME: Turkish UI locale bundle for the article creation prototype.
// ABOUTME: Contains only user-facing chrome strings, not article body content.

import wikipediaWordmarkTrUrl from '@/assets/wikipedia-wordmark-tr.svg'

export default {
  reading: {
    wordmarkUrl: wikipediaWordmarkTrUrl,
    wordmarkAlt: 'Vikipedi',
    mainMenu: 'Ana men\u00fc',
    search: 'Ara',
    tagline: 'Vikipedi, \u00f6zg\u00fcr ansiklopedi',
    articleTab: 'Madde',
    talkTab: 'Tart\u0131\u015fma',
    redlinkExplain: 'Bu sayfa hen\u00fcz olu\u015fturulmad\u0131.',
    redlinkCreate: 'Sayfa olu\u015ftur',
    redlinkLeave: 'Hay\u0131r te\u015fekk\u00fcrler.',
  },

  flow: {
    hubSubtitle:
      'Madde olu\u015fturma ak\u0131\u015f\u0131n\u0131 ba\u015flatmak i\u00e7in bir dil se\u00e7in.',
    openArticleList: 'Madde listesini a\u00e7',
    back: 'Geri',
    articleListSubtitle: 'Okumak i\u00e7in bir madde se\u00e7in.',
  },

  toolbar: {
    close: 'Kapat',
    undo: 'Geri al',
    styleText: 'Metin stili',
    bold: 'Kal\u0131n',
    italic: '\u0130talik',
    cite: 'Kaynak',
    link: 'Ba\u011flant\u0131',
    switchEditor: 'D\u00fczenleyici de\u011fi\u015ftir',
    publish: 'Yay\u0131mla',
  },

  entryPoint: {
    addContent: '\u0130\u00e7erik ekle',
    editorPlaceholder: 'Yazmaya ba\u015flay\u0131n veya + simgesine dokunun',
    tapPrompt: 'Devam etmek i\u00e7in buraya dokunun\u2026',
  },

  rail: {
    outline: 'Ana hat',
    outlineDesc: 'Benzer maddelerden yararlan\u0131n',
    verifiedFacts: 'Do\u011frulanm\u0131\u015f bilgiler',
    verifiedFactsDesc: "Vikiveri'den",
    references: 'Kaynaklar',
    referencesDesc: 'Di\u011fer projelerde',
  },

  // Outline section titles and descriptions
  sections: [
    {
      title: 'Giri\u015f',
      description: 'Konunun k\u0131sa bir \u00f6zeti.',
      paragraphs: [
        {
          title: 'K\u0131sa genel bak\u0131\u015f',
          description: 'Konuya k\u0131sa bir giri\u015f.',
        },
        {
          title: 'K\u0131saca taksonomi',
          description: 'Bilimsel olarak nas\u0131l s\u0131n\u0131fland\u0131r\u0131l\u0131r.',
        },
      ],
    },
    {
      title: '\u00d6zellikler',
      description: 'Fiziksel \u00f6zellikler ve g\u00f6r\u00fcn\u00fcm.',
      paragraphs: [
        {
          title: 'V\u00fccut boyutu',
          description: 'Yeti\u015fkinlerin boyutlar\u0131 ve a\u011f\u0131rl\u0131\u011f\u0131.',
        },
        {
          title: 'K\u00fcrk ve i\u015faretler',
          description: 'K\u00fcrk rengi, \u00e7izgi deseni ve mevsimsel de\u011fi\u015fimler.',
        },
      ],
    },
    {
      title: 'Da\u011f\u0131l\u0131m ve ya\u015fam alan\u0131',
      description: 'Nerede ya\u015far ve \u00e7evresi.',
      paragraphs: [
        {
          title: 'Co\u011frafi da\u011f\u0131l\u0131m',
          description: 'Bulundu\u011fu \u00fclkeler ve b\u00f6lgeler.',
        },
        {
          title: 'Tercih edilen ya\u015fam alan\u0131',
          description:
            'Ya\u015fad\u0131\u011f\u0131 arazi ve bitki \u00f6rt\u00fcs\u00fc t\u00fcrleri.',
        },
      ],
    },
    {
      title: 'Ekoloji ve davran\u0131\u015f',
      description: 'Beslenme, aktivite ve sosyal davran\u0131\u015f.',
    },
  ],

  // Coffee article outline section titles, descriptions, and fill-in-the-blank content
  coffeeSections: [
    {
      title: 'Giriş',
      description: 'Konunun kısa bir özeti.',
      paragraphs: [
        {
          title: 'Kahve nedir',
          description: 'Kahvenin bir içecek olarak kısa tanımı.',
          content:
            'Kahve, {{region of origin}} kökenli {{plant name}} bitkisinin kavrulmuş tohumlarından hazırlanan bir içecektir.[Add a citation] Dünyada en çok tüketilen içeceklerden biri olup tahminen {{number of people}} kişi tarafından her gün içilmektedir.[Add a citation]',
        },
        {
          title: 'Neden önemlidir',
          description: 'Günümüz dünyasındaki yeri.',
          content:
            'Kahve, {{comparison product}} ürününden sonra dünyada en çok ticareti yapılan ikinci {{type of product}} ürünüdür.[Add a citation] Küresel kahve endüstrisi, {{number of countries}} ülkede yaklaşık {{number of workers}} kişinin geçimini desteklemektedir.[Add a citation]',
        },
      ],
    },
    {
      title: 'Tarihçe',
      description: 'Kahvenin nereden geldiği ve nasıl yayıldığı.',
      paragraphs: [
        {
          title: 'İlk kökenleri',
          description: 'Kahvenin ilk nasıl keşfedildiği ve kullanıldığı.',
          content:
            'Kahve ilk olarak {{century of discovery}} civarında {{country of origin}} ülkesinde keşfedilmiştir.[Add a citation] Efsaneye göre {{figure in the legend}} adlı bir {{occupation of discoverer}}, keçilerinin belirli bir ağacın meyvelerini yedikten sonra alışılmadık biçimde enerjik olduğunu fark etmiştir.[Add a citation]',
        },
        {
          title: 'Dünyaya yayılması',
          description: 'Kahvenin diğer kıtalara nasıl ulaştığı.',
          content:
            '{{century of spread}} itibarıyla kahve, ticaret yolları aracılığıyla {{first regions outside origin}} bölgesine ulaşmıştı.[Add a citation] İlk Avrupa kahvehaneleri {{year or decade}} yılında {{first European city}} şehrinde açıldı ve içecek kısa sürede kıtanın sosyal ve entelektüel yaşamının vazgeçilmez bir parçası haline geldi.[Add a citation]',
        },
      ],
    },
    {
      title: 'Kahve bitkisi',
      description: 'Bitkinin görünümü ve yetiştiği yerler.',
      paragraphs: [
        {
          title: 'Başlıca türler',
          description: 'En yaygın kahve bitkisi türleri.',
          content:
            'En yaygın yetiştirilen iki tür {{first species common name}} ve {{second species common name}} türleridir.[Add a citation] {{First species}}, küresel üretimin yaklaşık %{{percentage}} kadarını oluşturur ve genellikle daha yumuşak, daha karmaşık bir tada sahip olduğu kabul edilir.[Add a citation]',
        },
        {
          title: 'Nerede yetişir',
          description: 'Kahve yetiştirmeye uygun iklim ve bölgeler.',
          content:
            'Kahve bitkileri, {{northern tropic}} ve {{southern tropic}} dönenceleri arasındaki {{climate type}} iklimlerde yetişir; bu bölge genellikle {{nickname for region}} olarak adlandırılır.[Add a citation] Günümüzde en büyük üretici ülkeler {{top producer}}, {{second producer}} ve {{third producer}} ülkeleridir.[Add a citation]',
        },
      ],
    },
    {
      title: 'Hazırlama',
      description: 'Kahvenin içecek olarak nasıl hazırlandığı.',
      paragraphs: [],
    },
  ],

  outline: {
    addSectionLabel: '{section title} bölümünü ekle',
  },

  cite: {
    title: 'Kaynak ekle',
    automatic: 'Otomatik',
    automaticDesc:
      'Kaynak olu\u015fturmak i\u00e7in bir ba\u011flant\u0131 veya referans kodu (ISBN, DOI vb.) girin',
    create: 'Olu\u015ftur',
    placeholder: '\u00f6r. http://www.example.com',
    scanIsbn: 'ISBN barkodunu tara',
    manual: 'Manuel',
    website: 'Web sitesi',
    book: 'Kitap',
    news: 'Haber',
    journal: 'Dergi',
    basic: 'Temel',
    reuse: 'Yeniden kullan',
    reusePlaceholder: 'Mevcut kaynaklar i\u00e7inde ara',
    discover: 'Ke\u015ffet',
    discoverPlaceholder: 'Di\u011fer projelerde kaynak ara',
    filter: 'Filtrele',
    add: 'Ekle',
    read: 'Oku',
  },

  editChecks: {
    addReference: {
      title: 'Kaynak ekle',
      description: 'Bu paragraf yayımlamadan önce bir kaynağa ihtiyaç duyabilir.',
      addCitation: 'Kaynak ekle',
      reject: 'Hayır',
      reasonPrompt: 'Neden kaynak eklemiyorsunuz?',
      reasonTitle: 'Neden kaynak eklemiyorsunuz?',
      reasonDescription:
        'Diğer düzenleyiciler, bir kaynak eklememe kararınız hakkında daha fazla bilgi edinmeyi isteyecektir.',
      back: 'Geri',
      submit: 'Gönder',
      reasons: [
        { id: 'uncertain', label: 'Hangi kaynağı ekleyeceğimden emin değilim' },
        { id: 'common-knowledge', label: 'Eklediğim bilgi herkes tarafından biliniyor' },
        {
          id: 'irrelevant',
          label: 'Alıntıların yaptığım değişiklikle alakalı olduğunu düşünmüyorum',
        },
        { id: 'other', label: 'Diğer' },
      ],
    },
    tone: {
      title: 'Üslubu gözden geçir',
      description:
        'Diğer düzenleyiciler bu tür ifadeleri daha dengeli bir üslup için sık sık gözden geçirir.',
      learnMore: 'Daha fazla bilgi',
      revise: 'Gözden geçir',
      decline: 'Reddet',
      identifiedUsing: 'Şunu kullanarak tespit edildi:',
      modelLabel: 'BERT modeli',
    },
    pastedContent: {
      title: 'Yapıştırılan içerik',
      descriptionPrefix:
        'Başka kaynaklardan metin kopyalamaktan, yeniden ifade edilmiş veya kaynaklandırılmış olsa bile, lütfen kaçının. Bu durum',
      descriptionLinkText: 'telif hakkı ihlali veya intihal',
      descriptionSuffix:
        'olarak değerlendirilebilir ve içeriğinizin kaldırılmasına ya da hesabınızın engellenmesine neden olabilir.',
      question: 'Bu metni siz mi yazdınız?',
      keep: 'Evet, kalsın',
      remove: 'Hayır, kaldır',
    },
    completeSection: {
      title: 'Bölümü tamamla',
      description: 'Devam etmeden önce tüm eksik kısımları değiştirin veya kaldırın.',
      confirm: 'Anladım',
    },
  },

  counts: {
    reference: 'kaynak',
    references: 'kaynaklar',
  },
}
