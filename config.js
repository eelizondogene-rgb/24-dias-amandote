const CONFIG = {
  year: 2026,
  releaseMonth: 12,
  releaseDay: 1,
  anniversary: '2026-01-17',
  reunion: '2025-12-20',
  preview: false,
  recipient: 'Christhian Ledezma',
  nickname: 'Mi precioso'
};

const TRACKS = {
  regalo: '2Ye46ZY2LKOQTPXaauQisB',
  adele: '5FgPwJ7Nh2FVmIXviKl2VF',
  intima: '16XiTUC2rQvb5lmtOm3FYY',
  uno: '7ricDBUakN3N0YkkKE8Obu',
  dos: '3n09XAEgP8s2gPXmdoUe2Z',
  playlist: '49ooEaT2f8pxNRg39kcC7x'
};

const MEDIA = {
  photos: {
    aniversario14: {src:'assets/fotos/14 DE FEBRERO.jpeg', title:'14 de febrero'},
    anillo: {src:'assets/fotos/ANILLO DE PROMESA.jpg', title:'Anillo de promesa'},
    concierto1: {src:'assets/fotos/CONCIERTO LENNY.jpeg', title:'Concierto de Lenny'},
    concierto2: {src:'assets/fotos/CONCIERTO LENNY 2.jpeg', title:'Concierto de Lenny'},
    cumple: {src:'assets/fotos/CUMPLEAÑOS MI AMOR.jpg', title:'Cumpleaños de mi amor'},
    detallesCitas: {src:'assets/fotos/DETALLES PRIMERA CITAS.jpeg', title:'Detalles de nuestras primeras citas'},
    escapadaLA: {src:'assets/fotos/ESCAPADA LOS ANGELES AZULES.jpeg', title:'Escapada a Los Ángeles Azules'},
    fotitoLinda: {src:'assets/fotos/FOTITO LINDA.jpg', title:'Fotito linda'},
    novioLoca: {src:'assets/fotos/FOTO DE MI NOVIO QUE ME VUELVE LOCA.jpg', title:'La foto tuya que me vuelve loca'},
    favoritaAmor: {src:'assets/fotos/FOTO FAVORITA DE MI AMOR.jpg', title:'Foto favorita de mi amor'},
    miradorFav: {src:'assets/fotos/FOTO FAVORITA EN EL MIRADOR.JPG', title:'Foto favorita en el mirador'},
    favoritaJuntos: {src:'assets/fotos/FOTO FAVORITA JUNTOS.jpg', title:'Foto favorita juntos'},
    miradorLinda: {src:'assets/fotos/FOTO LINDA EN EL MIRADOR.jpg', title:'Foto linda en el mirador'},
    playaLinda: {src:'assets/fotos/FOTO LINDA EN LA PLAYA.JPG', title:'Foto linda en la playa'},
    primeraSalida: {src:'assets/fotos/LA UNICA FOTO QUE TENGO DE LA PRIMERA VEZ QUE SALIMOS.JPG', title:'La única foto de la primera vez que salimos'},
    manuelAntonio: {src:'assets/fotos/MANUEL ANTONIO JUNTOS.jpeg', title:'Manuel Antonio juntos'},
    momentosMirador: {src:'assets/fotos/MOMENTOS MIRADOR.jpeg', title:'Momentos en el mirador'},
    paseoPlaya: {src:'assets/fotos/PASEO A LA PLAYA.jpeg', title:'Paseo a la playa'},
    parque1: {src:'assets/fotos/PRIMERA VEZ EN EL PARQUE DE DIVERSIONES.jpeg', title:'Primera vez en el Parque de Diversiones'},
    parque2: {src:'assets/fotos/PRIMERA VEZ EN EL PARQUE DE DIVERSIONES (2).jpeg', title:'Primera vez en el Parque de Diversiones 2'},
    primeraVez: {src:'assets/fotos/PRIMERA VEZ EN....JPG', title:'Primera vez juntos'},
    primerasCitas: {src:'assets/fotos/PRIMERAS CITAS.JPG', title:'Primeras citas'},
    primerasFotos: {src:'assets/fotos/PRIMERAS FOTOS JUNTOS.JPG', title:'Primeras fotos juntos'},
    carro: {src:'assets/fotos/SALANDO EL CARRO.JPG', title:'Salando el carro'},
    salidaComer: {src:'assets/fotos/SALIDA A COMER.JPG', title:'Salida a comer'},
    cine: {src:'assets/fotos/SALIDA AL CINE.jpg', title:'Salida al cine'},
    moto: {src:'assets/fotos/SALIDAS EN LA MOTO.PNG', title:'Salidas en la moto'},
    sanCarlos: {src:'assets/fotos/SAN CARLOS.jpeg', title:'San Carlos'},
    regresoViaje: {src:'assets/fotos/SORPRESA POR MI REGRESO DEL VIAJE.jpeg', title:'Sorpresa por mi regreso del viaje'},
    besito: {src:'assets/fotos/UN BESITO PARA MI AMOR.JPG', title:'Un besito para mi amor'},
    pulgui: {src:'assets/fotos/juntos de paseo con pulgui.jpeg', title:'Juntos de paseo con Pulgui'},
    misc1: {src:'assets/fotos/20220322_020236972_iOS.jpg', title:'Recuerdo especial'},
    misc2: {src:'assets/fotos/25101F73-1A46-4374-8307-1CD1ADB96A16_SnapseedCopy.jpg', title:'Recuerdo bonito'},
    misc3: {src:'assets/fotos/EA964C98-FB68-4E80-B860-B43C05FAEE5E.JPG', title:'Otro recuerdo juntos'}
  },
  videos: {
    trend1: {src:'assets/videos/VIDEO POR EL PRIMER MES.MOV', title:'Video por el primer mes'},
    trend2: {src:'assets/videos/VIDEO ESCAPADA A HERRADURA.MOV', title:'Video de escapada a Herradura'},
    sanCarlos: {src:'assets/videos/VIDEO DE SAN CARLOS.MOV', title:'Video de San Carlos'},
    poas: {src:'assets/videos/VIDEO PASEO AL POAS.MOV', title:'Video del paseo al Poás'}
  },
  gallery: ['primeraSalida','primerasFotos','primerasCitas','detallesCitas','miradorFav','miradorLinda','momentosMirador','sanCarlos','paseoPlaya','playaLinda','manuelAntonio','moto','parque1','parque2','cumple','concierto1','concierto2','aniversario14','anillo','carro','salidaComer','cine','pulgui','regresoViaje','besito','favoritaJuntos','novioLoca','favoritaAmor','fotitoLinda','primeraVez','escapadaLA','misc1','misc2','misc3']
};

const DAYS = [
  {
    title:'Bienvenido, mi precioso',
    body:'Mi amor, este año quería regalarte algo que nadie más pudiera tener. Así que hice lo que mejor sé hacer: programarte un pedacito de mi corazón. Cada día vas a encontrar algo que me recuerda a vos. Espero que lo disfrutés tanto como yo disfruté imaginarlo.',
    type:'letter'
  },
  {
    title:'De la escuela a nosotros',
    body:'Éramos compañeros en la escuela. Nos gustábamos, pero nunca fuimos nada. Años después, con 22 los dos, ya habiendo cerrado otras historias, salimos un día a hablar como amigos… y no nos separamos más. Desde ese 20 de diciembre de 2025, mi vida cambió para bonito.',
    type:'gallery',
    media:['primeraSalida','primerasFotos','primerasCitas','detallesCitas']
  },
  {
    title:'Besitos ilimitados',
    body:'Válido para todos los besitos que quieras. Sin fecha de vencimiento, sin límite de uso y sin devoluciones.',
    type:'coupon',
    coupon:'Besitos ilimitados'
  },
  {
    title:'¿Cuánto me conocés?',
    body:'A ver, mi precioso, demostrame cuánto sabés de nosotros.',
    type:'quiz'
  },
  {
    title:'Te regalo',
    body:'Esta canción de Carla Morrison para mí es súper especial. Te la dedico porque me nace regalarte mi cariño, mi paz, mis días y todo lo lindo que siento cuando estoy con vos.',
    type:'song',
    track:'regalo'
  },
  {
    title:'Memoria de nosotros',
    body:'Encontrá las parejas. Si perdés, me debés un beso; si ganás, también.',
    type:'memory'
  },
  {
    title:'Nuestro mirador',
    body:'Me encantaba ir al mirador con vos. Fueron de nuestras primeras citas y se sentía mágico. Era de esos lugares donde parecía que todo se quedaba en pausa solo para dejarnos existir juntos.',
    type:'gallery',
    media:['miradorFav','miradorLinda','momentosMirador']
  },
  {
    title:'Un trend para vos',
    body:'Quería guardarte un pedacito de nosotros en movimiento. Este video es para que lo veás y sonriás pensando en lo bonito que ha sido compartir este tiempo con vos.',
    type:'video',
    media:['trend1']
  },
  {
    title:'Una aventura con Chimuelo',
    body:'Como sé que te encanta Chimuelo y Cómo entrenar a tu dragón, te preparé este minijuego para recoger corazones con nuestro pequeño dragón favorito.',
    type:'dragon'
  },
  {
    title:'Diez cosas que amo de vos',
    body:'1. Tu compañía.\n2. Tu sentido del humor.\n3. Tus abrazos.\n4. Tu sonrisa.\n5. Compartir videojuegos con vos.\n6. Nuestras conversaciones.\n7. Tu lado aventurero.\n8. Las ganas que siempre tengo de verte.\n9. La confianza que vamos construyendo.\n10. Y sobre todo, que seas vos.',
    type:'letter'
  },
  {
    title:'Noche gamer',
    body:'Cupón para una noche de videojuegos juntos. Incluye risas, competencia y la posibilidad altísima de decir “quiteypone”.',
    type:'coupon',
    coupon:'Noche de videojuegos juntos'
  },
  {
    title:'San Carlos',
    body:'Nuestra escapada a San Carlos fue divertida y de miedo al mismo tiempo porque iba sin que mis papás supieran, pero sigue siendo uno de los viajes más lindos que he tenido. Tener esa aventura con vos la hace todavía más especial.',
    type:'mixed',
    photos:['sanCarlos'],
    videos:['sanCarlos']
  },
  {
    title:'Make You Feel My Love',
    body:'Mi precioso, esta canción es de esas que me cuesta escuchar sin pensar en vos. Quiero que la disfrutés mientras leés unas palabras que escribí especialmente para acompañarla.',
    type:'adele'
  },
  {
    title:'Solo vos y yo',
    body:'Hay momentos en los que siento que no necesito decir nada. Estar cerca de vos, abrazarte y sentir esa conexión tan nuestra es suficiente. Esta canción me recuerda uno de esos momentos lindos e íntimos que guardo con muchísimo cariño.',
    type:'song',
    track:'intima'
  },
  {
    title:'Armá nuestro recuerdo',
    body:'Deslizá las piezas para reconstruir una de mis fotos favoritas de nosotros.',
    type:'puzzle',
    photo:'favoritaJuntos'
  },
  {
    title:'Masajito para mi precioso',
    body:'Canjeable por un masaje, abrazos y una noche de consentirte como te lo merecés.',
    type:'coupon',
    coupon:'Masaje, abrazos y mimos'
  },
  {
    title:'El tiempo con vos',
    body:'Qué bonito contar el tiempo desde que comenzamos esta historia. Y qué bonito pensar en todo lo que todavía nos falta vivir.',
    type:'counter'
  },
  {
    title:'Rápidos y enamorados',
    body:'Un minijuego inspirado en tu gusto por los carros y Rápidos y Furiosos. Esquivá obstáculos y tratá de llegar lo más lejos posible.',
    type:'race'
  },
  {
    title:'Quiteypone',
    body:'Todavía me da risa pensar que una tontera nacida en un videojuego terminó convirtiéndose en un recuerdo tan nuestro. Gracias por hacerme reír y por llenar de significado hasta las palabras más raras.',
    type:'letter'
  },
  {
    title:'Un año desde aquel día',
    body:'Hoy se cumple un año desde aquel 20 de diciembre de 2025 en que salimos “como amigos” y ya no nos volvimos a separar. Gracias por aquella salida, por escucharme, por quedarte y por convertir ese día en el comienzo de algo tan bonito.',
    type:'gallery',
    media:['primeraSalida','primeraVez','favoritaJuntos']
  },
  {
    title:'Otro pedacito de nosotros',
    body:'Un segundo video para este diciembre. Porque vernos juntos también es una forma de volver a sentir todo lo lindo que vivimos.',
    type:'video',
    media:['trend2']
  },
  {
    title:'La banda sonora de nosotros',
    body:'Hay canciones que dejaron de ser solo canciones desde que llegaste. Esta playlist es un lugarcito donde guardo muchísimas emociones y momentos que me recuerdan a vos.',
    type:'playlist'
  },
  {
    title:'Todo lo que nos falta',
    body:'Más viajes, más miradores, más videojuegos, más salidas en moto, más escapadas improvisadas, más días tranquilos y más recuerdos que todavía ni imaginamos. No necesito que todo sea perfecto; quiero seguir construyendo una vida llena de momentos bonitos con vos.',
    type:'letter'
  },
  {
    title:'Feliz Navidad, mi precioso',
    body:'Si pudiera volver a aquella salida del 20 de diciembre, volvería a elegir conocerte de nuevo. Gracias por este año, por las risas, por las aventuras, por cada beso, por la paciencia y por dejarme quererte así. Mi regalo no son solamente estas 24 sorpresas; es la intención de recordarte todos los días que te amo. Feliz Navidad, Christhian. Te amo por siempre y para siempre.',
    type:'final',
    photos:['favoritaJuntos','favoritaAmor','besito','novioLoca'],
    videos:['poas']
  }
];
