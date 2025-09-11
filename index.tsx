/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- i18n Translations ---
const translations = {
    es: {
        pageTitle: "Conjugador de Verbos",
        headerTitle: "CONJUGADOR",
        inputPlaceholder: "Escribe un verbo en español...",
        submitButton: "Conjugar",
        placeholderText: "Introduce un verbo para ver sus conjugaciones.",
        conjugatingText: "Conjugando...",
        errorPrefix: "Error",
        errorDefault: "No se pudo conjugar el verbo. Por favor, inténtalo de nuevo.",
        popularTab: "Populares",
        favoritesTab: "Favoritos",
        recentsTab: "Recientemente",
        favoritesEmpty: "Añade verbos a favoritos con la estrella ★",
        recentsEmpty: "Tu historial de búsqueda aparecerá aquí.",
        favoriteAriaLabelAdd: "Añadir a favoritos",
        favoriteAriaLabelRemove: "Quitar de favoritos",
        exampleLabel: "Ejemplo",
        closeAriaLabel: "Cerrar",
        infinitiveCard: "Infinitivo",
        gerundCard: "Gerundio",
        participleCard: "Participio",
        footerCredit: 'Creado con la moderación de <a href="http://bit.ly/av-ma" target="_blank" rel="noopener noreferrer">Avtandil Machitadze</a> vía Gemini.',
        footerMaterials: 'Materiales de apoyo: <a href="https://es-avma.blogspot.com/" target="_blank" rel="noopener noreferrer">es-avma.blogspot.com</a>',
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
        pageTitle: "ესპანური ზმნების უღლება",
        headerTitle: "CONJUGADOR",
        inputPlaceholder: "დაწერეთ ზმნა ქართულად ან ესპანურად...",
        submitButton: "უღლება",
        placeholderText: "შეიყვანეთ ზმნა მისი უღლების სანახავად.",
        conjugatingText: "ვამზადებ უღლებას...",
        errorPrefix: "შეცდომა",
        errorDefault: "ზმნის უღლება ვერ მოხერხდა. გთხოვთ, სცადოთ თავიდან.",
        popularTab: "პოპულარული",
        favoritesTab: "ფავორიტები",
        recentsTab: "ბოლოს ნანახი",
        favoritesEmpty: "დაამატეთ ზმნები ფავორიტებში ვარსკვლავით ★",
        recentsEmpty: "თქვენი ძიების ისტორია აქ გამოჩნდება.",
        favoriteAriaLabelAdd: "ფავორიტებში დამატება",
        favoriteAriaLabelRemove: "ფავორიტებიდან წაშლა",
        exampleLabel: "მაგალითი",
        closeAriaLabel: "დახურვა",
        infinitiveCard: "Infinitivo",
        gerundCard: "Gerundio",
        participleCard: "Participio",
        footerCredit: 'შექმნილია <a href="http://bit.ly/av-ma" target="_blank" rel="noopener noreferrer">ავთანდილ მაჩიტაძის</a> მოდერაციით Gemini-ს საშუალებით.',
        footerMaterials: 'დამხმარე მასალები: <a href="https://es-avma.blogspot.com/" target="_blank" rel="noopener noreferrer">es-avma.blogspot.com</a>',
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
let currentLanguage: Language = 'es';

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


// --- Gemini JSON Schema ---
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

const schema = {
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
        error: { type: Type.STRING, description: "Mensaje de error si la entrada no es un verbo válido." }
    },
};

// --- localStorage Helpers ---
const MOST_COMMON_VERBS = ["ser", "estar", "tener", "hacer", "ir", "decir", "poder", "saber", "querer", "haber", "venir", "ver"];
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

function getFavorites(): string[] {
    return getFromStorage('favoriteVerbs');
}

function isFavorite(verb: string): boolean {
    return getFavorites().includes(verb.toLowerCase());
}

function toggleFavorite(verb: string) {
    verb = verb.toLowerCase();
    const favorites = getFavorites();
    const index = favorites.indexOf(verb);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.unshift(verb);
    }
    saveToStorage('favoriteVerbs', favorites);
}

function getRecents(): string[] {
    return getFromStorage('recentVerbs');
}

function addRecent(verb: string) {
    verb = verb.toLowerCase();
    let recents = getRecents();
    recents = recents.filter(v => v !== verb);
    recents.unshift(verb);
    if (recents.length > MAX_RECENTS) {
        recents.pop();
    }
    saveToStorage('recentVerbs', recents);
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

function renderInitialView() {
    resultsContainer.innerHTML = '';

    const recents = getRecents();
    const favorites = getFavorites();
    const t = translations[currentLanguage];

    const tabsData = [
        { id: 'populares', title: t.popularTab, verbs: MOST_COMMON_VERBS, emptyText: '' },
        { id: 'favoritos', title: t.favoritesTab, verbs: favorites, emptyText: t.favoritesEmpty },
        { id: 'recientes', title: t.recentsTab, verbs: recents, emptyText: t.recentsEmpty }
    ];

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs';

    const tabNav = document.createElement('div');
    tabNav.className = 'tab-nav';
    tabNav.setAttribute('role', 'tablist');

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';

    tabsData.forEach((tab, index) => {
        // Create tab button
        const button = document.createElement('button');
        button.className = 'tab-link' + (index === 0 ? ' active' : '');
        button.textContent = tab.title;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', `tab-${tab.id}`);
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.dataset.tabTarget = `#tab-${tab.id}`;
        tabNav.appendChild(button);

        // Create tab pane
        const pane = document.createElement('div');
        pane.id = `tab-${tab.id}`;
        pane.className = 'tab-pane' + (index === 0 ? ' active' : '');
        pane.setAttribute('role', 'tabpanel');
        
        if (tab.verbs.length > 0) {
            const gridEl = document.createElement('div');
            gridEl.className = 'verb-card-grid';
            gridEl.innerHTML = tab.verbs.map(verb =>
                `<button class="verb-card" data-verb="${verb}">${verb.charAt(0).toUpperCase() + verb.slice(1)}</button>`
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

    // Event listeners for tabs
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

    // Event listeners for verb cards
    document.querySelectorAll('.verb-card').forEach(card => {
        card.addEventListener('click', () => {
            const verb = (card as HTMLButtonElement).dataset.verb;
            if (verb) {
                input.value = verb;
                conjugateVerb(verb);
            }
        });
    });
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
        const isFav = isFavorite(verb);
        favoriteBtn.classList.toggle('favorited', isFav);
        favoriteBtn.setAttribute('aria-label', isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd);
    };
    updateFavBtn();

    favoriteBtn.addEventListener('click', () => {
        toggleFavorite(verb);
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
        // FIX: Cast data.examples to resolve union type ambiguity for properties 'hablar', 'comer', and 'vivir'. The type guard above ensures this is safe.
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

async function conjugateVerb(verb: string) {
    if (!verb) return;
    const t = translations[currentLanguage];
    suggestionsContainer.hidden = true;
    input.value = verb;

    resultsContainer.innerHTML = `<div class="loader-container"><div class="loader"></div><p>${t.conjugatingText}</p></div>`;
    input.disabled = true;
    button.disabled = true;

    try {
        const schemaForApi = JSON.parse(JSON.stringify(schema));
        
        const definitionPrompt = currentLanguage === 'ka'
            ? `2. Una breve definición del verbo EN GEORGIANO.`
            : `2. Una breve definición.`;
        if (currentLanguage === 'ka') {
            schemaForApi.properties.definicion.description = "Una breve definición del verbo en georgiano.";
        }

        const prompt = `Conjuga el verbo en infinitivo en español '${verb}'. Proporciona:
1.  Su infinitivo. ${definitionPrompt} 3. El Gerundio. 4. El Participio. 5. Las conjugaciones Y una frase de ejemplo para cada uno de los siguientes tiempos: Presente, Pretérito perfecto, Pretérito indefinido, Pretérito imperfecto, y Futuro simple.
Responde únicamente con el objeto JSON que se ajuste al esquema proporcionado. Si la entrada no es un verbo en infinitivo válido en español, responde con un objeto JSON que contenga únicamente la propiedad "error".`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: schemaForApi, temperature: 0.1 }
        });

        const conjugations = JSON.parse(response.text);
        if (conjugations.error) throw new Error(conjugations.error);
        
        addRecent(conjugations.infinitivo);
        renderConjugations(conjugations);

    } catch (error) {
        console.error("API Error:", error);
        const userMessage = error instanceof Error ? error.message : t.errorDefault;
        resultsContainer.innerHTML = `<p class="error">${t.errorPrefix}: ${userMessage}</p>`;
        renderInitialView();
    } finally {
        input.disabled = false;
        button.disabled = false;
        input.focus();
    }
}

// --- Language Switcher ---
function updateUIForLanguage() {
    const t = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = t.pageTitle;

    (document.getElementById('header-title') as HTMLElement).textContent = t.headerTitle;
    (document.getElementById('verb-input') as HTMLInputElement).placeholder = t.inputPlaceholder;
    (document.getElementById('submit-button') as HTMLButtonElement).textContent = t.submitButton;
    const placeholder = document.getElementById('placeholder-text');
    if (placeholder) placeholder.textContent = t.placeholderText;

    (document.getElementById('footer-credit') as HTMLElement).innerHTML = t.footerCredit;
    (document.getElementById('footer-materials') as HTMLElement).innerHTML = t.footerMaterials;
    
    langButtons.forEach(btn => {
        btn.classList.toggle('active', (btn as HTMLElement).dataset.lang === currentLanguage);
    });

    if (document.querySelector('.tabs') || document.querySelector('.placeholder')) {
        renderInitialView();
    } else if (document.querySelector('.verb-title')) {
        const favBtn = document.querySelector('.favorite-btn') as HTMLButtonElement;
        if(favBtn) {
            const isFav = favBtn.classList.contains('favorited');
            favBtn.setAttribute('aria-label', isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd);
        }
        document.querySelectorAll('.example-sentence strong:first-child').forEach(el => {
            (el as HTMLElement).textContent = `${t.exampleLabel}:`;
        });
        document.querySelectorAll('.form-card h3').forEach(el => {
            const key = (el.parentElement as HTMLElement).dataset.tense;
            if (key === 'infinitive') el.textContent = t.infinitiveCard;
            else if (key === 'gerundio') el.textContent = t.gerundCard;
            else if (key === 'participio') el.textContent = t.participleCard;
        });
    }
}

function setLanguage(lang: Language) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateUIForLanguage();
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

// --- Event Listeners & Initial Load ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let verb = input.value.trim().toLowerCase();

    if (currentLanguage === 'ka') {
        const foundVerb = VERB_LIST.find(v => v.ka === verb);
        if (foundVerb) {
            verb = foundVerb.es;
        }
    }
    conjugateVerb(verb);
});

input.addEventListener('input', () => {
    const value = input.value.trim().toLowerCase();
    suggestionsContainer.innerHTML = '';
    if (value.length < 1) {
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
updateUIForLanguage();
renderInitialView();