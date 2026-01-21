const products = [
  {
    id: 1,
    name: 'Dear Scrub Body Scrub Coffee',
    imageCredit:'Dear Scrub',
    imageCreditUrl: 'https://unsplash.com/photos/a-jar-of-peanut-butter-and-a-spoon-7m-aAY8fLrE?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/dear_scrub_coffee.png',
      width: 2936,
      height: 2936,
      alt: 'En transparant glasburk med fylld med mörkt kroppsskrubb med doft av kaffe. En träsked bredvid visar skrubbens konsistens.',
    },
    price: 109,
    rating: 5,
    category: 'Body Scrubs'
  },
  {
    id: 2,
    name: 'Dear Scrub Body Scrub Sea Salt Rose',
    imageCredit:'Dear Scrub',
    imageCreditUrl: 'https://unsplash.com/photos/a-jar-of-peanut-butter-and-a-spoon-kZLqQNYpeWI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/dear_scrub_ss_rose.png',
      width: 3070,
      height: 3070,
      alt: 'En transparant glasburk fylld med kroppsskrubb med doft av ros. En liten träsked visar det rosaaktiga saltet.',
    },
    price: 109,
    rating: 4.5,
    category: 'Body Scrubs'
  },
  {
    id: 3,
    name: 'Dear Scrub Body Scrub Sea Salt Lavender',
    imageCredit:'Dear Scrub',
    imageCreditUrl: 'https://unsplash.com/photos/a-bottle-of-medicine-GEGPGa7lYMc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/dear_scrub_ss_lavender.png',
      width: 3330,
      height: 3330,
      alt: 'En transparant glasburk med lavendelsalt-skrubb och en träsked i förgrunden fylld med grovt vitt salt mot en ljusgrå bakgrund.',
    },
    price: 109,
    rating: 3.5,
    category: 'Body Scrubs'
  },
  {
    id: 4,
    name: 'Luma Capella doftljus',
    imageCredit:'Luma Candles',
    imageCreditUrl: 'https://unsplash.com/photos/black-round-container-on-white-tissue-paper-B0G8xzwTVWc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/luma_capella_candle.png',
      width: 3745,
      height: 2500,
      alt: 'Ett stort doftljus med tre vekar i en brun glasbehållare. Locket ligger bredvid på en ljus stenyta.',
    },
    price: 89,
    rating: 4,
    category: 'Doftljus'
  },
  {
    id: 5,
    name: 'Luma Akasha doftljus',
    imageCredit:'Luma Candles',
    imageCreditUrl:'https://unsplash.com/photos/black-and-white-coffee-cup-Br2BwCBA-s0?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/luma_akasha_candle.png',
      width: 3500,
      height: 2500,
      alt: 'En minimalistisk brun glasburk med vitt vax och en enkel veke mot en ljus bakgrund. Den vita etiketten på glasburkens sida har texten Luma Akasha i modern stil.',
    },
    price: 69,
    rating: 3,
    category: 'Doftljus'
  },
  {
    id: 6,
    name: 'Candelio Candles Waste a Moment doftljus',
       imageCredit: 'Anja Broger',
    imageCreditUrl:'https://unsplash.com/photos/a-person-holding-a-wooden-spoon-over-a-jar-rbS6bh_ODf4?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/cc_waste_a_moment_candle.png',
      width: 2000,
      height: 2500,
      alt: 'Ett brunt glasljus med vit etikett där det står Waste a Moment. En hand håller en brinnande tändsticka över veken mot en ljus bakgrund'
    },
    price: 79,
    rating: 4,
    category: 'Doftljus'
  },
  {
    id: 7,
    name: 'Candelio Candles Palo Santo doftljus',
    imageCredit: 'Anja Broger',
    imageCreditUrl:'https://unsplash.com/photos/a-candle-sitting-on-top-of-a-wooden-table-O6wfVFUxMMo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/cc_palo_santo_candle.png',
      width: 2000,
      height: 2500,
      alt: 'Doftljuset Palo Santo i en brun glasburk med vit etikett. Står placerat på ett träfat med kottar och bitar av trä runt omkring."',
    },
    price: 79,
    rating: 5,
    category: 'Doftljus'
  },
  {
    id: 8,
    name: 'Luvia Midnight Swirl',
    imageCredit: 'Sincerely Media',
    imageCreditUrl:'https://unsplash.com/photos/a-couple-of-soaps-sitting-on-top-of-a-table-JHTRaBNbb-A?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/luvia_midnight_swirl_soap.png',
      width: 2000,
      height: 2500,
      alt: 'Två bitar lyxig tvål med ett mörkt marmormönster i svart, grått och vitt',
    },
    price: 129,
    rating: 5,
    category: 'Tvåler'
  },
  {
    id: 9,
    name: 'Luvia Lavender Field Bliss',
    imageCredit: 'Sincerely Media',
    imageCreditUrl:'https://unsplash.com/photos/purple-and-white-floral-ornament-vuZeirpqmmo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/luvia_lavender_soap.png',
      width: 2000,
      height: 2500,
      alt: 'Tre bitar staplad handgjord lavendeltvål i en mjuk lila nyans, dekorerad med torkade lavendelblommor på toppen.',
    },
    price: 129,
    rating: 2,
    category: 'Tvåler'
  },
  {
    id: 10,
    name: 'Luvia Wildflower Petals',
    imageCredit: 'Sincerely Media',
    imageCreditUrl:'https://unsplash.com/photos/white-and-pink-cake-on-white-table-MWcwKjwY8yo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    img: {
      src: './img/luvia_wildflower_soap.png',
      width: 2000,
      height: 2500,
      alt: 'Två bitar krämvit hadngjord tvål med små bitar av torkade rosa och lila blomblad inuti.',
    },
    price: 129,
    rating: 5,
    category: 'Tvåler'
  }
];

export default products;