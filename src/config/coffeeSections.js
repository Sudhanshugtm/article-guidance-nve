// ABOUTME: Outline sections for the Coffee article used in research prototype.
// ABOUTME: Mirrors articleSections.js structure with fill-in-the-blank templates.

/** Label used for inline citation superscripts. Change here to update everywhere. */
export const CITATION_LABEL = 'Add a citation'

const CITE = `[${CITATION_LABEL}]`

export const coffeeSections = [
  {
    title: 'Introduction',
    description: 'A short summary of the topic.',
    paragraphs: [
      {
        title: 'What coffee is',
        description: 'A brief description of coffee as a drink.',
        content: `{{Coffee}} is a brewed drink made from the roasted seeds of the {{plant name}} plant, native to {{region of origin}}.${CITE} It is one of the most popular beverages in the world, consumed by an estimated {{number of people}} people daily.${CITE}`,
      },
      {
        title: 'Why it matters',
        description: 'Its place in the world today.',
        content: `Coffee is the second most traded {{type of product}} in the world after {{comparison product}}.${CITE} The global coffee industry supports the livelihoods of approximately {{number of workers}} people across more than {{number of countries}} countries.${CITE}`,
      },
    ],
  },
  {
    title: 'History',
    description: 'Where coffee comes from and how it spread.',
    paragraphs: [
      {
        title: 'Early origins',
        description: 'How coffee was first discovered and used.',
        content: `Coffee was first discovered in {{country of origin}} around the {{century of discovery}}.${CITE} According to legend, a {{occupation of discoverer}} named {{legendary figure}} noticed that his goats became unusually energetic after eating berries from a certain tree.${CITE}`,
      },
      {
        title: 'Spread around the world',
        description: 'How coffee reached other continents.',
        content: `By the {{century of spread}}, coffee had reached {{first regions outside origin}} through trade routes.${CITE} The first European coffeehouses opened in {{first European city}} in the {{year or decade}}, and the drink quickly became a social and intellectual fixture across the continent.${CITE}`,
      },
    ],
  },
  {
    title: 'The coffee plant',
    description: 'What the plant looks like and where it grows.',
    paragraphs: [
      {
        title: 'Main varieties',
        description: 'The most common types of coffee plants.',
        content: `The two most widely grown species are {{first species common name}} and {{second species common name}}.${CITE} {{First species}} accounts for about {{percentage}}% of global production and is generally considered to have a smoother, more complex flavour.${CITE}`,
      },
      {
        title: 'Where it grows',
        description: 'The climate and regions suited for growing coffee.',
        content: `Coffee plants grow best in {{climate type}} climates between the Tropics of {{northern tropic}} and {{southern tropic}}, a region often called the {{nickname for region}}.${CITE} The largest producing countries today are {{top producer}}, {{second producer}}, and {{third producer}}.${CITE}`,
      },
    ],
  },
  {
    title: 'How coffee is made',
    description: 'From bean to cup.',
    paragraphs: [
      {
        title: 'Roasting',
        description: 'How green beans become the brown beans we recognise.',
        content: `After harvesting, coffee beans are {{initial processing step}} and then roasted at temperatures of {{temperature range}}.${CITE} Roasting transforms the green beans into the fragrant, {{colour}} beans used for brewing. The degree of roast — {{light roast name}}, {{medium roast name}}, or {{dark roast name}} — affects the final flavour.${CITE}`,
      },
      {
        title: 'Brewing methods',
        description: 'Common ways people prepare coffee to drink.',
        content: `Coffee can be brewed in many ways, including {{first method}}, {{second method}}, and {{third method}}.${CITE} Each method produces a different strength and flavour profile. {{Most popular method globally}} remains the most common preparation method worldwide.${CITE}`,
      },
    ],
  },
]
