/* ===== HVPE: EDIT THIS FILE to change products, prices, colours, store info ===== */
const STORE = {
  email: 'hello@hvpe.mu', phone: '+230 5000 0000',
  tiktok: 'https://www.tiktok.com/@hvpe_', instagram: 'https://www.instagram.com/hvpe.mu/'
};
const STORES = [
  { name: 'Desforges Plaza', address: 'SSR street, Desforges plaza, first floor',
    map: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249.9364272248096!2d57.50953637454101!3d-20.159530860539277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smu!4v1793167817176!5m2!1sen!2smu' },
  { name: 'Caudan Waterfront', address: 'Caudan Waterfront, Dias Piers building',
    map: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249.93298459326616!2d57.499548276078535!3d-20.161680400570475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smu!4v1793167911378!5m2!1sen!2smu' }
];
const LOCATIONS = {
  'Mauritius': { cur: 'Rs', rate: 1 }, 'Réunion': { cur: '€', rate: .021 },
  'France': { cur: '€', rate: .021 }, 'United Kingdom': { cur: '£', rate: .0175 }
};
const SIZES = { men: ['S', 'M', 'L', 'XL'], women: ['XS', 'S', 'M', 'L'] };

const C = (en, fr, hex) => ({ en, fr, hex });
const BLK = C('Black', 'Noir', '#151515'), WHT = C('White', 'Blanc', '#f4f4f2'),
  BONE = C('Bone', 'Écru', '#ece4d3'), CHAR = C('Charcoal', 'Anthracite', '#4c4c50'),
  FOR = C('Forest', 'Forêt', '#1f4d3a'), PORT = C('Port', 'Bordeaux', '#7a2f2c'),
  NAVY = C('Navy', 'Marine', '#1d2b45'), OLV = C('Olive', 'Olive', '#5a6140'),
  SAND = C('Sand', 'Sable', '#c8b48e'), SAGE = C('Sage', 'Sauge', '#a8b5a0'),
  GREY = C('Heather Grey', 'Gris chiné', '#aeb0b3'), SKY = C('Sky', 'Ciel', '#a9c0dd'),
  ROSE = C('Rose', 'Rose', '#d8a8a0'), INDI = C('Indigo', 'Indigo', '#44607e');

const P = (id, g, en, fr, price, colors, o = {}) =>
  ({ id, g, n: { en, fr }, price, colors, sizes: SIZES[g], sale: o.sale || 0, isNew: !!o.isNew });

const PRODUCTS = [
  P(1, 'men', 'Essential Tee', 'T-shirt essentiel', 600, [BLK, BONE, CHAR, FOR]),
  P(2, 'men', 'Overdyed Tee', 'T-shirt surteint', 1250, [CHAR, PORT], { sale: 950 }),
  P(3, 'men', 'Relaxed Hoodie', 'Sweat à capuche', 2200, [GREY, BLK, NAVY]),
  P(4, 'men', 'Oxford Shirt', 'Chemise oxford', 1600, [SKY, WHT], { sale: 1200 }),
  P(5, 'men', 'Cargo Shorts', 'Short cargo', 1400, [BLK, OLV, SAND]),
  P(6, 'men', 'Straight Chinos', 'Chino droit', 1800, [NAVY, SAND, BLK]),
  P(7, 'men', 'Crew Sweatshirt', 'Sweat col rond', 1900, [GREY, PORT, FOR], { isNew: true }),
  P(8, 'men', 'Linen Shirt', 'Chemise en lin', 1700, [WHT, SAGE, INDI]),
  P(9, 'men', 'Track Pants', 'Pantalon de jogging', 1500, [BLK, CHAR]),
  P(10, 'men', 'Light Jacket', 'Veste légère', 2900, [OLV, BLK], { isNew: true }),
  P(11, 'women', 'Boxy Tee', 'T-shirt carré', 650, [WHT, BLK, ROSE]),
  P(12, 'women', 'Rib Tank', 'Débardeur côtelé', 500, [BONE, BLK, SAGE], { sale: 400 }),
  P(13, 'women', 'Wide-Leg Trousers', 'Pantalon large', 2100, [BLK, SAND]),
  P(14, 'women', 'Slip Skirt', 'Jupe satinée', 1700, [SAND, BLK, FOR], { sale: 1300 }),
  P(15, 'women', 'Cropped Hoodie', 'Sweat court à capuche', 1900, [GREY, ROSE, BLK]),
  P(16, 'women', 'Linen Dress', 'Robe en lin', 2400, [BONE, SAGE, SAND], { isNew: true }),
  P(17, 'women', 'Knit Cardigan', 'Cardigan en maille', 2300, [BONE, CHAR]),
  P(18, 'women', 'High-Rise Jeans', 'Jean taille haute', 2200, [INDI, BLK], { sale: 1700 }),
  P(19, 'women', 'Wrap Blouse', 'Blouse portefeuille', 1600, [WHT, SKY]),
  P(20, 'women', 'Everyday Shorts', 'Short du quotidien', 1100, [BLK, BONE, NAVY])
];