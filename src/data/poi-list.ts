export const poisTypes = [
    {
      type: 'drinking_water',
      label: 'Fuente de Agua Potable',
      filterValues: ['amenity=drinking_water'],
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Ddrinking_water',
    },
    {
      type: 'mountain_peak',
      label: 'Cima de Montaña',
      filterValues: ['natural=peak'],
      checked: true,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag%3Anatural%3Dpeak',
    },
    {
      type: 'atm',
      label: 'Cajero Automático',
      filterValues: ['atm=yes', 'amenity=atm'],
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Datm',
    },
    {
      type: 'bank',
      filterValues: ['amenity=bank'],
      label: 'Banco',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dbank',
    },
    {
      type: 'bar',
      filterValues: ['amenity=bar'],
      label: 'Bar',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dbar',
    },
    /*{
        "type": "biergarten",
        "filterValues": [
            "amenity=biertgarten",
            "biertgarten=yes"
        ],
        "checked": false,
        "description": "",
        "url": "https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dbiergarten"
    },*/
    {
      type: 'cafe',
      filterValues: ['amenity=cafe'],
      label: 'Cafetería',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dcafe',
    },
    {
      type: 'fast_food',
      filterValues: ['amenity=fast_food'],
      label: 'Local de comida rápida',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Eo:Tag:amenity%3Dfast_food',
    },
    {
      type: 'ice_cream',
      filterValues: ['amenity=ice_cream'],
      label: 'Heladería',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dice_cream',
    },
    {
      type: 'pub',
      filterValues: ['amenity=pub'],
      label: 'Pub',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dpub',
    },
    {
      type: 'restaurant',
      filterValues: ['amenity=restaurant'],
      label: 'Restaurante',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Drestaurant',
    },
    {
      type: 'college',
      filterValues: ['amenity=college'],
      label: 'Educación Superior',
      checked: false,
      description: 'Campus o edificios de un instituto de educación superior',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dcollege',
    },
    {
      type: 'driving_school',
      filterValues: ['amenity=driving_school'],
      label: 'Auto Escuela',
      checked: false,
      description:
        'Autoescuela para poder sacar licencia de diferentes vehículos motorizados',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Ddriving_school',
    },
    {
      type: 'library',
      filterValues: ['amenity=library'],
      label: 'Biblioteca Pública',
      checked: false,
      description:
        'Una biblioteca pública (municipal, universitaria,…) para sacar libros en préstamo.',
      url: '',
    },
    {
      type: 'school',
      filterValues: ['amenity=school'],
      label: 'Colegio',
      checked: false,
      description: '',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dschool',
    },
    {
      type: 'university',
      label: 'Universidad',
      filterValues: ['amenity=university'],
      checked: false,
      description: '',
      url: '',
    },
    {
      type: 'education',
      label: 'Educación',
      filterValues: [
        'amenity=university',
        'amenity=school',
        'amenity=college',
        'amenity=music_school',
      ],
      checked: false,
      description:
        'En esta opción se añadirán colegios, escuelas, escuelas de música y universidades',
      url: '',
    },
    {
      type: 'language',
      label: 'Escuela de Idiomas',
      filterValues: ['amenity=language_school'],
      checked: false,
      description: 'Centros para aprender Idiomas',
      url: 'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dlanguage_school',
    },
    /*{
        "type": "bus",
        "filterValues": [
            "amenity=bus_station",
            "public_transport=station"
        ],
        "checked": false,
        "description": "",
        "url": ""
    },
    {
        "type": "car_wash",
        "filterValues": [
            "amenity=car_wash"
        ],
        "checked": false,
        "description": "",
        "url": "https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dcar_wash"
    },
    {
        "type": "gasoline",
        "filterValues": [
            "amenity=fuel"
        ],
        "checked": false,
        "description": "",
        "url": ""
    },*/
    {
      type: 'parking',
      label: 'Parking',
      filterValues: [
        'amenity=parking',
        'highway=service',
        'service=parking_aisle',
      ],
      checked: false,
      description: '',
      url: '',
    },
  ];
  