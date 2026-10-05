const piqueImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBdf6hBJkWqggSkEPhd0JE9tW8vvNpjhIRo4JhoOYq1OsqgCKffZ1xlbGntPD25Qf24fOr1nWtUHgCcgV8d6aAmAPVxY-iVlFUelBRSlNoOnXpR_frGUHrZGrRJXSa7u5H7v-QByTj73luX9O5ama7JdIPsnTtguy7wnhALP032vYzROaFusnrKm9EfLPyC6SNS0XBjdFHiDQ6ZDA-65uaLSwbccF2QSG2If2AuWOV8iv8cz6T8gDlsvg'

export const products = [
  {
    name: 'Pique Macho',
    category: 'cochala',
    price: 25,
    image: piqueImage,
    description: 'Carne de res, papas fritas, salchicha, tomate, locoto y huevo frito.',
    details: 'Carne de res a la plancha, papas fritas, salchicha, tomate, cebolla, locoto y huevo frito, con un toque picante. El plato bandera de Cochabamba, ideal para compartir.',
    ingredients: 'Carne de res, papas fritas, salchicha, tomate, cebolla, locoto y huevo frito, con un toque picante.',
    origin: 'El plato bandera de Cochabamba, presente en la Cancha y en los restaurantes del centro.',
  },
  {
    name: 'Majadito Batido',
    category: 'cochala',
    price: 35,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Majadito_con_carne_de_res.jpg',
    description: 'Arroz batido con charque, huevo frito y plátano.',
    details: 'Arroz batido con charque deshilachado, huevo frito, plátano frito y sazón boliviana. Un clásico reconfortante y abundante.',
    ingredients: 'Arroz batido con charque deshilachado, huevo frito y plátano frito.',
    origin: 'Un clásico boliviano, abundante y reconfortante.',
  },
  {
    name: 'Charque',
    category: 'cochala',
    price: 18,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charquic%C3%A1n_Cochabambino.jpg',
    description: 'Charque de res con quesillo, papa, mote y llajua.',
    details: 'Carne de res deshidratada y desmenuzada, servida con quesillo, papa boliviana, mote de maíz y llajua.',
    ingredients: 'Carne de res deshidratada y desmenuzada, quesillo, papa, mote de maíz y llajua.',
    origin: 'Se disfruta en las picanterías tradicionales de Cochabamba.',
  },
  {
    name: 'Silpancho',
    category: 'paceño',
    price: 30,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Silpancho_Cochabambino.jpg',
    description: 'Carne apanada con arroz, papa, huevo y sarsa fresca.',
    details: 'Carne apanada y frita sobre una base de arroz y papa, coronada con huevo frito y sarza fresca de tomate, cebolla y locoto.',
    ingredients: 'Carne apanada y frita, arroz, papa, huevo frito y ensalada fresca.',
    origin: 'Muy popular en la avenida Ballivián y los mercados del centro.',
  },
  {
    name: 'Mocochinchi',
    category: 'bebida',
    price: 8,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Refresco_de_mocochinchi.jpg',
    description: 'Refresco tradicional de durazno, canela y clavo de olor.',
    details: 'Refresco tradicional boliviano hecho con duraznos deshidratados, canela y clavo de olor. Dulce, frío y muy refrescante.',
    ingredients: 'Duraznos deshidratados, canela y clavo de olor.',
    origin: 'Una bebida tradicional boliviana, dulce y refrescante.',
  },
  {
    name: 'Combo Cochala',
    category: 'combo',
    price: 55,
    image: piqueImage,
    description: 'Pique Macho acompañado de dos refrescos de mocochinchi.',
    details: '1 Pique Macho + 2 refrescos de mocochinchi. Ideal para compartir entre dos personas.',
    ingredients: 'Un Pique Macho y dos refrescos de mocochinchi.',
    origin: 'Una combinación para compartir entre dos personas.',
  },
  {
    name: 'Salteña de Pollo',
    category: 'cochala',
    price: 10,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Salte%C3%B1as_de_pollo.jpg',
    description: 'Empanada horneada rellena de un jugoso guiso de pollo.',
    details: 'Empanada horneada de masa dulce y crocante, rellena de un jugoso guiso de pollo, papa, huevo duro y aceituna.',
    ingredients: 'Pollo, papa, huevo duro y aceituna en una masa dulce y crocante.',
    origin: 'Un clásico boliviano para disfrutar a cualquier hora.',
  },
]

export const featuredProductNames = ['Pique Macho', 'Majadito Batido', 'Charque']
export const flavorProductNames = ['Pique Macho', 'Silpancho', 'Charque']
export const menuProductNames = [
  'Pique Macho',
  'Silpancho',
  'Charque',
  'Mocochinchi',
  'Combo Cochala',
  'Salteña de Pollo',
]

export const categories = [
  { title: 'Platos típicos', subtitle: 'Cochabambinos', icon: 'lunch_dining', href: '#menu' },
  { title: 'Platos típicos', subtitle: 'Paceños', icon: 'restaurant', href: '#menu' },
  { title: 'Bebidas', subtitle: 'Refrescantes', icon: 'local_drink', href: '#menu' },
  { title: 'Combos', subtitle: 'Para compartir', icon: 'takeout_dining', href: '#promociones' },
]

export const menuFilters = [
  { label: 'Todos', value: 'todos' },
  { label: 'Cochabamba', value: 'cochala' },
  { label: 'Paceños', value: 'paceño' },
  { label: 'Bebidas', value: 'bebida' },
  { label: 'Combos', value: 'combo' },
]

export const promotions = [
  {
    name: 'Combo Cochala Para Dos',
    tag: 'Promo del día',
    title: 'Combo Cochala para dos',
    description: 'Un Pique Macho y dos refrescos de mocochinchi. ¡Ideal para compartir!',
    price: 55,
    previousPrice: 65,
    image: piqueImage,
    details: '1 Pique Macho + 2 refrescos de Mocochinchi, en promo del día. ¡Ideal para compartir!',
  },
  {
    name: 'Promo 2 Platos + 2 Bebidas',
    tag: 'Para compartir',
    title: '2 platos + 2 bebidas',
    description: 'Elige tus platos favoritos y acompáñalos con nuestras bebidas.',
    price: 50,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charquic%C3%A1n_Cochabambino.jpg',
    details: 'Elige 2 platos de nuestro menú más 2 bebidas a tu gusto. La opción perfecta para compartir. Precio desde Bs. 50 según los platos elegidos.',
  },
]

export const cityCarousels = [
  {
    label: 'Íconos de Cochabamba',
    slides: [
      { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cristo_de_la_Concordia_-_Cochabamba.jpg', caption: 'Cristo de la Concordia' },
      { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pareja_de_loros_en_la_plaza_Col%C3%B3n_en_Cochabamba%2C_el_a%C3%B1o_2019.jpg', caption: 'Plaza Colón' },
      { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Palacio_Portales_-_Cochabamba_-_Bolivia.jpg', caption: 'Palacio Portales' },
    ],
  },
  {
    label: 'Mercados y calles de Cochabamba',
    slides: [
      { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mercado_25_de_Mayo._MM.jpg', caption: 'Mercado La Cancha' },
      { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paseo_del_Prado%2C_Cochabamba.jpg', caption: 'El Prado' },
      { image: 'https://commons.wikimedia.org/wiki/Special:FilePath/La_bouch%C3%A8re_de_Cochabamba._01.jpg', caption: 'Picanterías tradicionales' },
    ],
  },
]

export const steps = [
  { icon: 'list_alt', title: 'Elige', description: 'tu producto favorito.' },
  { icon: 'price_check', title: 'Revisa', description: 'precio y disponibilidad.' },
  { icon: 'chat', title: 'Realiza tu pedido', description: 'por WhatsApp.' },
]

export const whatsappNumber = '59170700000'
