/**
 * Article sections configuration
 * Defines the sections displayed as accordions in the editor rail.
 * Each paragraph's `content` is the text inserted into the editor when the card is clicked.
 */

export const articleSections = [
  {
    title: 'Introduction',
    description: 'A short summary of the topic.',
    paragraphs: [
      {
        title: 'Short overview',
        description: 'A brief introduction to the topic.',
        content:
          'The {{common name}} or {{alternative name}} is a {{taxonomic rank}} of the {{parent taxon common name}} subspecies {{binomial name}} native to {{taxon range}}. It once ranged throughout {{historical range}}.',
      },
      {
        title: 'Taxonomy in brief',
        description: 'How it is classified scientifically.',
        content:
          'The Siberian tiger was first described in 1844 by Coenraad Jacob Temminck under the scientific name Felis tigris altaica. It belongs to the family Felidae, order Carnivora, and is one of six living subspecies of tiger recognised today.',
      },
    ],
  },
  {
    title: 'Characteristics',
    description: 'Physical traits and appearance.',
    paragraphs: [
      {
        title: 'Body size',
        description: 'Dimensions and weight of adults.',
        content:
          'The Siberian tiger is the largest living cat and the largest living member of the genus Panthera. Males measure 195 to 230 centimetres in head-and-body length, with a tail of 95 to 115 centimetres. Adult males can weigh between 180 and 306 kilograms.',
      },
      {
        title: 'Coat and markings',
        description: 'Fur colour, stripe pattern and seasonal changes.',
        content:
          'Its coat is pale golden or rusty-yellow, with narrow black transverse stripes. The pattern of stripes is unique to each individual, much like human fingerprints. In winter the fur grows thicker and paler, helping the tiger blend into snow-covered forests.',
      },
    ],
  },
  {
    title: 'Distribution and habitat',
    description: 'Where it lives and its environment.',
    paragraphs: [
      {
        title: 'Geographic range',
        description: 'Countries and regions where the tiger is found.',
        content:
          'Today the Siberian tiger inhabits mainly the birch forests of the Sikhote-Alin mountain range in Primorsky and Khabarovsk Krais of the Russian Far East. A small population also persists in Hunchun National Nature Reserve in Jilin province, Northeast China.',
      },
      {
        title: 'Preferred habitat',
        description: 'Types of terrain and vegetation it occupies.',
        content:
          'It favours Korean pine broadleaf forests and temperate mixed forests with dense undergrowth and access to water. Elevation ranges from sea level to about 1 000 metres, though individuals have been recorded at higher altitudes during seasonal movements.',
      },
    ],
  },
  {
    title: 'Ecology and behaviour',
    description: 'Diet, activity and social behaviour.',
    // paragraphs: [
    //   {
    //     title: 'Hunting and diet',
    //     description: 'What it eats and how it catches prey.',
    //     content:
    //       'The Siberian tiger is an apex predator that hunts primarily ungulates such as red deer, wild boar, and sika deer. It stalks its prey silently through dense vegetation before launching a short, explosive charge, dispatching the quarry with a powerful bite to the neck.',
    //   },
    //   {
    //     title: 'Territory and social structure',
    //     description: 'How it marks and defends its home range.',
    //     content:
    //       'Adults are solitary and maintain large home ranges that they mark with urine, claw marks, and faeces. A male territory may overlap those of several females. Home ranges vary from 500 to over 4 000 square kilometres depending on prey density and habitat quality.',
    //   },
    // ],
  },
]
