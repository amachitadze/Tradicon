/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const LOGO_URLS = {
    es: 'https://i.postimg.cc/L8PF2rq9/Logo-ENG-full-B.png',
    ka: 'https://i.postimg.cc/6pXY4Sj5/Logo_GEO_full_B.png'
};

// --- i18n Translations ---
const translations = {
    es: {
        pageTitle: "Conjugador y Diccionario",
        headerTitle: "CONJUGADOR",
        dictionaryHeaderTitle: "DICCIONARIO",
        inputPlaceholder: "Escribe un verbo en español...",
        dictionaryInputPlaceholder: "Escribe una palabra...",
        submitButton: "Conjugar",
        dictionarySubmitButton: "Buscar",
        placeholderText: "Introduce un verbo para ver sus conjugaciones.",
        dictionaryPlaceholderText: "Introduce una palabra para ver su definición.",
        conjugatingText: "Conjugando...",
        searchingText: "Buscando...",
        errorPrefix: "Error",
        errorDefault: "Ocurrió un error. Por favor, inténtalo de nuevo.",
        popularTab: "Populares",
        favoritesTab: "Favoritos",
        recentsTab: "Recientemente",
        favoritesEmptyConjugator: "Añade verbos a favoritos con la estrella ★",
        favoritesEmptyDictionary: "Añade palabras a favoritos con la estrella ★",
        recentsEmpty: "Tu historial de búsqueda aparecerá aquí.",
        favoriteAriaLabelAdd: "Añadir a favoritos",
        favoriteAriaLabelRemove: "Quitar de favoritos",
        exampleLabel: "Ejemplo",
        closeAriaLabel: "Cerrar",
        infinitiveCard: "Infinitivo",
        gerundCard: "Gerundio",
        participleCard: "Participio",
        footerMaterials: 'Materiales de apoyo: <a href="https://es-avma.blogspot.com/" target="_blank" rel="noopener noreferrer">es-avma.blogspot.com</a>',
        logoAltText: "Logo de Avtandil Machitadze",
        footerGeminiCredit: 'El sitio se basa en la inteligencia artificial de Gemini.',
        conjugatorTab: "Conjugador",
        dictionaryTab: "Diccionario",
        definitionLabel: "Definición",
        synonymsLabel: "Sinónimos",
        antonymsLabel: "Antónimos",
        examplesLabel: "Ejemplos",
        tenseExplanations: {
            infinitivo: {
                title: "Infinitivo",
                explanation: "El infinitivo es la forma básica y no conjugada de un verbo. En español, los infinitivos siempre terminan en -ar, -er, o -ir. Funciona como el 'nombre' del verbo y se puede usar como un sustantivo, después de otros verbos conjugados, o en construcciones perifrásticas.",
                adverbsTitle: "Uso",
                adverbs: "No se asocia con marcadores temporales específicos.",
                examplesTitle: "Ejemplos de Uso",
                examples: { ar: "<strong>Cantar</strong> es divertido.", er: "Quiero <strong>comer</strong> paella.", ir: "Voy a <strong>vivir</strong> en Madrid." }
            },
            gerundio: {
                title: "Gerundio",
                explanation: "El gerundio expresa una acción en progreso o continua. Es el equivalente al '-ing' en inglés. Se forma añadiendo -ando a la raíz de los verbos -ar, y -iendo a la raíz de los verbos -er e -ir. Se usa comúnmente con el verbo 'estar' para formar los tiempos progresivos.",
                adverbsTitle: "Marcadores Comunes",
                adverbs: "mientras, actualmente, en este momento.",
                examplesTitle: "Ejemplos de Uso",
                examples: { ar: "Estoy <strong>hablando</strong> por teléfono.", er: "Estamos <strong>comiendo</strong> juntos.", ir: "Sigue <strong>viviendo</strong> con sus padres." }
            },
            participio: {
                title: "Participio Pasado",
                explanation: "El participio pasado se usa principalmente para formar los tiempos compuestos (como el Pretérito Perfecto) junto con el verbo auxiliar 'haber'. También puede funcionar como un adjetivo para describir un estado o condición resultante de una acción. Los participios regulares terminan in -ado para verbos -ar, y en -ido para verbos -er e -ir.",
                adverbsTitle: "Marcadores Comunes",
                adverbs: "ya, todavía, nunca (en tiempos compuestos).",
                examplesTitle: "Ejemplos de Uso",
                examples: { ar: "He <strong>hablado</strong> con ella.", er: "La comida está <strong>comida</strong>.", ir: "Hemos <strong>vivido</strong> muchas aventuras." }
            },
            presente: {
                title: "Presente de Indicativo",
                explanation: "El Presente de Indicativo se usa para expresar acciones que ocurren en el momento actual, acciones habituales, verdades universales o para describir características permanentes.",
                adverbsTitle: "Marcadores Temporales Comunes",
                adverbs: "ahora, hoy, siempre, nunca, todos los días, a menudo, a veces.",
                examplesTitle: "Terminaciones Regulares",
                examples: { hablar: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"], comer: ["como", "comes", "come", "comemos", "coméis", "comen"], vivir: ["vivo", "vives", "vive", "vivimos", "vivís", "viven"] }
            },
            preterito_perfecto: {
                title: "Pretérito Perfecto Compuesto",
                explanation: "El Pretérito Perfecto se utiliza para hablar de acciones pasadas que tienen alguna conexión con el presente o que ocurrieron en un período de tiempo que aún no ha terminado.",
                adverbsTitle: "Marcadores Temporales Comunes",
                adverbs: "hoy, esta mañana, esta semana, este mes, este año, ya, todavía no, alguna vez.",
                examplesTitle: "Terminaciones Regulares",
                examples: { hablar: ["he hablado", "has hablado", "ha hablado", "hemos hablado", "habéis hablado", "han hablado"], comer: ["he comido", "has comido", "ha comido", "hemos comido", "habéis comido", "han comido"], vivir: ["he vivido", "has vivido", "ha vivido", "hemos vivido", "habéis vivido", "han vivido"] }
            },
            preterito_indefinido: {
                title: "Pretérito Perfecto Simple (Indefinido)",
                explanation: "El Pretérito Indefinido se usa para describir acciones que ocurrieron y terminaron en un momento específico del pasado, sin conexión con el presente.",
                adverbsTitle: "Marcadores Temporales Comunes",
                adverbs: "ayer, anoche, la semana pasada, el mes pasado, en 1999, el otro día.",
                examplesTitle: "Terminaciones Regulares",
                examples: { hablar: ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"], comer: ["comí", "comiste", "comió", "comimos", "comisteis", "comieron"], vivir: ["viví", "viviste", "vivió", "vivimos", "vivisteis", "vivieron"] }
            },
            preterito_imperfecto: {
                title: "Pretérito Imperfecto",
                explanation: "El Pretérito Imperfecto se utiliza para describir acciones habituales en el pasado, acciones en progreso en un momento del pasado, o para hacer descripciones de personas, cosas o lugares en el pasado.",
                adverbsTitle: "Marcadores Temporales Comunes",
                adverbs: "antes, siempre, a menudo, mientras, todos los días (en el pasado).",
                examplesTitle: "Terminaciones Regulares",
                examples: { hablar: ["hablaba", "hablabas", "hablaba", "hablábamos", "hablabais", "hablaban"], comer: ["comía", "comías", "comía", "comíamos", "comíais", "comían"], vivir: ["vivía", "vivías", "vivía", "vivíamos", "vivíais", "vivían"] }
            },
            futuro_simple: {
                title: "Futuro Simple (Imperfecto)",
                explanation: "El Futuro Simple se usa para hablar de acciones que ocurrirán en el futuro. También puede expresar probabilidad o suposición sobre el presente.",
                adverbsTitle: "Marcadores Temporales Comunes",
                adverbs: "mañana, la próxima semana, el próximo año, después, luego.",
                examplesTitle: "Terminaciones Regulares",
                examples: { hablar: ["hablaré", "hablarás", "hablará", "hablaremos", "hablaréis", "hablarán"], comer: ["comeré", "comerás", "comerá", "comeremos", "comeréis", "comerán"], vivir: ["viviré", "vivirás", "vivirá", "viviremos", "viviréis", "vivirán"] }
            }
        }
    },
    ka: {
        pageTitle: "უღლება და ლექსიკონი",
        headerTitle: "უღლება",
        dictionaryHeaderTitle: "ლექსიკონი",
        inputPlaceholder: "დაწერეთ ზმნა ქართულად ან ესპანურად...",
        dictionaryInputPlaceholder: "დაწერეთ სიტყვა ქართულად ან ესპანურად...",
        submitButton: "უღლება",
        dictionarySubmitButton: "ძებნა",
        placeholderText: "შეიყვანეთ ზმნა მისი უღლების სანახავად.",
        dictionaryPlaceholderText: "შეიყვანეთ სიტყვა მისი განმარტების სანახავად.",
        conjugatingText: "ვამზადებ უღლებას...",
        searchingText: "ვიძიებ...",
        errorPrefix: "შეცდომა",
        errorDefault: "მოხდა შეცდომა. გთხოვთ, სცადოთ თავიდან.",
        popularTab: "პოპულარული",
        favoritesTab: "ფავორიტები",
        recentsTab: "ბოლოს ნანახი",
        favoritesEmptyConjugator: "დაამატეთ ზმნები ფავორიტებში ვარსკვლავით ★",
        favoritesEmptyDictionary: "დაამატეთ სიტყვები ფავორიტებში ვარსკვლავით ★",
        recentsEmpty: "თქვენი ძიების ისტორია აქ გამოჩნდება.",
        favoriteAriaLabelAdd: "ფავორიტებში დამატება",
        favoriteAriaLabelRemove: "ფავორიტებიდან წაშლა",
        exampleLabel: "მაგალითი",
        closeAriaLabel: "დახურვა",
        infinitiveCard: "Infinitivo",
        gerundCard: "Gerundio",
        participleCard: "Participio",
        footerMaterials: 'დამხმარე მასალები: <a href="https://es-avma.blogspot.com/" target="_blank" rel="noopener noreferrer">es-avma.blogspot.com</a>',
        logoAltText: "ავთანდილ მაჩიტაძის ლოგო",
        footerGeminiCredit: 'საიტი ეფუძნება Gemini-ს ხელოვნურ ინტელექტს.',
        conjugatorTab: "უღლება",
        dictionaryTab: "ლექსიკონი",
        definitionLabel: "განმარტება",
        synonymsLabel: "სინონიმები",
        antonymsLabel: "ანტონიმები",
        examplesLabel: "მაგალითები",
        tenseExplanations: {
            infinitivo: {
                title: "Infinitivo (ინფინიტივი)",
                explanation: "ინფინიტივი ზმნის საწყისი, უცვლელი ფორმაა. ესპანურში ინფინიტივები ყოველთვის ბოლოვდება -ar, -er, ან -ir-ზე. ის ზმნის 'სახელია' და შეიძლება გამოყენებულ იქნას როგორც არსებითი სახელი, სხვა უღლებული ზმნების შემდეგ, ან პერიფრასტულ კონსტრუქციებში.",
                adverbsTitle: "გამოყენება",
                adverbs: "არ ასოცირდება კონკრეტულ დროით მარკერებთან.",
                examplesTitle: "გამოყენების მაგალითები",
                examples: { ar: "<strong>Cantar</strong> es divertido. (სიმღერა სახალისოა)", er: "Quiero <strong>comer</strong> paella. (პაელიას ჭამა მინდა)", ir: "Voy a <strong>vivir</strong> en Madrid. (მადრიდში ვაპირებ ცხოვრებას)" }
            },
            gerundio: {
                title: "Gerundio (გერუნდივი)",
                explanation: "გერუნდივი გამოხატავს მიმდინარე, პროცესში მყოფ მოქმედებას. ის ინგლისური '-ing' ფორმის ეკვივალენტია. იწარმოება -ar ზმნების ფუძეზე -ando-ს დამატებით, ხოლო -er და -ir ზმნების ფუძეზე -iendo-ს დამატებით. ხშირად გამოიყენება ზმნა 'estar'-თან პროგრესული დროების საწარმოებლად.",
                adverbsTitle: "ხშირი მარკერები",
                adverbs: "mientras (სანამ), actualmente (ამჟამად), en este momento (ამ მომენტში).",
                examplesTitle: "გამოყენების მაგალითები",
                examples: { ar: "Estoy <strong>hablando</strong> por teléfono. (ტელეფონზე ვსაუბრობ)", er: "Estamos <strong>comiendo</strong> juntos. (ერთად ვჭამთ)", ir: "Sigue <strong>viviendo</strong> con sus padres. (ისევ მშობლებთან ცხოვრობს)" }
            },
            participio: {
                title: "Participio Pasado (ნამყო მიმღეობა)",
                explanation: "ნამყო მიმღეობა ძირითადად გამოიყენება რთული დროების (როგორიცაა Pretérito Perfecto) საწარმოებლად დამხმარე ზმნა 'haber'-თან ერთად. ასევე, შეიძლება გამოყენებულ იქნას როგორც ზედსართავი სახელი მოქმედების შედეგად მიღებული მდგომარეობის აღსაწერად. წესიერი მიმღეობები ბოლოვდება -ado-ზე (-ar ზმნები) და -ido-ზე (-er, -ir ზმნები).",
                adverbsTitle: "ხშირი მარკერები",
                adverbs: "ya (უკვე), todavía (ჯერ კიდევ), nunca (არასდროს) (რთულ დროებში).",
                examplesTitle: "გამოყენების მაგალითები",
                examples: { ar: "He <strong>hablado</strong> con ella. (მას ველაპარაკე)", er: "La comida está <strong>comida</strong>. (საჭმელი შეჭმულია)", ir: "Hemos <strong>vivido</strong> muchas aventuras. (ბევრი თავგადასავალი გვქონია)" }
            },
            presente: {
                title: "Presente de Indicativo (აწმყო)",
                explanation: "Presente de Indicativo გამოიყენება მოქმედებების გამოსახატავად, რომლებიც ხდება საუბრის მომენტში, ჩვეული მოქმედებების, უნივერსალური ჭეშმარიტების ან მუდმივი მახასიათებლების აღსაწერად.",
                adverbsTitle: "ხშირი დროითი მარკერები",
                adverbs: "ahora (ახლა), hoy (დღეს), siempre (ყოველთვის), nunca (არასდროს), todos los días (ყოველდღე), a menudo (ხშირად), a veces (ზოგჯერ).",
                examplesTitle: "სწორი დაბოლოებები",
                examples: { hablar: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"], comer: ["como", "comes", "come", "comemos", "coméis", "comen"], vivir: ["vivo", "vives", "vive", "vivimos", "vivís", "viven"] }
            },
            preterito_perfecto: {
                title: "Pretérito Perfecto Compuesto (ახლო წარსული)",
                explanation: "Pretérito Perfecto გამოიყენება წარსულში მომხდარი მოქმედებების აღსაწერად, რომლებსაც კავშირი აქვთ აწმყოსთან ან მოხდა დროის პერიოდში, რომელიც ჯერ არ დასრულებულა.",
                adverbsTitle: "ხშირი დროითი მარკერები",
                adverbs: "hoy (დღეს), esta mañana (ამ დილით), esta semana (ამ კვირაში), este mes (ამ თვეში), este año (წელს), ya (უკვე), todavía no (ჯერ არა), alguna vez (ოდესმე).",
                examplesTitle: "სწორი დაბოლოებები",
                examples: { hablar: ["he hablado", "has hablado", "ha hablado", "hemos hablado", "habéis hablado", "han hablado"], comer: ["he comido", "has comido", "ha comido", "hemos comido", "habéis comido", "han comido"], vivir: ["he vivido", "has vivido", "ha vivido", "hemos vivido", "habéis vivido", "han vivido"] }
            },
            preterito_indefinido: {
                title: "Pretérito Perfecto Simple (Indefinido) (\"უბრალოდ\" წარსული)",
                explanation: "Pretérito Indefinido გამოიყენება მოქმედებების აღსაწერად, რომლებიც მოხდა და დასრულდა წარსულის კონკრეტულ მომენტში და არ აქვთ კავშირი აწმყოსთან.",
                adverbsTitle: "ხშირი დროითი მარკერები",
                adverbs: "ayer (გუშინ), anoche (გუშინ ღამით), la semana pasada (გასულ კვირას), el mes pasado (გასულ თვეს), en 1999 (1999 წელს), el otro día (იმ დღეს).",
                examplesTitle: "სწორი დაბოლოებები",
                examples: { hablar: ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"], comer: ["comí", "comiste", "comió", "comimos", "comisteis", "comieron"], vivir: ["viví", "viviste", "vivió", "vivimos", "vivisteis", "vivieron"] }
            },
            preterito_imperfecto: {
                title: "Pretérito Imperfecto (უსრული წარსული)",
                explanation: "Pretérito Imperfecto გამოიყენება წარსულში ჩვეული მოქმედებების, წარსულის კონკრეტულ მომენტში მიმდინარე პროცესების, ან ადამიანების, საგნების და ადგილების აღსაწერად წარსულში.",
                adverbsTitle: "ხშირი დროითი მარკერები",
                adverbs: "antes (ადრე), siempre (ყოველთვის), a menudo (ხშირად), mientras (სანამ), todos los días (ყოველდღე - წარსულში).",
                examplesTitle: "სწორი დაბოლოებები",
                examples: { hablar: ["hablaba", "hablabas", "hablaba", "hablábamos", "hablabais", "hablaban"], comer: ["comía", "comías", "comía", "comíamos", "comíais", "comían"], vivir: ["vivía", "vivías", "vivía", "vivíamos", "vivíais", "vivían"] }
            },
            futuro_simple: {
                title: "Futuro Simple (Imperfecto) (მარტივი მომავალი)",
                explanation: "Futuro Simple გამოიყენება მომავალში მოსახდენი მოქმედებების აღსაწერად. ასევე, შეუძლია გამოხატოს ვარაუდი ან ალბათობა აწმყოსთან მიმართებით.",
                adverbsTitle: "ხშირი დროითი მარკერები",
                adverbs: "mañana (ხვალ), la próxima semana (მომავალ კვირას), el próximo año (მომავალ წელს), después (შემდეგ), luego (მოგვიანებით).",
                examplesTitle: "სწორი დაბოლოებები",
                examples: { hablar: ["hablaré", "hablarás", "hablará", "hablaremos", "hablaréis", "hablarán"], comer: ["comeré", "comerás", "comerá", "comeremos", "comeréis", "comerán"], vivir: ["viviré", "vivirás", "vivirá", "viviremos", "viviréis", "vivirán"] }
            }
        }
    }
};

type Language = keyof typeof translations;
type View = 'conjugator' | 'dictionary';

let currentLanguage: Language = 'es';
let currentView: View = 'conjugator';
let lastSearchedTerm: string | null = null;

// DOM Elements
const form = document.getElementById('conjugator-form') as HTMLFormElement;
const input = document.getElementById('verb-input') as HTMLInputElement;
const button = document.getElementById('submit-button') as HTMLButtonElement;
const resultsContainer = document.getElementById('results-container') as HTMLElement;
const modal = document.getElementById('tense-modal') as HTMLElement;
const modalBody = document.getElementById('modal-body-content') as HTMLElement;
const modalCloseBtn = document.getElementById('modal-close-btn') as HTMLButtonElement;
const langButtons = document.querySelectorAll('.lang-btn');
const suggestionsContainer = document.getElementById('autocomplete-suggestions') as HTMLElement;
const navConjugatorBtn = document.getElementById('nav-conjugator') as HTMLButtonElement;
const navDictionaryBtn = document.getElementById('nav-dictionary') as HTMLButtonElement;


// --- Spanish Verb List with Georgian Translations for Autocomplete ---
const VERB_LIST = [
    { es: "abandonar", ka: "მიტოვება" }, { es: "abrir", ka: "გაღება" }, { es: "acabar", ka: "დასრულება" },
    { es: "aceptar", ka: "დათანხმება" }, { es: "acompañar", ka: "თანხლება" }, { es: "aconsejar", ka: "რჩევა" },
    { es: "actuar", ka: "მოქმედება" }, { es: "admitir", ka: "აღიარება" }, { es: "agradecer", ka: "მადლობის გადახდა" },
    { es: "alcanzar", ka: "მიღწევა" }, { es: "amar", ka: "სიყვარული" }, { es: "andar", ka: "სიარული" },
    { es: "aparecer", ka: "გამოჩენა" }, { es: "aprender", ka: "სწავლა" }, { es: "ayudar", ka: "დახმარება" },
    { es: "bailar", ka: "ცეკვა" }, { es: "bajar", ka: "ჩასვლა" }, { es: "beber", ka: "დალევა" },
    { es: "buscar", ka: "ძებნა" }, { es: "caer", ka: "დაცემა" }, { es: "cambiar", ka: "შეცვლა" },
    { es: "caminar", ka: "ფეხით სიარული" }, { es: "cantar", ka: "სიმღერა" }, { es: "casar", ka: "დაქორწინება" },
    { es: "cerrar", ka: "დახურვა" }, { es: "cocinar", ka: "მომზადება" }, { es: "coger", ka: "აღება" },
    { es: "comer", ka: "ჭამა" }, { es: "comprar", ka: "ყიდვა" }, { es: "comprender", ka: "გაგება" },
    { es: "conducir", ka: "ტარება" }, { es: "conocer", ka: "ცნობა" }, { es: "conseguir", ka: "მოპოვება" },
    { es: "construir", ka: "აშენება" }, { es: "contar", ka: "თვლა" }, { es: "contestar", ka: "პასუხის გაცემა" },
    { es: "continuar", ka: "გაგრძელება" }, { es: "correr", ka: "სირბილი" }, { es: "cortar", ka: "გაჭრა" },
    { es: "costar", ka: "ღირებულება" }, { es: "crear", ka: "შექმნა" }, { es: "crecer", ka: "გაზრდა" },
    { es: "creer", ka: "დაჯერება" }, { es: "cubrir", ka: "დაფარვა" }, { es: "cuidar", ka: "მოვლა" },
    { es: "cumplir", ka: "შესრულება" }, { es: "dar", ka: "მიცემა" }, { es: "deber", ka: "ვალდებულება" },
    { es: "decidir", ka: "გადაწყვეტა" }, { es: "decir", ka: "თქმა" }, { es: "defender", ka: "დაცვა" },
    { es: "dejar", ka: "დატოვება" }, { es: "demostrar", ka: "ჩვენება" }, { es: "descansar", ka: "დასვენება" },
    { es: "descubrir", ka: "აღმოჩენა" }, { es: "desear", ka: "სურვილი" }, { es: "destruir", ka: "დანგრევა" },
    { es: "detener", ka: "გაჩერება" }, { es: "devolver", ka: "დაბრუნება" }, { es: "dibujar", ka: "ხატვა" },
    { es: "dirigir", ka: "მართვა" }, { es: "discutir", ka: "კამათი" }, { es: "disfrutar", ka: "სიამოვნების მიღება" },
    { es: "divertir", ka: "გართობა" }, { es: "dormir", ka: "ძილი" }, { es: "dudar", ka: "ეჭვის შეტანა" },
    { es: "echar", ka: "გადაგდება" }, { es: "educar", ka: "განათლება" }, { es: "elegir", ka: "არჩევა" },
    { es: "empezar", ka: "დაწყება" }, { es: "encontrar", ka: "პოვნა" }, { es: "enseñar", ka: "სწავლება" },
    { es: "entender", ka: "გაგება" }, { es: "entrar", ka: "შესვლა" }, { es: "entregar", ka: "მიწოდება" },
    { es: "enviar", ka: "გაგზავნა" }, { es: "escribir", ka: "წერა" }, { es: "escuchar", ka: "მოსმენა" },
    { es: "esperar", ka: "ლოდინი" }, { es: "estar", ka: "ყოფნა" }, { es: "estudiar", ka: "მეცადინეობა" },
    { es: "evitar", ka: "თავის არიდება" }, { es: "existir", ka: "არსებობა" }, { es: "explicar", ka: "ახსნა" },
    { es: "faltar", ka: "ნაკლებობა" }, { es: "firmar", ka: "ხელის მოწერა" }, { es: "formar", ka: "შედგენა" },
    { es: "fumar", ka: "მოწევა" }, { es: "funcionar", ka: "მუშაობა" }, { es: "ganar", ka: "მოგება" },
    { es: "gastar", ka: "ხარჯვა" }, { es: "gritar", ka: "ყვირილი" }, { es: "guardar", ka: "შენახვა" },
    { es: "gustar", ka: "მოწონება" }, { es: "haber", ka: "ქონა" }, { es: "hablar", ka: "ლაპარაკი" },
    { es: "hacer", ka: "გაკეთება" }, { es: "imaginar", ka: "წარმოდგენა" }, { es: "importar", ka: "მნიშვნელობის ქონა" },
    { es: "incluir", ka: "ჩართვა" }, { es: "intentar", ka: "ცდა" }, { es: "interesar", ka: "დაინტერესება" },
    { es: "inventar", ka: "გამოგონება" }, { es: "invitar", ka: "დაპატიჟება" }, { es: "ir", ka: "წასვლა" },
    { es: "jugar", ka: "თამაში" }, { es: "lavar", ka: "გარეცხვა" }, { es: "leer", ka: "კითხვა" },
    { es: "levantar", ka: "აწევა" }, { es: "limpiar", ka: "დასუფთავება" }, { es: "llamar", ka: "დარეკვა" },
    { es: "llegar", ka: "მოსვლა" }, { es: "llenar", ka: "შევსება" }, { es: "llevar", ka: "ტარება" },
    { es: "llorar", ka: "ტირილი" }, { es: "luchar", ka: "ბრძოლა" }, { es: "mantener", ka: "შენარჩუნება" },
    { es: "matar", ka: "მოკვლა" }, { es: "mentir", ka: "ტყუილის თქმა" }, { es: "meter", ka: "ჩადება" },
    { es: "mirar", ka: "ყურება" }, { es: "morir", ka: "სიკვდილი" }, { es: "mostrar", ka: "ჩვენება" },
    { es: "mover", ka: "მოძრაობა" }, { es: "nacer", ka: "დაბადება" }, { es: "necesitar", ka: "საჭიროება" },
    { es: "negar", ka: "უარყოფა" }, { es: "obedecer", ka: "დამორჩილება" }, { es: "obtener", ka: "მიღება" },
    { es: "ocurrir", ka: "მოხდენა" }, { es: "odiar", ka: "სიძულვილი" }, { es: "ofrecer", ka: "შეთავაზება" },
    { es: "oír", ka: "გაგონება" }, { es: "oler", ka: "ყნოსვა" }, { es: "olvidar", ka: "დავიწყება" },
    { es: "pagar", ka: "გადახდა" }, { es: "parar", ka: "გაჩერება" }, { es: "parecer", ka: "გამოჩენა" },
    { es: "partir", ka: "გამგზავრება" }, { es: "pasar", ka: "გავლა" }, { es: "pedir", ka: "თხოვნა" },
    { es: "pegar", ka: "დარტყმა" }, { es: "pensar", ka: "ფიქრი" }, { es: "perder", ka: "წაგება" },
    { es: "permitir", ka: "ნების დართვა" }, { es: "pintar", ka: "დახატვა" }, { es: "poder", ka: "შესაძლებლობა" },
    { es: "poner", ka: "დადება" }, { es: "practicar", ka: "ვარჯიში" }, { es: "preferir", ka: "უპირატესობის მინიჭება" },
    { es: "preguntar", ka: "კითხვა" }, { es: "preparar", ka: "მომზადება" }, { es: "presentar", ka: "წარდგენა" },
    { es: "probar", ka: "გასინჯვა" }, { es: "producir", ka: "წარმოება" }, { es: "prohibir", ka: "აკრძალვა" },
    { es: "prometer", ka: "დაპირება" }, { es: "proponer", ka: "შეთავაზება" }, { es: "proteger", ka: "დაცვა" },
    { es: "publicar", ka: "გამოქვეყნება" }, { es: "quedar", ka: "დარჩენა" }, { es: "querer", ka: "სურვილი" },
    { es: "quitar", ka: "მოშორება" }, { es: "realizar", ka: "განხორციელება" }, { es: "recibir", ka: "მიღება" },
    { es: "reconocer", ka: "ცნობა" }, { es: "recordar", ka: "გახსენება" }, { es: "reducir", ka: "შემცირება" },
    { es: "regalar", ka: "ჩუქება" }, { es: "regresar", ka: "დაბრუნება" }, { es: "reír", ka: "სიცილი" },
    { es: "repetir", ka: "გამეორება" }, { es: "resolver", ka: "გადაჭრა" }, { es: "responder", ka: "პასუხი" },
    { es: "robar", ka: "მოპარვა" }, { es: "romper", ka: "გატეხვა" }, { es: "saber", ka: "ცოდნა" },
    { es: "sacar", ka: "ამოღება" }, { es: "salir", ka: "გასვლა" }, { es: "saltar", ka: "ხტომა" },
    { es: "saludar", ka: "მისალმება" }, { es: "secar", ka: "გაშრობა" }, { es: "seguir", ka: "გაგრძელება" },
    { es: "sentar", ka: "დაჯდომა" }, { es: "sentir", ka: "გრძნობა" }, { es: "ser", ka: "ყოფნა" },
    { es: "servir", ka: "მომსახურება" }, { es: "significar", ka: "მნიშვნელობა" }, { es: "soñar", ka: "ოცნება" },
    { es: "sonreír", ka: "გაღიმება" }, { es: "subir", ka: "ასვლა" }, { es: "sufrir", ka: "ტანჯვა" },
    { es: "sugerir", ka: "შეთავაზება" }, { es: "suponer", ka: "ვარაუდი" }, { es: "tener", ka: "ქონა" },
    { es: "terminar", ka: "დასრულება" }, { es: "tocar", ka: "შეხება" }, { es: "tomar", ka: "აღება" },
    { es: "trabajar", ka: "მუშაობა" }, { es: "traducir", ka: "თარგმნა" }, { es: "traer", ka: "მოტანა" },
    { es: "tratar", ka: "მცდელობა" }, { es: "usar", ka: "გამოყენება" }, { es: "valer", ka: "ღირებულება" },
    { es: "vender", ka: "გაყიდვა" }, { es: "venir", ka: "მოსვლა" }, { es: "ver", ka: "ნახვა" },
    { es: "vestir", ka: "ჩაცმა" }, { es: "viajar", ka: "მოგზაურობა" }, { es: "visitar", ka: "სტუმრობა" },
    { es: "vivir", ka: "ცხოვრება" }, { es: "volar", ka: "ფრენა" }, { es: "volver", ka: "დაბრუნება" }
];


// --- Gemini JSON Schemas ---
const pronounConjugationSchema = {
    type: Type.OBJECT,
    properties: {
        yo: { type: Type.STRING },
        tu: { type: Type.STRING },
        el: { type: Type.STRING },
        nosotros: { type: Type.STRING },
        vosotros: { type: Type.STRING },
        ellos: { type: Type.STRING },
    },
    required: ["yo", "tu", "el", "nosotros", "vosotros", "ellos"]
};

const tenseSchema = {
    type: Type.OBJECT,
    properties: {
        conjugaciones: pronounConjugationSchema,
        ejemplo: { type: Type.STRING, description: "Una frase de ejemplo usando una de las conjugaciones." }
    },
    required: ["conjugaciones", "ejemplo"]
};

const conjugatorSchema = {
    type: Type.OBJECT,
    properties: {
        infinitivo: { type: Type.STRING, description: "El infinitivo del verbo." },
        definicion: { type: Type.STRING, description: "Una breve definición del verbo." },
        presente: tenseSchema,
        preterito_perfecto: tenseSchema,
        preterito_indefinido: tenseSchema,
        preterito_imperfecto: tenseSchema,
        futuro_simple: tenseSchema,
        gerundio: { type: Type.STRING },
        participio: { type: Type.STRING },
        error: { type: Type.STRING, description: "Mensaje de error si la entrada no es un verbo en infinitivo válido en español." }
    },
};

const dictionarySchema = {
    type: Type.OBJECT,
    properties: {
        palabra: { type: Type.STRING, description: "La palabra buscada." },
        definicion: { type: Type.STRING, description: "La definición de la palabra." },
        sinonimos: { type: Type.ARRAY, items: { type: Type.STRING } },
        antonimos: { type: Type.ARRAY, items: { type: Type.STRING } },
        ejemplos: {
            type: Type.OBJECT,
            properties: {
                presente: { type: Type.STRING, description: "Frase de ejemplo en Presente de Indicativo." },
                preterito_perfecto: { type: Type.STRING, description: "Frase de ejemplo en Pretérito Perfecto Compuesto." },
                preterito_indefinido: { type: Type.STRING, description: "Frase de ejemplo en Pretérito Perfecto Simple (Indefinido)." },
                futuro_simple: { type: Type.STRING, description: "Frase de ejemplo en Futuro Simple." },
                gerundio: { type: Type.STRING, description: "Frase de ejemplo usando la palabra en un contexto de Gerundio (si aplica)." }
            }
        },
        error: { type: Type.STRING, description: "Mensaje de error si la entrada no es una palabra válida." }
    },
};


// --- localStorage Helpers ---
const MOST_COMMON_VERBS = ["ser", "estar", "tener", "hacer", "ir", "decir", "poder", "saber", "querer", "haber", "venir", "ver"];
const MOST_COMMON_WORDS = ["hola", "adiós", "gracias", "casa", "amigo", "bueno", "grande", "amarillo", "comida", "agua", "tiempo", "ahora"];
const MAX_RECENTS = 12;

function getFromStorage(key: string): string[] {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error(`Failed to parse ${key} from localStorage`, e);
        return [];
    }
}

function saveToStorage(key: string, data: string[]) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Conjugator storage
function getFavoriteVerbs(): string[] { return getFromStorage('favoriteVerbs'); }
function isFavoriteVerb(verb: string): boolean { return getFavoriteVerbs().includes(verb.toLowerCase()); }
function toggleFavoriteVerb(verb: string) {
    verb = verb.toLowerCase();
    const favorites = getFavoriteVerbs();
    const index = favorites.indexOf(verb);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.unshift(verb);
    }
    saveToStorage('favoriteVerbs', favorites);
}
function getRecentVerbs(): string[] { return getFromStorage('recentVerbs'); }
function addRecentVerb(verb: string) {
    verb = verb.toLowerCase();
    let recents = getRecentVerbs();
    recents = recents.filter(v => v !== verb);
    recents.unshift(verb);
    if (recents.length > MAX_RECENTS) recents.pop();
    saveToStorage('recentVerbs', recents);
}

// Dictionary storage
function getFavoriteWords(): string[] { return getFromStorage('favoriteWords'); }
function isFavoriteWord(word: string): boolean { return getFavoriteWords().includes(word.toLowerCase()); }
function toggleFavoriteWord(word: string) {
    word = word.toLowerCase();
    const favorites = getFavoriteWords();
    const index = favorites.indexOf(word);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.unshift(word);
    }
    saveToStorage('favoriteWords', favorites);
}
function getRecentWords(): string[] { return getFromStorage('recentWords'); }
function addRecentWord(word: string) {
    word = word.toLowerCase();
    let recents = getRecentWords();
    recents = recents.filter(w => w !== word);
    recents.unshift(word);
    if (recents.length > MAX_RECENTS) recents.pop();
    saveToStorage('recentWords', recents);
}


// --- UI Rendering ---
const pronounMap = {
    yo: "Yo",
    tu: "Tú",
    el: "Él/Ella/Usted",
    nosotros: "Nosotros/as",
    vosotros: "Vosotros/as",
    ellos: "Ellos/Ellas/Ustedes"
};

const tenseTitleMap = {
    presente: "Presente",
    preterito_perfecto: "Pretérito Perfecto Compuesto",
    preterito_indefinido: "Pretérito Perfecto Simple (Indefinido)",
    preterito_imperfecto: "Pretérito Imperfecto",
    futuro_simple: "Futuro Simple (Imperfecto)"
};
const exampleTenseMap = {
    presente: "Presente",
    preterito_perfecto: "Pretérito Perfecto",
    preterito_indefinido: "Pretérito Indefinido",
    futuro_simple: "Futuro Simple",
    gerundio: "Gerundio"
};

function renderApp() {
    if (currentView === 'conjugator') {
        renderConjugatorInitialView();
    } else {
        renderDictionaryInitialView();
    }
    updateUIForLanguage();
}

function renderDictionaryInitialView() {
    resultsContainer.innerHTML = '';
    const recents = getRecentWords();
    const favorites = getFavoriteWords();
    const t = translations[currentLanguage];

    const tabsData = [
        { id: 'populares', title: t.popularTab, items: MOST_COMMON_WORDS, emptyText: '' },
        { id: 'favoritos', title: t.favoritesTab, items: favorites, emptyText: t.favoritesEmptyDictionary },
        { id: 'recientes', title: t.recentsTab, items: recents, emptyText: t.recentsEmpty }
    ];

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs';
    const tabNav = document.createElement('div');
    tabNav.className = 'tab-nav';
    tabNav.setAttribute('role', 'tablist');
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';

    tabsData.forEach((tab, index) => {
        const button = document.createElement('button');
        button.className = 'tab-link' + (index === 0 ? ' active' : '');
        button.textContent = tab.title;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', `tab-${tab.id}`);
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.dataset.tabTarget = `#tab-${tab.id}`;
        tabNav.appendChild(button);

        const pane = document.createElement('div');
        pane.id = `tab-${tab.id}`;
        pane.className = 'tab-pane' + (index === 0 ? ' active' : '');
        pane.setAttribute('role', 'tabpanel');
        
        if (tab.items.length > 0) {
            const gridEl = document.createElement('div');
            gridEl.className = 'item-card-grid';
            gridEl.innerHTML = tab.items.map(item =>
                `<button class="item-card" data-word="${item}">${item.charAt(0).toUpperCase() + item.slice(1)}</button>`
            ).join('');
            pane.appendChild(gridEl);
        } else {
            const emptyEl = document.createElement('p');
            emptyEl.className = 'empty-section-text';
            emptyEl.textContent = tab.emptyText;
            pane.appendChild(emptyEl);
        }
        tabContent.appendChild(pane);
    });

    tabsContainer.appendChild(tabNav);
    tabsContainer.appendChild(tabContent);
    resultsContainer.appendChild(tabsContainer);

    tabNav.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', () => {
            tabNav.querySelector('.active')?.classList.remove('active');
            tabNav.querySelector('.active')?.setAttribute('aria-selected', 'false');
            tabContent.querySelector('.active')?.classList.remove('active');
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            const targetPane = tabContent.querySelector((button as HTMLElement).dataset.tabTarget!);
            targetPane?.classList.add('active');
        });
    });

    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', () => {
            const word = (card as HTMLButtonElement).dataset.word;
            if (word) {
                input.value = word;
                searchWord(word);
            }
        });
    });
}

function renderConjugatorInitialView() {
    resultsContainer.innerHTML = '';
    const recents = getRecentVerbs();
    const favorites = getFavoriteVerbs();
    const t = translations[currentLanguage];

    const tabsData = [
        { id: 'populares', title: t.popularTab, items: MOST_COMMON_VERBS, emptyText: '' },
        { id: 'favoritos', title: t.favoritesTab, items: favorites, emptyText: t.favoritesEmptyConjugator },
        { id: 'recientes', title: t.recentsTab, items: recents, emptyText: t.recentsEmpty }
    ];

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs';

    const tabNav = document.createElement('div');
    tabNav.className = 'tab-nav';
    tabNav.setAttribute('role', 'tablist');

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';

    tabsData.forEach((tab, index) => {
        const button = document.createElement('button');
        button.className = 'tab-link' + (index === 0 ? ' active' : '');
        button.textContent = tab.title;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', `tab-${tab.id}`);
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.dataset.tabTarget = `#tab-${tab.id}`;
        tabNav.appendChild(button);

        const pane = document.createElement('div');
        pane.id = `tab-${tab.id}`;
        pane.className = 'tab-pane' + (index === 0 ? ' active' : '');
        pane.setAttribute('role', 'tabpanel');
        
        if (tab.items.length > 0) {
            const gridEl = document.createElement('div');
            gridEl.className = 'item-card-grid';
            gridEl.innerHTML = tab.items.map(item =>
                `<button class="item-card" data-verb="${item}">${item.charAt(0).toUpperCase() + item.slice(1)}</button>`
            ).join('');
            pane.appendChild(gridEl);
        } else {
            const emptyEl = document.createElement('p');
            emptyEl.className = 'empty-section-text';
            emptyEl.textContent = tab.emptyText;
            pane.appendChild(emptyEl);
        }
        tabContent.appendChild(pane);
    });

    tabsContainer.appendChild(tabNav);
    tabsContainer.appendChild(tabContent);
    resultsContainer.appendChild(tabsContainer);

    tabNav.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', () => {
            tabNav.querySelector('.active')?.classList.remove('active');
            tabNav.querySelector('.active')?.setAttribute('aria-selected', 'false');
            tabContent.querySelector('.active')?.classList.remove('active');
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            const targetPane = tabContent.querySelector((button as HTMLElement).dataset.tabTarget!);
            targetPane?.classList.add('active');
        });
    });

    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', () => {
            const verb = (card as HTMLButtonElement).dataset.verb;
            if (verb) {
                input.value = verb;
                conjugateVerb(verb);
            }
        });
    });
}

function renderConjugatorSkeleton() {
    resultsContainer.innerHTML = `
        <div class="skeleton-container">
            <div class="skeleton-header">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-star"></div>
            </div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton-grid skeleton-grid-3">
                <div class="skeleton skeleton-card"></div>
                <div class="skeleton skeleton-card"></div>
                <div class="skeleton skeleton-card"></div>
            </div>
            <div class="skeleton-grid skeleton-grid-2">
                <div class="skeleton skeleton-card-large"></div>
                <div class="skeleton skeleton-card-large"></div>
                <div class="skeleton skeleton-card-large"></div>
                <div class="skeleton skeleton-card-large"></div>
                <div class="skeleton skeleton-card-large"></div>
            </div>
        </div>
    `;
}

function renderDictionarySkeleton() {
    resultsContainer.innerHTML = `
        <div class="skeleton-container">
            <div class="skeleton-header">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-star"></div>
            </div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-card-large"></div>
            <div class="skeleton skeleton-card-large"></div>
            <div class="skeleton skeleton-card-large"></div>
        </div>
    `;
}


function highlightVerbInSentence(sentence: string, conjugations: { [key: string]: string }): string {
    const allForms = Object.values(conjugations);
    allForms.sort((a, b) => b.length - a.length);

    for (const form of allForms) {
        if (!form) continue;
        const regex = new RegExp(`\\b(${form.replace(/ /g, '\\s')})\\b`, 'gi');
        if (regex.test(sentence)) {
             return sentence.replace(regex, '<strong>$1</strong>');
        }
    }
    return sentence;
}

function renderConjugations(data: any) {
    resultsContainer.innerHTML = '';
    const t = translations[currentLanguage];
    const verb = data.infinitivo;

    const headerContainer = document.createElement('div');
    headerContainer.className = 'verb-header-container';
    const verbHeader = document.createElement('h2');
    verbHeader.textContent = verb.charAt(0).toUpperCase() + verb.slice(1);
    verbHeader.className = 'verb-title';

    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = `&#9733;`;

    const updateFavBtn = () => {
        const isFav = isFavoriteVerb(verb);
        favoriteBtn.classList.toggle('favorited', isFav);
        favoriteBtn.setAttribute('aria-label', isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd);
    };
    updateFavBtn();

    favoriteBtn.addEventListener('click', () => {
        toggleFavoriteVerb(verb);
        updateFavBtn();
    });

    headerContainer.appendChild(verbHeader);
    headerContainer.appendChild(favoriteBtn);
    resultsContainer.appendChild(headerContainer);

    if (data.definicion) {
        const definition = document.createElement('p');
        definition.className = 'verb-definition';
        definition.textContent = data.definicion;
        resultsContainer.appendChild(definition);
    }
    
    const mainForms = document.createElement('div');
    mainForms.className = 'verb-main-forms';
    mainForms.innerHTML = `
        <button class="form-card" data-tense="infinitivo"><h3>${translations.es.infinitiveCard}</h3><p>${data.infinitivo}</p></button>
        <button class="form-card" data-tense="gerundio"><h3>${translations.es.gerundCard}</h3><p>${data.gerundio}</p></button>
        <button class="form-card" data-tense="participio"><h3>${translations.es.participleCard}</h3><p>${data.participio}</p></button>
    `;
    resultsContainer.appendChild(mainForms);

    const tablesGrid = document.createElement('div');
    tablesGrid.className = 'tables-grid';

    for (const [key, title] of Object.entries(tenseTitleMap)) {
        if (data[key]) {
            const tenseData = data[key];
            const tenseContainer = document.createElement('div');
            tenseContainer.className = 'tense-container';
            const table = document.createElement('table');
            table.className = 'conjugation-table';
            table.innerHTML = `
                <caption><button class="tense-title-btn" data-tense="${key}">${title}</button></caption>
                <tbody>
                    ${Object.entries(pronounMap).map(([pronounKey, pronounVal]) => `
                        <tr><th>${pronounVal}</th><td>${tenseData.conjugaciones[pronounKey]}</td></tr>
                    `).join('')}
                </tbody>`;
            tenseContainer.appendChild(table);

            if (tenseData.ejemplo) {
                const example = document.createElement('p');
                example.className = 'example-sentence';
                example.innerHTML = `<strong>${t.exampleLabel}:</strong> ${highlightVerbInSentence(tenseData.ejemplo, tenseData.conjugaciones)}`;
                tenseContainer.appendChild(example);
            }
            tablesGrid.appendChild(tenseContainer);
        }
    }
    resultsContainer.appendChild(tablesGrid);

    document.querySelectorAll('.tense-title-btn, .form-card').forEach(button => {
        button.addEventListener('click', (e) => {
            const tenseKey = (e.currentTarget as HTMLElement).dataset.tense;
            if (tenseKey) openModal(tenseKey);
        });
    });
}

function renderDictionaryResults(data: any) {
    resultsContainer.innerHTML = '';
    const t = translations[currentLanguage];
    const word = data.palabra;

    const headerContainer = document.createElement('div');
    headerContainer.className = 'verb-header-container';
    const wordHeader = document.createElement('h2');
    wordHeader.textContent = word.charAt(0).toUpperCase() + word.slice(1);
    wordHeader.className = 'word-title';

    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = `&#9733;`;

    const updateFavBtn = () => {
        const isFav = isFavoriteWord(word);
        favoriteBtn.classList.toggle('favorited', isFav);
        favoriteBtn.setAttribute('aria-label', isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd);
    };
    updateFavBtn();

    favoriteBtn.addEventListener('click', () => {
        toggleFavoriteWord(word);
        updateFavBtn();
    });

    headerContainer.appendChild(wordHeader);
    headerContainer.appendChild(favoriteBtn);
    resultsContainer.appendChild(headerContainer);
    
    // Definition (no card)
    if (data.definicion) {
        const definition = document.createElement('p');
        definition.className = 'verb-definition'; // Reusing class for consistency
        definition.textContent = data.definicion;
        resultsContainer.appendChild(definition);
    }

    const resultsWrapper = document.createElement('div');
    resultsWrapper.className = 'word-results-container';

    // Synonyms
    if (data.sinonimos && data.sinonimos.length > 0) {
        const block = document.createElement('div');
        block.className = 'result-block';
        block.innerHTML = `
            <h3>${t.synonymsLabel}</h3>
            <div class="word-list">
                ${data.sinonimos.map((s: string) => `<button class="word-tag" data-word="${s}">${s}</button>`).join('')}
            </div>
        `;
        resultsWrapper.appendChild(block);
    }

    // Antonyms
    if (data.antonimos && data.antonimos.length > 0) {
        const block = document.createElement('div');
        block.className = 'result-block';
        block.innerHTML = `
            <h3>${t.antonymsLabel}</h3>
            <div class="word-list">
                ${data.antonimos.map((a: string) => `<button class="word-tag" data-word="${a}">${a}</button>`).join('')}
            </div>
        `;
        resultsWrapper.appendChild(block);
    }
    
    // Examples
    if (data.ejemplos) {
        const exampleEntries = Object.entries(data.ejemplos).filter(([_, value]) => value);
        if (exampleEntries.length > 0) {
             const examplesHtml = exampleEntries.map(([key, sentence]) => {
                // Georgian case: sentence is an object
                if (currentLanguage === 'ka' && typeof sentence === 'object' && sentence !== null && 'frase_espanol' in sentence) {
                    const esSentence = (sentence as any).frase_espanol?.replace(new RegExp(`\\b(${word})\\b`, 'gi'), '<strong>$1</strong>') || '';
                    const kaSentence = (sentence as any).frase_georgiano;
                    return `<li><strong>${exampleTenseMap[key as keyof typeof exampleTenseMap]}:</strong> <span>${esSentence}</span><small class="translation">${kaSentence}</small></li>`;
                }
                // Spanish case: sentence is a string
                else if (typeof sentence === 'string') {
                     return `<li><strong>${exampleTenseMap[key as keyof typeof exampleTenseMap]}:</strong> ${sentence.replace(new RegExp(`\\b(${word})\\b`, 'gi'), '<strong>$1</strong>')}</li>`;
                }
                // Fallback for unexpected data format
                return '';
             }).filter(Boolean).join(''); // filter(Boolean) removes empty strings from the array

             if (examplesHtml) {
                 const block = document.createElement('div');
                 block.className = 'result-block';
                 block.innerHTML = `
                    <h3>${t.examplesLabel}</h3>
                    <ul class="examples-list">
                        ${examplesHtml}
                    </ul>
                `;
                resultsWrapper.appendChild(block);
             }
        }
    }

    // Only append the wrapper if it has content
    if (resultsWrapper.hasChildNodes()) {
      resultsContainer.appendChild(resultsWrapper);
    }

    document.querySelectorAll('.word-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const newWord = (tag as HTMLButtonElement).dataset.word;
            if (newWord) {
                searchWord(newWord);
            }
        });
    });
}


function boldEnding(fullWord: string, root: string): string {
    const parts = fullWord.split(' ');
    if (parts.length > 1) {
        const participle = parts[1];
        if (participle.endsWith('ado')) return `${parts[0]} ${participle.slice(0, -3)}<strong>ado</strong>`;
        if (participle.endsWith('ido')) return `${parts[0]} ${participle.slice(0, -3)}<strong>ido</strong>`;
        return fullWord;
    }
    if (fullWord.startsWith(root)) {
        return `${root}<strong>${fullWord.slice(root.length)}</strong>`;
    }
    return fullWord;
}

function openModal(tenseKey: string) {
    type TenseKey = keyof typeof translations['es']['tenseExplanations'];
    const data = translations[currentLanguage].tenseExplanations[tenseKey as TenseKey];
    if (!data) return;

    if ('ar' in data.examples) { // Type guard for Infinitivo, Gerundio, Participio
         modalBody.innerHTML = `
            <h2 id="modal-title">${data.title}</h2>
            <p class="explanation">${data.explanation}</p>
            <h3>${data.adverbsTitle}</h3><p>${data.adverbs}</p>
            <h3>${data.examplesTitle}</h3>
            <ul class="modal-examples-list">
                <li><strong>-AR:</strong> ${data.examples.ar}</li>
                <li><strong>-ER:</strong> ${data.examples.er}</li>
                <li><strong>-IR:</strong> ${data.examples.ir}</li>
            </ul>`;
    } else { // Handle regular tense tables
        const roots = { hablar: 'habl', comer: 'com', vivir: 'viv' };
        const examples = data.examples as { hablar: string[]; comer: string[]; vivir: string[]; };
        modalBody.innerHTML = `
            <h2 id="modal-title">${data.title}</h2>
            <p class="explanation">${data.explanation}</p>
            <h3>${data.adverbsTitle}</h3><p>${data.adverbs}</p>
            <h3>${data.examplesTitle}</h3>
            <table class="endings-table">
                <thead><tr><th>Pronombre</th><th>-AR (hablar)</th><th>-ER (comer)</th><th>-IR (vivir)</th></tr></thead>
                <tbody>
                    ${Object.keys(pronounMap).map((pronoun, i) => `
                        <tr>
                            <td>${pronounMap[pronoun as keyof typeof pronounMap]}</td>
                            <td>${boldEnding(examples.hablar[i], roots.hablar)}</td>
                            <td>${boldEnding(examples.comer[i], roots.comer)}</td>
                            <td>${boldEnding(examples.vivir[i], roots.vivir)}</td>
                        </tr>`).join('')}
                </tbody>
            </table>`;
    }
    
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = 'auto';
}

async function searchWord(word: string) {
    if (!word) return;
    const t = translations[currentLanguage];
    suggestionsContainer.hidden = true;
    input.value = word;

    renderDictionarySkeleton();
    input.disabled = true;
    button.disabled = true;
    let fullResponseText = '';

    try {
        const schemaForApi = JSON.parse(JSON.stringify(dictionarySchema));
        let prompt = '';
        
        if (currentLanguage === 'ka') {
            schemaForApi.properties.definicion.description = "La definición de la palabra en georgiano.";
            const exampleWithTranslationSchema = {
                type: Type.OBJECT,
                properties: {
                    frase_espanol: { type: Type.STRING, description: "La frase de ejemplo en español." },
                    frase_georgiano: { type: Type.STRING, description: "La traducción de la frase al georgiano." }
                },
                required: ["frase_espanol", "frase_georgiano"]
            };
             for (const key in schemaForApi.properties.ejemplos.properties) {
                schemaForApi.properties.ejemplos.properties[key] = exampleWithTranslationSchema;
            }

            prompt = `Busca la palabra en español '${word}'. Proporciona:
1. La palabra buscada.
2. Una breve definición EN GEORGIANO.
3. Una lista de sinónimos en español.
4. Una lista de antónimos en español.
5. Para cada uno de los siguientes tiempos/modos (Presente, Pretérito Perfecto Compuesto, Pretérito Perfecto Simple (Indefinido), Futuro Simple, y Gerundio), proporciona una frase de ejemplo EN ESPAÑOL y su correspondiente traducción AL GEORGIANO.
Responde únicamente con el objeto JSON que se ajuste al esquema proporcionado. Si la entrada no es una palabra válida, responde con un objeto JSON que contenga únicamente la propiedad "error".`;
        } else {
            prompt = `Busca la palabra en español '${word}'. Proporciona:
1. La palabra buscada.
2. Una breve definición EN ESPAÑOL.
3. Una lista de sinónimos en español.
4. Una lista de antónimos en español.
5. Una frase de ejemplo EN ESPAÑOL para cada uno de los siguientes tiempos/modos: Presente, Pretérito Perfecto Compuesto, Pretérito Perfecto Simple (Indefinido), Futuro Simple, y Gerundio.
Responde únicamente con el objeto JSON que se ajuste al esquema proporcionado. Si la entrada no es una palabra válida, responde con un objeto JSON que contenga únicamente la propiedad "error".`;
        }


        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: schemaForApi, temperature: 0.2 }
        });

        for await (const chunk of responseStream) {
            fullResponseText += chunk.text;
        }

        const wordData = JSON.parse(fullResponseText);
        if (wordData.error) throw new Error(wordData.error);
        
        addRecentWord(wordData.palabra);
        lastSearchedTerm = wordData.palabra; // Store term on success
        renderDictionaryResults(wordData);

    } catch (error) {
        console.error("API Error:", error);
        const userMessage = error instanceof Error ? error.message : t.errorDefault;
        resultsContainer.innerHTML = `<p class="error">${t.errorPrefix}: ${userMessage}</p>`;
        lastSearchedTerm = null; // Clear term on error
        renderDictionaryInitialView();
    } finally {
        input.disabled = false;
        button.disabled = false;
        input.focus();
    }
}


async function conjugateVerb(verb: string) {
    if (!verb) return;
    const t = translations[currentLanguage];
    suggestionsContainer.hidden = true;
    input.value = verb;

    renderConjugatorSkeleton();
    input.disabled = true;
    button.disabled = true;
    let fullResponseText = '';

    try {
        const schemaForApi = JSON.parse(JSON.stringify(conjugatorSchema));
        
        const definitionPrompt = currentLanguage === 'ka'
            ? `2. Una breve definición del verbo EN GEORGIANO.`
            : `2. Una breve definición.`;
        if (currentLanguage === 'ka') {
            schemaForApi.properties.definicion.description = "Una breve definición del verbo en georgiano.";
        }

        const prompt = `Conjuga el verbo en infinitivo en español '${verb}'. Proporciona:
1.  Su infinitivo. ${definitionPrompt} 3. El Gerundio. 4. El Participio. 5. Las conjugaciones Y una frase de ejemplo para cada uno de los siguientes tiempos: Presente, Pretérito perfecto, Pretérito indefinido, Pretérito imperfecto, y Futuro simple.
Responde únicamente con el objeto JSON que se ajuste al esquema proporcionado. Si la entrada no es un verbo en infinitivo válido en español, responde con un objeto JSON que contenga únicamente la propiedad "error".`;

        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: schemaForApi, temperature: 0.1 }
        });
        
        for await (const chunk of responseStream) {
            fullResponseText += chunk.text;
        }

        const conjugations = JSON.parse(fullResponseText);
        if (conjugations.error) throw new Error(conjugations.error);
        
        addRecentVerb(conjugations.infinitivo);
        lastSearchedTerm = conjugations.infinitivo; // Store term on success
        renderConjugations(conjugations);

    } catch (error) {
        console.error("API Error:", error);
        const userMessage = error instanceof Error ? error.message : t.errorDefault;
        resultsContainer.innerHTML = `<p class="error">${t.errorPrefix}: ${userMessage}</p>`;
        lastSearchedTerm = null; // Clear term on error
        renderConjugatorInitialView();
    } finally {
        input.disabled = false;
        button.disabled = false;
        input.focus();
    }
}

// --- Language & View Switcher ---
function updateUIForLanguage() {
    const t = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = t.pageTitle;

    const headerTitleEl = document.getElementById('header-title') as HTMLElement;
    if (currentView === 'dictionary') {
        headerTitleEl.textContent = t.dictionaryHeaderTitle;
    } else {
        headerTitleEl.textContent = t.headerTitle;
    }
    
    (document.getElementById('nav-conjugator') as HTMLElement).textContent = t.conjugatorTab;
    (document.getElementById('nav-dictionary') as HTMLElement).textContent = t.dictionaryTab;

    if (currentView === 'conjugator') {
        input.placeholder = t.inputPlaceholder;
        button.textContent = t.submitButton;
        const placeholder = document.getElementById('placeholder-text');
        if (placeholder) placeholder.textContent = t.placeholderText;
        if (document.querySelector('.tabs') || document.querySelector('.placeholder')) {
            renderConjugatorInitialView();
        }
    } else { // Dictionary view
        input.placeholder = t.dictionaryInputPlaceholder;
        button.textContent = t.dictionarySubmitButton;
        const placeholder = document.getElementById('placeholder-text');
        if (placeholder) placeholder.textContent = t.dictionaryPlaceholderText;
        if (document.querySelector('.tabs') || document.querySelector('.placeholder')) {
            renderDictionaryInitialView();
        }
    }

    (document.getElementById('footer-materials') as HTMLElement).innerHTML = t.footerMaterials;
    (document.getElementById('footer-gemini-credit') as HTMLElement).innerHTML = t.footerGeminiCredit;
    
    const footerLogo = document.getElementById('footer-logo-img') as HTMLImageElement;
    if (footerLogo) {
        footerLogo.src = LOGO_URLS[currentLanguage];
        footerLogo.alt = t.logoAltText;
    }
    
    langButtons.forEach(btn => {
        btn.classList.toggle('active', (btn as HTMLElement).dataset.lang === currentLanguage);
    });
}

function setView(view: View) {
    currentView = view;
    lastSearchedTerm = null; // Clear last search when view changes
    navConjugatorBtn.classList.toggle('active', view === 'conjugator');
    navDictionaryBtn.classList.toggle('active', view === 'dictionary');
    input.value = '';
    suggestionsContainer.hidden = true;
    renderApp();
}

function setLanguage(lang: Language) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateUIForLanguage(); // Update header buttons and static text immediately.

    // If a result is currently displayed, re-fetch it in the new language
    const isShowingResults = !document.querySelector('.tabs') && !document.querySelector('.placeholder') && !document.querySelector('.skeleton-container');
    if (lastSearchedTerm && isShowingResults) {
        if (currentView === 'conjugator') {
            conjugateVerb(lastSearchedTerm);
        } else {
            searchWord(lastSearchedTerm);
        }
    }
}

function getInitialLanguage(): Language {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'ka' || savedLang === 'es') {
        return savedLang;
    }
    return 'es';
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = (btn as HTMLElement).dataset.lang as Language;
        if (lang) setLanguage(lang);
    });
});

navConjugatorBtn.addEventListener('click', () => setView('conjugator'));
navDictionaryBtn.addEventListener('click', () => setView('dictionary'));


// --- Event Listeners & Initial Load ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = input.value.trim().toLowerCase();
    if (!searchTerm) return;

    // If Georgian is selected, try to translate the input to Spanish
    if (currentLanguage === 'ka' && currentView === 'conjugator') {
        const foundEntry = VERB_LIST.find(v => v.ka === searchTerm);
        if (foundEntry) {
            searchTerm = foundEntry.es;
        }
    }

    if (currentView === 'conjugator') {
        conjugateVerb(searchTerm);
    } else {
        searchWord(searchTerm);
    }
});

input.addEventListener('input', () => {
    const value = input.value.trim().toLowerCase();
    suggestionsContainer.innerHTML = '';
    if (value.length < 1 || currentView !== 'conjugator') {
        suggestionsContainer.hidden = true;
        return;
    }

    if (currentLanguage === 'ka') {
        const matches = VERB_LIST.filter(v => 
            v.es.startsWith(value) || v.ka.startsWith(value)
        ).slice(0, 6);

        if (matches.length > 0) {
            matches.forEach(match => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `<span>${match.es}</span><small class="translation">${match.ka}</small>`;
                item.addEventListener('click', () => {
                    input.value = match.es;
                    suggestionsContainer.hidden = true;
                    conjugateVerb(match.es);
                });
                suggestionsContainer.appendChild(item);
            });
            suggestionsContainer.hidden = false;
        } else {
            suggestionsContainer.hidden = true;
        }

    } else { // Spanish UI
        const matches = VERB_LIST.map(v => v.es).filter(v => v.startsWith(value)).slice(0, 6);
        if (matches.length > 0) {
            matches.forEach(match => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = match;
                item.addEventListener('click', () => {
                    input.value = match;
                    suggestionsContainer.hidden = true;
                    conjugateVerb(match);
                });
                suggestionsContainer.appendChild(item);
            });
            suggestionsContainer.hidden = false;
        } else {
            suggestionsContainer.hidden = true;
        }
    }
});

document.addEventListener('click', (e) => {
    if (e.target !== input) {
        suggestionsContainer.hidden = true;
    }
});


modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

// Initial Load
currentLanguage = getInitialLanguage();
renderApp();