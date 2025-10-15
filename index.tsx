/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from '@google/genai';

// Polyfill for SpeechRecognition API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
declare var Cropper: any;
declare var mammoth: any;
declare var pdfjsLib: any;


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const FLAG_URLS = {
    es: 'https://flagcdn.com/es.svg',
    ka: 'https://flagcdn.com/ge.svg'
};

const PRINTER_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></svg>';

// --- i18n Translations ---
const translations = {
    es: {
        pageTitle: "Conjugador, Diccionario y Traductor",
        headerTitle: "CONJUGADOR",
        dictionaryHeaderTitle: "DICCIONARIO",
        translatorHeaderTitle: "TRADUCTOR",
        practiceHeaderTitle: "PRÁCTICA",
        historyHeaderTitle: "HISTORIAL",
        favoritesHeaderTitle: "FAVORITOS",
        aboutHeaderTitle: "Sobre la App y Ayuda",
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
        recentsTab: "Recientes",
        favoritesEmptyConjugator: "Añade verbos a favoritos con la estrella ★",
        favoritesEmptyDictionary: "Añade palabras a favoritos con la estrella ★",
        favoritesEmptyTranslator: "Añade traducciones a favoritos desde el historial.",
        recentsEmpty: "Tu historial de búsqueda aparecerá aquí.",
        favoriteAriaLabelAdd: "Añadir a favoritos",
        favoriteAriaLabelRemove: "Quitar de favoritos",
        exampleLabel: "Ejemplo",
        closeAriaLabel: "Cerrar",
        infinitiveCard: "Infinitivo",
        gerundCard: "Gerundio",
        participleCard: "Participio",
        footerMaterials: 'Materiales: <a href="https://es-avma.blogspot.com/" target="_blank" rel="noopener noreferrer">avma-es</a>',
        footerAbout: "Sobre la app",
        footerGeminiCredit: '',
        conjugatorTab: "Conjugador",
        dictionaryTab: "Diccionario",
        translatorTab: "Traductor",
        practiceTab: "Práctica",
        historyTab: "Historial",
        translateButton: "Traducir",
        sourceTextPlaceholder: "Escribe algo para traducir...",
        translatingText: "Traduciendo...",
        definitionLabel: "Definición",
        synonymsLabel: "Sinónimos",
        antonymsLabel: "Antónimos",
        examplesLabel: "Ejemplos",
        pluralFormLabel: "Forma Plural",
        spanish: "Español",
        georgian: "Georgiano",
        paste: "Pegar",
        copy: "Copiar",
        copied: "¡Copiado!",
        speak: "Pronunciar",
        speaking: "Pronunciando...",
        image: "Imagen",
        listening: "Escuchando...",
        speakNow: "Habla ahora...",
        micErrorGeneric: "No se pudo usar el micrófono.",
        micPermissionDeniedTitle: "Permiso de micrófono denegado",
        micPermissionDeniedBody: "Has bloqueado el acceso al micrófono. Para usar el dictado por voz, ve a la configuración de tu navegador y permite que este sitio acceda a tu micrófono.",
        okButton: "OK",
        translatingImage: "Analizando imagen...",
        uploadImageTitle: "Subir Imagen",
        uploadDocument: "Subir Documento",
        takePhoto: "Tomar Foto",
        fromGallery: "Desde Galería",
        historyEmpty: "Tu historial de traducciones está vacío.",
        clearHistory: "Limpiar Historial",
        clearText: "Limpiar texto",
        sourceText: "Texto Original",
        translatedText: "Texto Traducido",
        back: "Volver",
        cropAndTranslate: "Recortar y Traducir",
        history: "Historial",
        favorites: "Favoritos",
        commonPhrasesTitle: "Frases Comunes",
        pwaInstallTitle: "Instalar Aplicación",
        pwaInstallBody: "Añade esta aplicación a tu pantalla de inicio para un acceso rápido y sin conexión.",
        pwaInstallConfirm: "Instalar",
        pwaInstallDecline: "Ahora no",
        confirmClearHistory: "¿Estás seguro de que quieres borrar todo el historial de traducciones?",
        cropTitle: "Recortar Imagen",
        derivedVerbTitle: "Verbo Derivado",
        conjugateButton: "Conjugar",
        simplifyLabel: "Traducir en lenguaje sencillo",
        print: "Imprimir",
        startPracticeSession: "Empezar Sesión de Práctica",
        loadingPracticeSession: "Generando tu sesión de práctica...",
        questionOf: "Pregunta {current} de {total}",
        checkAnswer: "Comprobar",
        nextQuestion: "Siguiente Pregunta",
        correct: "¡Correcto!",
        incorrect: "Incorrecto.",
        correctAnswerIs: "La respuesta correcta es:",
        sessionComplete: "¡Sesión Completada!",
        yourScore: "Tu Puntuación: {score} / {total}",
        performanceAnalysis: "Análisis de Rendimiento",
        loadingAnalysis: "Analizando tus resultados...",
        startNewAdaptedSession: "Empezar Nueva Sesión Adaptada",
        reviewYourMistakes: "Revisa tus errores:",
        noMistakes: "¡Felicidades, no cometiste errores!",
        practiceIntro: "Pon a prueba tus conocimientos con ejercicios adaptados. Cada sesión tiene 10 preguntas. ¡Buena suerte!",
        practiceEmpty: "Tu historial de práctica está vacío. ¡Completa una sesión para empezar!",
        aboutContent: `
            <div class="about-section">
                <h2>Aplicación de Español</h2>
                <p>Esta es una herramienta universal para el aprendizaje y uso diario del idioma español, creada para fines personales y de aficionado.</p>
                <p>La aplicación combina tres funciones principales:</p>
                <ul class="feature-list">
                    <li>✔︎ Conjugador de Verbos</li>
                    <li>✔︎ Diccionario</li>
                    <li>✔︎ Traductor</li>
                </ul>
                <p>Todas las funciones se basan en la inteligencia artificial de Google Gemini.</p>
                <p>⚠️ A veces es posible que una solicitud falle; en ese caso, inténtalo de nuevo.</p>
                <p>⚠️ La plataforma procesa solo una solicitud por segundo.</p>
            </div>
            <div class="about-section">
                <h2>¿Cómo funciona cada sección?</h2>
                
                <h3>1. Conjugador</h3>
                <p>Escribe cualquier verbo en español (ej. hablar, comer, vivir) y presiona "Conjugar".</p>
                <ul class="feature-list">
                    <li>✔︎ Verás las formas principales y las tablas de tiempos verbales.</li>
                    <li>✔︎ Haz clic en el título de un tiempo para obtener una explicación.</li>
                    <li>✔︎ Con la estrella ★ puedes guardar en favoritos.</li>
                    <li>✔︎ Si el idioma del sitio es georgiano, puedes escribir el verbo en georgiano y obtener tanto la traducción como la conjugación.</li>
                </ul>

                <h3>2. Diccionario</h3>
                <p>Escribe una palabra en español o georgiano y presiona "Buscar".</p>
                <ul class="feature-list">
                    <li>✔︎ Obtendrás la definición, género, sinónimos/antónimos y ejemplos.</li>
                    <li>✔︎ Algunos sustantivos incluyen un verbo relacionado (con un botón para conjugar).</li>
                    <li>✔︎ Las palabras se pueden guardar en favoritos con la estrella ★.</li>
                </ul>

                <h3>3. Traductor</h3>
                <p>Una herramienta para traducir entre español y georgiano:</p>
                <ul class="feature-list spaced">
                    <li><strong>Texto:</strong> Escribe o pega.</li>
                    <li><strong>Voz 🎙️:</strong> Di una frase usando el micrófono.</li>
                    <li><strong>Imagen 🖼️:</strong> Toma o elige una foto y selecciona el texto.</li>
                </ul>
                <p><strong>Además:</strong></p>
                <ul class="feature-list">
                    <li>✔︎ Traducciones recientes ◷ y favoritos ★.</li>
                    <li>✔︎ Cambia de idioma con las flechas o en el área de texto.</li>
                    <li>✔︎ Botón "Traducir en lenguaje sencillo" para principiantes.</li>
                    <li>✔︎ En la sección "Frases Comunes" aparecen las últimas 5 frases guardadas en favoritos.</li>
                </ul>
            </div>
        `,
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
        pageTitle: "უღლება, ლექსიკონი და მთარგმნელი",
        headerTitle: "უღლება",
        dictionaryHeaderTitle: "ლექსიკონი",
        translatorHeaderTitle: "მთარგმნელი",
        practiceHeaderTitle: "პრაქტიკა",
        historyHeaderTitle: "ისტორია",
        favoritesHeaderTitle: "ფავორიტები",
        aboutHeaderTitle: "საიტის შესახებ",
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
        popularTab: "პოპუ.",
        favoritesTab: "ფავო.",
        recentsTab: "ბოლოები",
        favoritesEmptyConjugator: "დაამატეთ ზმნები ფავორიტებში ვარსკვლავით ★",
        favoritesEmptyDictionary: "დაამატეთ სიტყვეი ფავორიტებში ვარსკვლავით ★",
        favoritesEmptyTranslator: "დაამატეთ თარგმანები ფავორიტებში ისტორიიდან.",
        recentsEmpty: "თქვენი ძიების ისტორია აქ გამოჩნდება.",
        favoriteAriaLabelAdd: "ფავორიტებში დამატება",
        favoriteAriaLabelRemove: "ფავორიტებიდან წაშლა",
        exampleLabel: "მაგალითი",
        closeAriaLabel: "დახურვა",
        infinitiveCard: "Infinitivo",
        gerundCard: "Gerundio",
        participleCard: "Participio",
        footerMaterials: 'მასალები: <a href="https://es-avma.blogspot.com/" target="_blank" rel="noopener noreferrer">avma-es</a>',
        footerAbout: "აპლიკაციის შესახებ",
        footerGeminiCredit: '',
        conjugatorTab: "უღლება",
        dictionaryTab: "ლექსიკონი",
        translatorTab: "მთარგმნელი",
        practiceTab: "პრაქტიკა",
        historyTab: "ისტორია",
        translateButton: "თარგმნა",
        sourceTextPlaceholder: "დაწერეთ ტექსტი თარგმნისთვის...",
        translatingText: "ვთარგმნი...",
        definitionLabel: "განმარტება",
        synonymsLabel: "სინონიმები",
        antonymsLabel: "ანტონიმები",
        examplesLabel: "მაგალითები",
        pluralFormLabel: "მრავლობითი რიცხვი",
        spanish: "ესპანური",
        georgian: "ქართული",
        paste: "ჩასმა",
        copy: "კოპირება",
        copied: "დაკოპირდა!",
        speak: "გამოთქმა",
        speaking: "გამოვთქვამ...",
        image: "სურათი",
        listening: "გისმენთ...",
        speakNow: "ისაუბრეთ...",
        micErrorGeneric: "მიკროფონის გამოყენება ვერ მოხერხდა.",
        micPermissionDeniedTitle: "მიკროფონზე წვდომა დაბლოკილია",
        micPermissionDeniedBody: "თქვენ დაბლოკეთ მიკროფონზე წვდომა. ხმით შეყვანის გამოსაყენებლად, გთხოვთ, გადადით თქვენი ბრაუზერის პარამეტრებში და მიეცით ამ საიტს მიკროფონის გამოყენების უფლება.",
        okButton: "კარგი",
        translatingImage: "სურათის ანალიზი...",
        uploadImageTitle: "სურათის ატვირთვა",
        uploadDocument: "დოკუმენტის ატვირთვა",
        takePhoto: "სურათის გადაღება",
        fromGallery: "გალერეიდან არჩევა",
        historyEmpty: "თქვენი თარგმანების ისტორია ცარიელია.",
        clearHistory: "ისტორიის გასუფთავება",
        clearText: "ტექსტის გასუფთავება",
        sourceText: "საწყისი ტექსტი",
        translatedText: "ნათარგმნი ტექსტი",
        back: "უკან",
        cropAndTranslate: "ამოჭრა და თარგმნა",
        history: "ისტორია",
        favorites: "Favoritos",
        commonPhrasesTitle: "ხშირი ფრაზები",
        pwaInstallTitle: "აპლიკაციის დაყენება",
        pwaInstallBody: "დაამატეთ აპლიკაცია მთავარ ეკრანზე სწრაფი და მარტივი წვდომისთვის.",
        pwaInstallConfirm: "დაყენება",
        pwaInstallDecline: "მოგვიანებით",
        confirmClearHistory: "დარწმუნებული ხართ, რომ გსურთ თარგმანების ისტორიის სრულად გასუფთავება?",
        cropTitle: "სურათის ამოჭრა",
        derivedVerbTitle: "ნაწარმოები ზმნა",
        conjugateButton: "უღლება",
        simplifyLabel: "მარტივი ენით თარგმნა",
        print: "ბეჭდვა",
        startPracticeSession: "სავარჯიშოს დაწყება",
        loadingPracticeSession: "ვამზადებ სავარჯიშოს...",
        questionOf: "კითხვა {current} / {total}",
        checkAnswer: "შემოწმება",
        nextQuestion: "შემდეგი კითხვა",
        correct: "სწორია!",
        incorrect: "არასწორია.",
        correctAnswerIs: "სწორი პასუხია:",
        sessionComplete: "სესია დასრულებულია!",
        yourScore: "შენი შედეგი: {score} / {total}",
        performanceAnalysis: "შედეგების ანალიზი",
        loadingAnalysis: "ვაანალიზებ შედეგებს...",
        startNewAdaptedSession: "ახალი, მორგებული სესიის დაწყება",
        reviewYourMistakes: "შენი შეცდომები:",
        noMistakes: "გილოცავ, შეცდომები არ დაგიშვია!",
        practiceIntro: "შემოიწმე შენი ცოდნა მორგებული სავარჯიშოებით. თითოეული სესია 10 კითხვისგან შედგება. წარმატებები!",
        practiceEmpty: "პრაქტიკის ისტორია ცარიელია. დაასრულე სესია, რომ დაიწყო!",
        aboutContent: `
            <div class="about-section">
                <h2>ესპანური ენის აპლიკაცია</h2>
                <p>ეს არის უნივერსალური ინსტრუმენტი ესპანური ენის შესასწავლად და ყოველდღიური გამოყენებისთვის, შექმნილი სამოყვარულო და პირადი დანიშნულებით.</p>
                <p>აპლიკაცია აერთიანებს სამ ძირითად ფუნქციას:</p>
                <ul class="feature-list">
                    <li>✔︎ ზმნის უღლება</li>
                    <li>✔︎ ლექსიკონი</li>
                    <li>✔︎ მთარგმნელი</li>
                </ul>
                <p>ყველა ფუნქცია მუშაობს Google Gemini ხელოვნურ ინტელექტზე დაყრდნობით.</p>
                <p>⚠️ ზოგჯერ შესაძლებელია, რომ მოთხოვნა ვერ შესრულდეს — ასეთ შემთხვევაში სცადეთ განმეორებით.</p>
                <p>⚠️ პლატფორმა ერთ წამში მხოლოდ ერთ თხოვნას ამუშავებს.</p>
            </div>
            <div class="about-section">
                <h2>როგორ მუშაობს თითოეული სექცია?</h2>
                
                <h3>1. უღლება</h3>
                <p>ჩაწერეთ ნებისმიერი ესპანური ზმნა (მაგ. hablar, comer, vivir) და დააჭირეთ „უღლებას“.</p>
                <ul class="feature-list">
                    <li>✔︎ იხილავთ ძირითად ფორმებსა და დროების ცხრილებს.</li>
                    <li>✔︎ დროის სათაურზე დაჭერით მიიღებთ ახსნას.</li>
                    <li>✔︎ ვარსკვლავით ★ შეინახავთ ფავორიტებში.</li>
                    <li>✔︎ თუ საიტის ენა ქართულზეა, შეგიძლიათ ზმნა ქართულად ჩაწეროთ და მიიღოთ თარგმნაც და უღლებაც.</li>
                </ul>

                <h3>2. ლექსიკონი</h3>
                <p>ჩაწერეთ სიტყვა ესპანურად ან ქართულად და დააჭირეთ „ძებნას“.</p>
                <ul class="feature-list">
                    <li>✔︎ მიიღებთ განმარტებას, სქესს, სინონიმებს/ანტონიმებს და მაგალითებს.</li>
                    <li>✔︎ ზოგ არსებითს ახლავს დაკავშირებული ზმნა (უღლების ღილაკით).</li>
                    <li>✔︎ სიტყვების შენახვა შესაძლებელია ფავორიტებში ★.</li>
                </ul>

                <h3>3. მთარგმნელი</h3>
                <p>ინსტრუმენტი ესპანურ და ქართულ ენებს შორის:</p>
                <ul class="feature-list spaced">
                    <li><strong>ტექსტი:</strong> ჩაწერეთ ან ჩასვით.</li>
                    <li><strong>ხმა 🎙️:</strong> მიკროფონით თქვით ფრაზა.</li>
                    <li><strong>სურათი 🖼️:</strong> გადაიღეთ ან აირჩიეთ ფოტო და მონიშნეთ ტექსტი.</li>
                </ul>
                <p><strong>დამატებით:</strong></p>
                 <ul class="feature-list">
                    <li>✔︎ ბოლო თარგმანები ◷ და ფავორიტები ★.</li>
                    <li>✔︎ ენის შეცვლა ისრებით ან ტექსტის არეში.</li>
                    <li>✔︎ ღილაკი „მარტივი ენით თარგმნა“ დამწყებთათვის.</li>
                    <li>✔︎ ბლოკში „ხშირი ფრაზები“ ჩანს ბოლოს დაფავორიტებული 5 წინადადება.</li>
                </ul>
            </div>
        `,
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
                explanation: "ნამყო მიმღეობა ძირითდად გამოიყენება რთული დროების (როგორიცაა Pretérito Perfecto) საწარმოებლად დამხმარე ზმნა 'haber'-თან ერთად. ასევე, შეიძლება გამოყენებულ იქნას როგორც ზედსართავი სახელი მოქმედების შედეგად მიღებული მდგომარეობის აღსაწერად. წესიერი მიმღეობები ბოლოვდება -ado-ზე (-ar ზმნები) და -ido-ზე (-er, -ir ზმნები).",
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
type View = 'conjugator' | 'dictionary' | 'translator' | 'practice' | 'history' | 'favorites' | 'about';
type TranslationItem = {
    sourceLang: Language;
    targetLang: Language;
    sourceText: string;
    translatedText: string;
    timestamp: number;
};
type PracticeQuestion = {
    type: 'FILL_IN_THE_BLANK_VERB' | 'MULTIPLE_CHOICE_TRANSLATION' | 'MULTIPLE_CHOICE_VOCAB';
    sentence_template?: string;
    verb_infinitive?: string;
    tense_hint?: string;
    question_text?: string;
    options?: string[];
    correct_answer: string;
    explanation: string;
};
type PracticeSession = {
    questions: PracticeQuestion[];
    userAnswers: (string | null)[];
    currentQuestionIndex: number;
    isComplete: boolean;
};
type PracticeHistoryItem = {
    timestamp: number;
    score: number;
    total: number;
    mistakes: {
        question: PracticeQuestion;
        userAnswer: string;
    }[];
};


let currentLanguage: Language = 'es';
let currentView: View = 'translator';
let lastSearchedTerm: string | null = null;
let translatorSourceLang: Language = 'es';
let translatorTargetLang: Language = 'ka';
let lastTranslationItem: TranslationItem | null = null;
let cropper: any = null;
let recognition: any = null;
let deferredInstallPrompt: any = null;
let wakeLockSentinel: any = null;
let currentSpeech: SpeechSynthesisUtterance | null = null;
let voices: SpeechSynthesisVoice[] = [];
let simplifyTranslation = false;
let currentPracticeSession: PracticeSession | null = null;


// --- Text-to-Speech ---
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}
// Load voices when they are ready & also try immediately
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speakText(text: string, lang: Language, btn: HTMLButtonElement | null) {
    // If the same button is clicked while speaking, just stop.
    if (speechSynthesis.speaking && currentSpeech && currentSpeech.text === text) {
        speechSynthesis.cancel();
        return;
    }
    
    // Cancel any other ongoing speech before starting a new one.
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    if (!text || lang !== 'es') { // Only supporting Spanish for now
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    currentSpeech = utterance;
    
    const spanishVoice = voices.find(voice => voice.lang === 'es-ES') || voices.find(voice => voice.lang.startsWith('es-'));
    if (spanishVoice) {
        utterance.voice = spanishVoice;
    }
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;

    const originalTitle = btn?.title;
    const t = translations[currentLanguage];

    utterance.onstart = () => {
        if (btn) {
            btn.classList.add('speaking');
            btn.title = t.speaking;
        }
    };

    utterance.onend = () => {
        if (btn) {
            btn.classList.remove('speaking');
            btn.title = originalTitle || t.speak;
        }
        currentSpeech = null;
    };
    
    utterance.onerror = (e) => {
         if (btn) {
            btn.classList.remove('speaking');
            btn.title = originalTitle || t.speak;
        }
        // Don't log 'interrupted' errors, as they are expected when starting a new speech.
        if ((e as SpeechSynthesisErrorEvent).error !== 'interrupted') {
            console.error('Speech synthesis error:', (e as SpeechSynthesisErrorEvent).error);
        }
        currentSpeech = null;
    };

    speechSynthesis.speak(utterance);
}


// DOM Elements
const form = document.getElementById('conjugator-form') as HTMLFormElement;
const input = document.getElementById('verb-input') as HTMLInputElement;
const button = document.getElementById('submit-button') as HTMLButtonElement;
const resultsContainer = document.getElementById('results-container') as HTMLElement;
const modal = document.getElementById('tense-modal') as HTMLElement;
const modalBody = document.getElementById('modal-body-content') as HTMLElement;
const modalCloseBtn = document.getElementById('modal-close-btn') as HTMLButtonElement;
const langButtons = document.querySelectorAll('.lang-btn');
const mobileLangBtn = document.getElementById('mobile-lang-btn') as HTMLButtonElement;
const suggestionsContainer = document.getElementById('autocomplete-suggestions') as HTMLElement;
const navConjugatorBtn = document.getElementById('nav-conjugator') as HTMLButtonElement;
const navDictionaryBtn = document.getElementById('nav-dictionary') as HTMLButtonElement;
const navTranslatorBtn = document.getElementById('nav-translator') as HTMLButtonElement;
const navPracticeBtn = document.getElementById('nav-practice') as HTMLButtonElement;
const bottomNavConjugatorBtn = document.getElementById('bottom-nav-conjugator') as HTMLButtonElement;
const bottomNavDictionaryBtn = document.getElementById('bottom-nav-dictionary') as HTMLButtonElement;
const bottomNavTranslatorBtn = document.getElementById('bottom-nav-translator') as HTMLButtonElement;
const imageOptionsModal = document.getElementById('image-options-modal') as HTMLElement;
const imageUploadGalleryInput = document.getElementById('image-upload-gallery') as HTMLInputElement;
const imageUploadCameraInput = document.getElementById('image-upload-camera') as HTMLInputElement;
const documentUploadInput = document.getElementById('document-upload-input') as HTMLInputElement;
const cropperModal = document.getElementById('cropper-modal') as HTMLElement;
const alertModal = document.getElementById('alert-modal') as HTMLElement;
const alertModalTitle = document.getElementById('alert-modal-title') as HTMLElement;
const alertModalBody = document.getElementById('alert-modal-body') as HTMLElement;
const alertModalCloseBtn = document.getElementById('alert-modal-close-btn') as HTMLElement;


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
        articulo: { type: Type.STRING, description: "El artículo definido ('el' o 'la'). Si la palabra tiene ambos géneros, debe ser un string como 'El (La)'. Nulo si no aplica." },
        forma_plural: { type: Type.STRING, description: "La forma plural de la palabra. Nulo si no aplica (p. ej., es un verbo, sustantivo incontable)." },
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
        verbo_derivado: {
            type: Type.OBJECT,
            description: "Un verbo derivado del sustantivo, si existe.",
            properties: {
                verbo: { type: Type.STRING, description: "El infinitivo del verbo derivado." },
                definicion: { type: Type.STRING, description: "La definición del verbo derivado." }
            }
        },
        error: { type: Type.STRING, description: "Mensaje de error si la entrada no es una palabra válida." }
    },
};

const practiceQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        type: {
            type: Type.STRING,
            description: "Can be 'FILL_IN_THE_BLANK_VERB', 'MULTIPLE_CHOICE_TRANSLATION', or 'MULTIPLE_CHOICE_VOCAB'."
        },
        sentence_template: {
            type: Type.STRING,
            description: "For FILL_IN_THE_BLANK_VERB. A sentence with '___' where the verb should go. E.g., 'Yo ___ (comer) una manzana.'"
        },
        verb_infinitive: {
            type: Type.STRING,
            description: "For FILL_IN_THE_BLANK_VERB. The infinitive verb to be conjugated."
        },
        tense_hint: {
            type: Type.STRING,
            description: "For FILL_IN_THE_BLANK_VERB. The tense to conjugate the verb in, e.g., 'Presente'."
        },
        question_text: {
            type: Type.STRING,
            description: "For MULTIPLE_CHOICE types. The question to be asked. E.g., 'What is the Spanish word for `car`?'"
        },
        options: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            },
            description: "For MULTIPLE_CHOICE types. An array of 4 strings for the options."
        },
        correct_answer: {
            type: Type.STRING,
            description: "The correct answer string."
        },
        explanation: {
            type: Type.STRING,
            description: "A brief explanation of why the answer is correct."
        }
    },
    required: ["type", "correct_answer", "explanation"]
};

const practiceSessionSchema = {
    type: Type.ARRAY,
    description: "An array of exactly 10 practice question objects.",
    items: practiceQuestionSchema
};


// --- localStorage Helpers ---
const MOST_COMMON_VERBS = ["ser", "estar", "tener", "hacer", "ir", "decir", "poder", "saber", "querer", "haber", "venir", "ver"];
const MOST_COMMON_WORDS = ["hola", "adiós", "gracias", "casa", "amigo", "bueno", "grande", "amarillo", "comida", "agua", "tiempo", "ahora"];
const MAX_RECENTS = 12;

function getFromStorage<T>(key: string, fallback: T): T {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
        console.error(`Failed to parse ${key} from localStorage`, e);
        return fallback;
    }
}

function saveToStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Conjugator storage
function getFavoriteVerbs(): string[] { return getFromStorage('favoriteVerbs', []); }
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
function getRecentVerbs(): string[] { return getFromStorage('recentVerbs', []); }
function addRecentVerb(verb: string) {
    verb = verb.toLowerCase();
    let recents = getRecentVerbs();
    recents = recents.filter(v => v !== verb);
    recents.unshift(verb);
    if (recents.length > MAX_RECENTS) recents.pop();
    saveToStorage('recentVerbs', recents);
}

// Dictionary storage
function getFavoriteWords(): string[] { return getFromStorage('favoriteWords', []); }
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
function getRecentWords(): string[] { return getFromStorage('recentWords', []); }
function addRecentWord(word: string) {
    word = word.toLowerCase();
    let recents = getRecentWords();
    recents = recents.filter(w => w !== word);
    recents.unshift(word);
    if (recents.length > MAX_RECENTS) recents.pop();
    saveToStorage('recentWords', recents);
}

// Translation History & Favorites Storage
function getTranslationHistory(): TranslationItem[] { return getFromStorage('translationHistory', []); }
function saveTranslationHistory(history: TranslationItem[]) { saveToStorage('translationHistory', history); }
function addTranslationToHistory(item: Omit<TranslationItem, 'timestamp'>): TranslationItem {
    const history = getTranslationHistory();
    const newEntry: TranslationItem = { ...item, timestamp: Date.now() };
    history.unshift(newEntry);
    if (history.length > 50) history.pop(); // Limit history size
    saveTranslationHistory(history);
    return newEntry;
}
function clearTranslationHistory() {
    if (confirm(translations[currentLanguage].confirmClearHistory)) {
        saveTranslationHistory([]);
        renderHistoryView();
    }
}

function getFavoriteTranslations(): TranslationItem[] { return getFromStorage('favoriteTranslations', []); }
function saveFavoriteTranslations(favorites: TranslationItem[]) { saveToStorage('favoriteTranslations', favorites); }
function isFavoriteTranslation(itemToFind: TranslationItem): boolean {
    const favorites = getFavoriteTranslations();
    return favorites.some(fav => fav.timestamp === itemToFind.timestamp);
}
function toggleFavoriteTranslation(itemToToggle: TranslationItem) {
    let favorites = getFavoriteTranslations();
    const index = favorites.findIndex(fav => fav.timestamp === itemToToggle.timestamp);
    if (index > -1) {
        favorites.splice(index, 1); // Unfavorite
    } else {
        favorites.unshift(itemToToggle); // Favorite
    }
    saveFavoriteTranslations(favorites);
}

// Practice History Storage
function getPracticeHistory(): PracticeHistoryItem[] { return getFromStorage('practiceHistory', []); }
function addPracticeResultToHistory(result: PracticeHistoryItem) {
    const history = getPracticeHistory();
    history.unshift(result);
    if (history.length > 20) history.pop(); // Keep last 20 sessions
    saveToStorage('practiceHistory', history);
}

// --- Screen Wake Lock ---
const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            // Do not request a new lock if one is already active.
            if (wakeLockSentinel) {
                return;
            }
            wakeLockSentinel = await navigator.wakeLock.request('screen');
            wakeLockSentinel.addEventListener('release', () => {
                // This event is fired when the lock is released by the system.
                wakeLockSentinel = null;
            });
        } catch (err: any) {
            // The Wake Lock API may be disallowed by browser permissions policy.
            // It's a non-essential feature, so we can fail silently on NotAllowedError.
            if (err.name !== 'NotAllowedError') {
                console.error(`Could not acquire Wake Lock: ${err.name}, ${err.message}`);
            }
        }
    }
};

const releaseWakeLock = async () => {
    if (wakeLockSentinel) {
        await wakeLockSentinel.release();
        wakeLockSentinel = null;
    }
};

// --- Print Handler ---
function handlePrint(printableAreaSelector: string, cleanupCallback?: () => void) {
    const printableArea = document.querySelector(printableAreaSelector);
    if (!printableArea) {
        if (cleanupCallback) cleanupCallback();
        return;
    }
    
    document.body.classList.add('is-printing');
    printableArea.classList.add('printable-area');

    window.print();

    // Use a timeout for cleanup as 'onafterprint' is not universally reliable
    setTimeout(() => {
        document.body.classList.remove('is-printing');
        printableArea.classList.remove('printable-area');
        if (cleanupCallback) {
            cleanupCallback();
        }
    }, 500);
}

function handleTranslatorPrint() {
    const t = translations[currentLanguage];
    const printableArea = document.querySelector('#translator-form .translator-io-grid');
    if (!printableArea) return;

    // Use querySelectorAll to be safe, although we expect specific children
    const sourceBox = printableArea.querySelectorAll('.translator-box')[0];
    const targetBox = printableArea.querySelectorAll('.translator-box')[1];

    if (!sourceBox || !targetBox) return;

    const sourceTitle = document.createElement('div');
    sourceTitle.className = 'print-title';
    sourceTitle.textContent = t.sourceText;
    sourceBox.prepend(sourceTitle);

    const targetTitle = document.createElement('div');
    targetTitle.className = 'print-title';
    targetTitle.textContent = t.translatedText;
    targetBox.prepend(targetTitle);

    handlePrint('#translator-form .translator-io-grid', () => {
        // Cleanup function to remove the added titles
        sourceTitle.remove();
        targetTitle.remove();
    });
}


// --- Modal Helpers ---
function openModalById(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }
}

function closeModalByEvent(event: Event) {
    const target = event.currentTarget as HTMLElement;
    if (target) {
        // Use closest to find the modal, in case the click is on an inner element.
        const modal = target.closest('.modal-overlay');
        if (modal) {
            (modal as HTMLElement).hidden = true;
            document.body.style.overflow = '';
        }
    }
}

// --- Gemini API Calls ---

async function conjugateVerb(verb: string) {
    if (!verb) return;
    if (verb === lastSearchedTerm) return;
    lastSearchedTerm = verb;

    const t = translations[currentLanguage];
    button.disabled = true;
    button.textContent = t.conjugatingText;
    input.value = verb;
    document.activeElement instanceof HTMLElement && document.activeElement.blur();
    
    renderConjugatorLayoutSkeleton();
    window.scrollTo(0, 0);

    try {
        const prompt = currentLanguage === 'ka'
            ? `Conjugate the Spanish verb "${verb}". The user might provide the verb in Georgian; if so, first translate it to a Spanish infinitive. Provide a brief definition of the verb in Georgian. The example sentences for each tense must also be in Georgian. If the input is not a valid verb, return an error message in Georgian in the 'error' field.`
            : `Conjuga el verbo en español "${verb}". Proporciona una breve definición. Si la entrada no es un verbo en infinitivo válido en español, devuelve un mensaje de error en el campo 'error'.`;
        
        addRecentVerb(verb);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: conjugatorSchema,
            }
        });
        
        const data = JSON.parse(response.text);

        if (data.error) {
            throw new Error(data.error);
        }

        await populateConjugatorResults(data);

        // Re-attach favorite button listener
        const favBtn = document.querySelector('.favorite-btn');
        if (favBtn) {
            favBtn.addEventListener('click', () => {
                const verbToFav = (favBtn as HTMLElement).dataset.verb;
                if (verbToFav) {
                    toggleFavoriteVerb(verbToFav);
                    const isFav = isFavoriteVerb(verbToFav);
                    favBtn.classList.toggle('favorited', isFav);
                    favBtn.setAttribute('aria-label', isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd);
                }
            });
        }
    } catch (error) {
        console.error("Conjugation error:", error);
        const errorMessage = (error instanceof Error && error.message) ? error.message : JSON.stringify(error);
        resultsContainer.innerHTML = `<p class="error-message">${t.errorPrefix}: ${errorMessage || t.errorDefault}</p>`;
    } finally {
        button.disabled = false;
        button.textContent = t.submitButton;
    }
}

async function searchWord(word: string) {
    if (!word) return;
    if (word === lastSearchedTerm) return;
    lastSearchedTerm = word;

    const t = translations[currentLanguage];
    button.disabled = true;
    button.textContent = t.searchingText;
    input.value = word;
    document.activeElement instanceof HTMLElement && document.activeElement.blur();
    
    renderDictionaryLayoutSkeleton();
    window.scrollTo(0, 0);

    try {
        addRecentWord(word);

        const prompt = currentLanguage === 'ka'
            ? `Search for the word "${word}" in either Spanish or Georgian. Provide a dictionary entry for it. The output language for definitions and examples must be Georgian. For example sentences in Spanish, provide a Georgian translation. Fill out the provided JSON schema. If the word doesn't exist, set the 'error' field.`
            : `Busca la palabra "${word}" en español. Proporciona una entrada de diccionario para ella. Rellena el esquema JSON proporcionado. Si la palabra no existe, establece el campo 'error'.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dictionarySchema,
            }
        });

        const data = JSON.parse(response.text);

        if (data.error) {
            throw new Error(data.error);
        }

        await populateDictionaryResults(data);
        
        // Attach event listeners after content is created
        document.querySelectorAll('.word-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const newWord = (tag as HTMLElement).dataset.word;
                if (newWord) {
                     input.value = newWord;
                     searchWord(newWord);
                }
            });
        });

        const favBtn = document.querySelector('.favorite-btn');
        favBtn?.addEventListener('click', () => {
            const wordToFav = (favBtn as HTMLElement).dataset.word;
            if (wordToFav) {
                toggleFavoriteWord(wordToFav);
                const isFav = isFavoriteWord(wordToFav);
                favBtn.classList.toggle('favorited', isFav);
                favBtn.setAttribute('aria-label', isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd);
            }
        });
        
        const derivedVerbBtn = document.querySelector('.derived-verb-conjugate-btn');
        derivedVerbBtn?.addEventListener('click', () => {
            const verbToConjugate = (derivedVerbBtn as HTMLElement).dataset.verb;
            if (verbToConjugate) {
                setView('conjugator');
                // Use a short timeout to ensure view is rendered before conjugating
                setTimeout(() => conjugateVerb(verbToConjugate), 50);
            }
        });

    } catch (error) {
        console.error("Dictionary search error:", error);
        const errorMessage = (error instanceof Error && error.message) ? error.message : JSON.stringify(error);
        resultsContainer.innerHTML = `<p class="error-message">${t.errorPrefix}: ${errorMessage || t.errorDefault}</p>`;
    } finally {
        button.disabled = false;
        button.textContent = t.dictionarySubmitButton;
    }
}

async function translateImage(base64Data: string, mimeType: string) {
    const t = translations[currentLanguage];
    const sourceDiv = document.getElementById('source-text') as HTMLDivElement;
    const targetDiv = document.getElementById('target-text') as HTMLDivElement;
    const translateButton = document.getElementById('translate-button') as HTMLButtonElement;

    if (!sourceDiv || !targetDiv || !translateButton) return;
    
    // Show loading state in both boxes
    sourceDiv.innerHTML = `<div class="spinner-small"></div> ${t.translatingImage}`;
    targetDiv.innerHTML = '';
    translateButton.disabled = true;
    translateButton.textContent = t.translatingText;
    
    try {
        const sourceLangName = t[translatorSourceLang === 'es' ? 'spanish' : 'georgian'];
        const targetLangName = t[translatorTargetLang === 'es' ? 'spanish' : 'georgian'];
        
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };
        const textPart = {
             text: `Extract any text from this image. Then, translate the extracted text from ${sourceLangName} to ${targetLangName}. If the image contains text in both languages, prioritize translating the ${sourceLangName} text. Respond with the translated text only.`
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        const translatedText = response.text;
        
        // We don't know the source text, so we'll just put a placeholder.
        const sourceHtml = `[${t.image}]`;
        sourceDiv.innerHTML = sourceHtml;
        targetDiv.innerHTML = translatedText;

        // Save to history and update state
        lastTranslationItem = addTranslationToHistory({
            sourceLang: translatorSourceLang,
            targetLang: translatorTargetLang,
            sourceText: sourceHtml,
            translatedText: translatedText,
        });

        // Update UI buttons
        const favoriteResultBtn = document.getElementById('favorite-result-btn') as HTMLButtonElement;
        const targetSpeakBtn = document.getElementById('target-speak-btn') as HTMLButtonElement;
        const printBtn = document.getElementById('print-btn') as HTMLButtonElement;

        const isFav = isFavoriteTranslation(lastTranslationItem);
        favoriteResultBtn.hidden = false;
        favoriteResultBtn.classList.toggle('favorited', isFav);
        favoriteResultBtn.title = isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd;
        
        targetSpeakBtn.hidden = translatorTargetLang !== 'es';
        printBtn.hidden = false;
        
        requestWakeLock();

    } catch (error) {
        console.error("Image translation error:", error);
        const errorMessage = (error instanceof Error && error.message) ? error.message : JSON.stringify(error);
        sourceDiv.innerHTML = '';
        targetDiv.innerHTML = `<p class="error-message">${t.errorPrefix}: ${errorMessage || t.errorDefault}</p>`;
    } finally {
        translateButton.disabled = false;
        translateButton.textContent = t.translateButton;
    }
}

async function translateText(sourceHtml: string) {
    const t = translations[currentLanguage];
    const targetDiv = document.getElementById('target-text') as HTMLDivElement;
    const translateButton = document.getElementById('translate-button') as HTMLButtonElement;
    const favoriteResultBtn = document.getElementById('favorite-result-btn') as HTMLButtonElement;
    const targetSpeakBtn = document.getElementById('target-speak-btn') as HTMLButtonElement;
    const printBtn = document.getElementById('print-btn') as HTMLButtonElement;

    if (!targetDiv || !translateButton) return;

    // Show loading state
    targetDiv.innerHTML = `<div class="spinner-small"></div>`;
    translateButton.disabled = true;
    translateButton.textContent = t.translatingText;
    favoriteResultBtn.hidden = true;
    printBtn.hidden = true;
    targetSpeakBtn.hidden = true;

    try {
        const sourceLangName = t[translatorSourceLang === 'es' ? 'spanish' : 'georgian'];
        const targetLangName = t[translatorTargetLang === 'es' ? 'spanish' : 'georgian'];
        let prompt = `Translate the following text from ${sourceLangName} to ${targetLangName}. Preserve the original HTML formatting (like <b>, <i>, <ul>, <li>). Only translate the text content. Text to translate: \n\n${sourceHtml}`;
        if (simplifyTranslation) {
            prompt += `\n\nIMPORTANT: Translate the text into simple, easy-to-understand language, suitable for a beginner learning the target language.`;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const translatedText = response.text;
        targetDiv.innerHTML = translatedText;
        
        // Save to history and update state
        lastTranslationItem = addTranslationToHistory({
            sourceLang: translatorSourceLang,
            targetLang: translatorTargetLang,
            sourceText: sourceHtml,
            translatedText: translatedText,
        });

        // Update UI
        const isFav = isFavoriteTranslation(lastTranslationItem);
        favoriteResultBtn.hidden = false;
        favoriteResultBtn.classList.toggle('favorited', isFav);
        favoriteResultBtn.title = isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd;
        
        targetSpeakBtn.hidden = translatorTargetLang !== 'es';
        printBtn.hidden = false;
        
        requestWakeLock();

    } catch (error) {
        console.error("Translation error:", error);
        const errorMessage = (error instanceof Error && error.message) ? error.message : JSON.stringify(error);
        targetDiv.innerHTML = `<p class="error-message">${t.errorPrefix}: ${errorMessage || t.errorDefault}</p>`;
    } finally {
        translateButton.disabled = false;
        translateButton.textContent = t.translateButton;
    }
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

function setView(view: View) {
    // Stop any media playback when changing views
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    if (recognition) {
        recognition.stop();
    }
    releaseWakeLock();

    currentView = view;
    window.scrollTo(0, 0);

    const navButtons = [
        navConjugatorBtn, navDictionaryBtn, navTranslatorBtn, navPracticeBtn,
        bottomNavConjugatorBtn, bottomNavDictionaryBtn, bottomNavTranslatorBtn
    ];

    navButtons.forEach(btn => {
        if (btn) {
            btn.classList.remove('active');
            const btnView = btn.id.includes('conjugator') ? 'conjugator' :
                            btn.id.includes('dictionary') ? 'dictionary' :
                            btn.id.includes('translator') ? 'translator' :
                            'practice';
            if (btnView === view) {
                btn.classList.add('active');
            }
        }
    });

    // Reset search term when leaving a view
    lastSearchedTerm = null;
    input.value = '';

    renderApp();
}

function updateUIForLanguage() {
    const t = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.title = t.pageTitle;

    // Logos and flags
    const mobileLangImg = document.querySelector('#mobile-lang-btn img');
    if (mobileLangImg) {
        (mobileLangImg as HTMLImageElement).src = FLAG_URLS[currentLanguage];
        (mobileLangImg as HTMLImageElement).alt = currentLanguage === 'es' ? 'Español' : 'ქართული';
    }


    // Main navigation
    navConjugatorBtn.textContent = t.conjugatorTab;
    navDictionaryBtn.textContent = t.dictionaryTab;
    navTranslatorBtn.textContent = t.translatorTab;
    navPracticeBtn.textContent = t.practiceTab;

    // Bottom navigation
    bottomNavConjugatorBtn.querySelector('span')!.textContent = t.conjugatorTab;
    bottomNavDictionaryBtn.querySelector('span')!.textContent = t.dictionaryTab;
    bottomNavTranslatorBtn.querySelector('span')!.textContent = t.translatorTab;

    // Set header, placeholder, and button text based on the current view
    const headerTitle = document.getElementById('header-title') as HTMLElement;
    if (currentView === 'conjugator') {
        headerTitle.textContent = t.headerTitle;
        input.placeholder = t.inputPlaceholder;
        button.textContent = t.submitButton;
    } else if (currentView === 'dictionary') {
        headerTitle.textContent = t.dictionaryHeaderTitle;
        input.placeholder = t.dictionaryInputPlaceholder;
        button.textContent = t.dictionarySubmitButton;
    } else if (currentView === 'translator') {
        headerTitle.textContent = t.translatorHeaderTitle;
    } else if (currentView === 'practice') {
        headerTitle.textContent = t.practiceHeaderTitle;
    } else if (currentView === 'history') {
        headerTitle.textContent = t.historyHeaderTitle;
    } else if (currentView === 'favorites') {
        headerTitle.textContent = t.favoritesHeaderTitle;
    } else if (currentView === 'about') {
        headerTitle.textContent = t.aboutHeaderTitle;
    }

    // Modal close button
    modalCloseBtn.textContent = t.closeAriaLabel;
    
    // Footer
    const footerAboutLink = document.querySelector('.footer-about-link');
    const footerMaterialsP = document.querySelector('.footer-materials');
    const footerPracticeLink = document.querySelector('.footer-practice-link');
    if (footerAboutLink) footerAboutLink.textContent = t.footerAbout;
    if (footerMaterialsP) footerMaterialsP.innerHTML = t.footerMaterials;
    if (footerPracticeLink) footerPracticeLink.textContent = t.practiceTab;
    
    // Re-render the current view to apply language changes immediately
    renderApp();
}

function renderApp() {
    if (currentView === 'conjugator') {
        renderConjugatorInitialView();
    } else if (currentView === 'dictionary') {
        renderDictionaryInitialView();
    } else if (currentView === 'translator') {
        renderTranslatorInitialView();
    } else if (currentView === 'practice') {
        renderPracticeView();
    } else if (currentView === 'history') {
        renderHistoryView();
    } else if (currentView === 'favorites') {
        renderFavoritesView();
    } else if (currentView === 'about') {
        renderAboutView();
    }
}

function renderAboutView() {
    const t = translations[currentLanguage];
    form.hidden = true;
    resultsContainer.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'history-container'; // Reuse class for styling consistency

    container.innerHTML = `
        <div class="history-header">
            <button id="back-btn" class="back-btn" title="${t.back}">←</button>
            <h2>${t.aboutHeaderTitle}</h2>
            <div style="width: 40px;"></div>
        </div>
        <div class="about-content">
            ${t.aboutContent}
        </div>
    `;
    resultsContainer.appendChild(container);

    container.querySelector('#back-btn')?.addEventListener('click', () => setView('translator'));
}


function renderTranslatorInitialView() {
    const t = translations[currentLanguage];

    const favoritePhrases = getFavoriteTranslations()
        .filter(fav => fav.sourceLang === translatorSourceLang)
        .slice(0, 5);

    let phrasesHTML = '';
    if (favoritePhrases.length > 0) {
        const tempDiv = document.createElement('div');
        const phraseButtons = favoritePhrases.map(fav => {
            tempDiv.innerHTML = fav.sourceText;
            const plainText = tempDiv.innerText.trim();
            const buttonText = plainText.length > 50 ? plainText.substring(0, 47) + '...' : plainText;
            return `<button class="phrase-example-btn" data-phrase="${escapeHtml(fav.sourceText)}" title="${escapeHtml(plainText)}">${escapeHtml(buttonText)}</button>`;
        }).join('');

        phrasesHTML = `
            <div id="phrase-examples-container">
                <h3 class="phrase-examples-title">${t.commonPhrasesTitle}</h3>
                <div class="phrase-examples-grid">
                    ${phraseButtons}
                </div>
            </div>
        `;
    }

    const sourceLangName = t[translatorSourceLang === 'es' ? 'spanish' : 'georgian'];
    const targetLangName = t[translatorTargetLang === 'es' ? 'spanish' : 'georgian'];
    const sourceLangCode = translatorSourceLang.toUpperCase();
    const targetLangCode = translatorTargetLang.toUpperCase();
    const placeholderText = translations[translatorSourceLang].sourceTextPlaceholder;

    const editorHTML = `
        <div class="editor-container">
            <div class="editor-toolbar">
                <button type="button" class="toolbar-btn" data-command="bold" title="Bold (Ctrl+B)"><b>B</b></button>
                <button type="button" class="toolbar-btn" data-command="italic" title="Italic (Ctrl+I)"><i>I</i></button>
                <button type="button" class="toolbar-btn" data-command="insertUnorderedList" title="Bullet List">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z"></path></svg>
                </button>
                <button type="button" class="toolbar-btn" data-command="insertOrderedList" title="Numbered List">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 11.1V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></svg>
                </button>
                <div class="toolbar-separator"></div>
                <button type="button" id="paste-btn" class="toolbar-btn" title="${t.paste}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></svg>
                </button>
                 <button type="button" id="mic-btn" class="toolbar-btn" title="${t.speak}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"></path></svg>
                </button>
                <button type="button" id="image-btn" class="toolbar-btn" title="${t.image}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>
                </button>
                <button type="button" id="doc-btn" class="toolbar-btn" title="${t.uploadDocument}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></svg>
                </button>
            </div>
            <div id="source-text" class="translator-input-area" contenteditable="true" spellcheck="true" placeholder="${placeholderText}"></div>
        </div>
    `;

    const simplifyOptionHTML = `
        <div class="translator-options">
            <label for="simplify-toggle" class="simplify-label-wrapper">
                <div class="switch">
                    <input type="checkbox" id="simplify-toggle">
                    <span class="slider round"></span>
                </div>
                <span id="simplify-label-text">${t.simplifyLabel}</span>
            </label>
        </div>
    `;

    form.hidden = true;
    resultsContainer.innerHTML = `
        <div id="translator-container">
            <div id="translator-actions">
                 <button id="swap-lang-btn" class="shortcut-btn-circle" aria-label="Swap languages" title="Swap languages">⇄</button>
                 <div class="header-shortcuts">
                    <button id="history-shortcut-btn" class="shortcut-btn-circle" aria-label="${t.history}" title="${t.history}">◷</button>
                    <button id="favorites-shortcut-btn" class="shortcut-btn-circle" aria-label="${t.favorites}" title="${t.favorites}">★</button>
                 </div>
            </div>
            
            <form id="translator-form">
                 <div class="translator-io-grid">
                    <div class="translator-box">
                         <div class="textarea-wrapper">
                            ${editorHTML}
                            <div class="translator-box-footer">
                               <div class="translator-box-footer-start">
                                   <button type="button" id="source-speak-btn" class="translator-action-btn" title="${t.speak}" hidden>
                                       <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                                   </button>
                                   <button id="clear-text-btn" class="translator-action-btn" title="${t.clearText}" hidden>&times;</button>
                               </div>
                               <button class="lang-btn-inline" id="source-lang-btn" title="${sourceLangName}">${sourceLangCode}</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="main-translate-btn-container">
                        ${simplifyOptionHTML}
                        <button type="submit" id="translate-button">${t.translateButton}</button>
                    </div>

                    <div class="translator-box">
                        <div class="textarea-wrapper">
                            <div id="target-text" class="translator-output-area"></div>
                            <div class="translator-box-footer">
                                <div class="translator-box-footer-start">
                                    <button type="button" id="target-speak-btn" class="translator-action-btn" title="${t.speak}" hidden>
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                                    </button>
                                    <button type="button" id="copy-btn" class="translator-action-btn" title="${t.copy}">📄</button>
                                    <button type="button" id="print-btn" class="translator-action-btn" title="${t.print}" hidden>
                                        ${PRINTER_ICON_SVG}
                                    </button>
                                    <button type="button" id="favorite-result-btn" class="translator-action-btn favorite-toggle-btn" title="${t.favoriteAriaLabelAdd}" hidden>★</button>
                                </div>
                                <button class="lang-btn-inline" id="target-lang-btn" title="${targetLangName}">${targetLangCode}</button>
                            </div>
                        </div>
                    </div>
                 </div>
            </form>
            
            ${phrasesHTML}
        </div>
    `;

    const translatorForm = document.getElementById('translator-form') as HTMLFormElement;
    const sourceDiv = document.getElementById('source-text') as HTMLDivElement;
    const targetDiv = document.getElementById('target-text') as HTMLDivElement;
    const clearBtn = document.getElementById('clear-text-btn') as HTMLButtonElement;
    const favoriteResultBtn = document.getElementById('favorite-result-btn') as HTMLButtonElement;
    const sourceSpeakBtn = document.getElementById('source-speak-btn') as HTMLButtonElement;
    const targetSpeakBtn = document.getElementById('target-speak-btn') as HTMLButtonElement;
    const printBtn = document.getElementById('print-btn') as HTMLButtonElement;
    const simplifyToggle = document.getElementById('simplify-toggle') as HTMLInputElement;

    if (simplifyToggle) {
        simplifyToggle.checked = simplifyTranslation;
        simplifyToggle.addEventListener('change', () => {
            simplifyTranslation = simplifyToggle.checked;
        });
    }

    translatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const html = sourceDiv.innerHTML.trim();
        if (html && sourceDiv.textContent?.trim()) {
            translateText(html);
        }
    });

    sourceDiv.addEventListener('input', () => {
        const hasText = !!sourceDiv.textContent;
        clearBtn.hidden = !hasText;
        sourceSpeakBtn.hidden = !hasText || translatorSourceLang !== 'es';
        // Hide result buttons when user starts typing new text
        favoriteResultBtn.hidden = true;
        printBtn.hidden = true;
        lastTranslationItem = null;
        releaseWakeLock();
    });

    clearBtn.addEventListener('click', () => {
        sourceDiv.innerHTML = '';
        targetDiv.innerHTML = '';
        clearBtn.hidden = true;
        favoriteResultBtn.hidden = true;
        sourceSpeakBtn.hidden = true;
        targetSpeakBtn.hidden = true;
        printBtn.hidden = true;
        lastTranslationItem = null;
        sourceDiv.focus();
        releaseWakeLock();
    });

    favoriteResultBtn.addEventListener('click', () => {
        if (!lastTranslationItem) return;
        toggleFavoriteTranslation(lastTranslationItem);
        const isNowFav = isFavoriteTranslation(lastTranslationItem);
        favoriteResultBtn.classList.toggle('favorited', isNowFav);
        favoriteResultBtn.title = isNowFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd;
    });

    sourceSpeakBtn.addEventListener('click', () => speakText(sourceDiv.innerText, translatorSourceLang, sourceSpeakBtn));
    targetSpeakBtn.addEventListener('click', () => speakText(targetDiv.innerText, translatorTargetLang, targetSpeakBtn));

    document.querySelector('.editor-toolbar')?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const button = target.closest('.toolbar-btn') as HTMLButtonElement;
        if (button) {
            e.preventDefault();
            const command = button.dataset.command;
            if (command) {
                document.execCommand(command, false);
            }
            sourceDiv.focus();
        }
    });

    document.getElementById('phrase-examples-container')?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.matches('.phrase-example-btn')) {
            const phrase = target.dataset.phrase;
            if (phrase && sourceDiv) {
                sourceDiv.innerHTML = phrase;
                sourceDiv.focus();
                if (clearBtn) clearBtn.hidden = false;
                 if (sourceSpeakBtn) sourceSpeakBtn.hidden = translatorSourceLang !== 'es';
            }
        }
    });

    document.getElementById('swap-lang-btn')?.addEventListener('click', handleSwapLanguages);
    document.getElementById('source-lang-btn')?.addEventListener('click', handleSwapLanguages);
    document.getElementById('target-lang-btn')?.addEventListener('click', handleSwapLanguages);
    document.getElementById('copy-btn')?.addEventListener('click', handleCopy);
    document.getElementById('paste-btn')?.addEventListener('click', handlePaste);
    document.getElementById('mic-btn')?.addEventListener('click', handleMic);
    document.getElementById('image-btn')?.addEventListener('click', () => openModalById('image-options-modal'));
    document.getElementById('doc-btn')?.addEventListener('click', () => documentUploadInput?.click());
    document.getElementById('history-shortcut-btn')?.addEventListener('click', () => setView('history'));
    document.getElementById('favorites-shortcut-btn')?.addEventListener('click', () => setView('favorites'));
    document.getElementById('print-btn')?.addEventListener('click', handleTranslatorPrint);
}

function renderFavoritesView() {
    const t = translations[currentLanguage];
    form.hidden = true;
    resultsContainer.innerHTML = '';

    const favorites = getFavoriteTranslations();

    const container = document.createElement('div');
    container.className = 'history-container';

    container.innerHTML = `
        <div class="history-header">
            <button id="back-btn" class="back-btn" title="${t.back}">←</button>
            <h2>${t.favoritesHeaderTitle}</h2>
            <div style="width: 40px;"></div>
        </div>
    `;

    if (favorites.length === 0) {
        const emptyEl = document.createElement('p');
        emptyEl.className = 'empty-section-text';
        emptyEl.textContent = t.favoritesEmptyTranslator;
        container.appendChild(emptyEl);
    } else {
        const listEl = document.createElement('div');
        listEl.className = 'history-list';
        favorites.forEach(item => {
            const itemEl = document.createElement('article');
            itemEl.className = 'history-item';
            const isFav = isFavoriteTranslation(item);

            const sourceTempDiv = document.createElement('div');
            sourceTempDiv.innerHTML = item.sourceText;
            const plainSourceText = sourceTempDiv.innerText;

            const targetTempDiv = document.createElement('div');
            targetTempDiv.innerHTML = item.translatedText;
            const plainTargetText = targetTempDiv.innerText;

            const sourceSpeakBtn = item.sourceLang === 'es' ? `<button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${escapeHtml(plainSourceText)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>` : '';
            const targetSpeakBtn = item.targetLang === 'es' ? `<button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${escapeHtml(plainTargetText)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>` : '';
            const expandIcon = `<button class="expand-indicator" title="Expand">▾</button>`;

            itemEl.innerHTML = `
                <div class="history-item-content">
                    <div class="history-text-block source-block">
                        <div class="history-text-block-header">
                            <h4>${t.sourceText}</h4>
                            <div class="history-item-controls">${sourceSpeakBtn}</div>
                        </div>
                        <div class="history-item-html-content">${item.sourceText}</div>
                    </div>
                    <div class="history-text-block">
                        <div class="history-text-block-header">
                            <h4>${t.translatedText}</h4>
                            <div class="history-item-controls">
                                ${targetSpeakBtn}
                                <button class="favorite-toggle-btn ${isFav ? 'favorited' : ''}" title="${isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd}">★</button>
                                <button class="history-copy-btn" title="${t.copy}" data-text="${escapeHtml(plainTargetText)}">📄</button>
                                ${expandIcon}
                            </div>
                        </div>
                        <div class="history-item-html-content translated-block">${item.translatedText}</div>
                    </div>
                </div>
            `;
            listEl.appendChild(itemEl);
            
            itemEl.addEventListener('click', (e) => {
                if ((e.target as HTMLElement).closest('.history-item-controls button')) {
                    return;
                }
                itemEl.classList.toggle('is-expanded');
            });

            const favoriteBtn = itemEl.querySelector('.favorite-toggle-btn') as HTMLButtonElement;
            favoriteBtn.addEventListener('click', () => {
                toggleFavoriteTranslation(item);
                itemEl.remove();
                if (listEl.children.length === 0) {
                     const emptyEl = document.createElement('p');
                    emptyEl.className = 'empty-section-text';
                    emptyEl.textContent = t.favoritesEmptyTranslator;
                    container.appendChild(emptyEl);
                }
            });

            const copyBtn = itemEl.querySelector('.history-copy-btn') as HTMLButtonElement;
            copyBtn.addEventListener('click', () => {
                const textToCopy = copyBtn.dataset.text;
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalHTML = copyBtn.innerHTML;
                        copyBtn.innerHTML = '✅';
                        setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
                    });
                }
            });
        });
        container.appendChild(listEl);
    }
    resultsContainer.appendChild(container);

    container.querySelector('#back-btn')?.addEventListener('click', () => setView('translator'));
}


function renderHistoryView() {
    const t = translations[currentLanguage];
    form.hidden = true;
    resultsContainer.innerHTML = '';

    const history = getTranslationHistory();

    const container = document.createElement('div');
    container.className = 'history-container';

    container.innerHTML = `
        <div class="history-header">
            <button id="back-btn" class="back-btn" title="${t.back}">←</button>
            <h2>${t.historyHeaderTitle}</h2>
            <button id="clear-history-btn" class="clear-history-btn">${t.clearHistory}</button>
        </div>
    `;

    if (history.length === 0) {
        const emptyEl = document.createElement('p');
        emptyEl.className = 'empty-section-text';
        emptyEl.textContent = t.historyEmpty;
        container.appendChild(emptyEl);
    } else {
        const listEl = document.createElement('div');
        listEl.className = 'history-list';
        history.forEach(item => {
            const itemEl = document.createElement('article');
            itemEl.className = 'history-item';
            const isFav = isFavoriteTranslation(item);

            const sourceTempDiv = document.createElement('div');
            sourceTempDiv.innerHTML = item.sourceText;
            const plainSourceText = sourceTempDiv.innerText;

            const targetTempDiv = document.createElement('div');
            targetTempDiv.innerHTML = item.translatedText;
            const plainTargetText = targetTempDiv.innerText;
            
            const sourceSpeakBtn = item.sourceLang === 'es' ? `<button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${escapeHtml(plainSourceText)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>` : '';
            const targetSpeakBtn = item.targetLang === 'es' ? `<button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${escapeHtml(plainTargetText)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>` : '';
            const expandIcon = `<button class="expand-indicator" title="Expand">▾</button>`;

            itemEl.innerHTML = `
                <div class="history-item-content">
                    <div class="history-text-block source-block">
                        <div class="history-text-block-header">
                             <h4>${t.sourceText}</h4>
                             <div class="history-item-controls">${sourceSpeakBtn}</div>
                        </div>
                        <div class="history-item-html-content">${item.sourceText}</div>
                    </div>
                    <div class="history-text-block">
                        <div class="history-text-block-header">
                            <h4>${t.translatedText}</h4>
                            <div class="history-item-controls">
                                ${targetSpeakBtn}
                                <button class="favorite-toggle-btn ${isFav ? 'favorited' : ''}" title="${isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd}">★</button>
                                <button class="history-copy-btn" title="${t.copy}" data-text="${escapeHtml(plainTargetText)}">📄</button>
                                ${expandIcon}
                            </div>
                        </div>
                        <div class="history-item-html-content translated-block">${item.translatedText}</div>
                    </div>
                </div>
            `;
            listEl.appendChild(itemEl);
            
            itemEl.addEventListener('click', (e) => {
                if ((e.target as HTMLElement).closest('.history-item-controls button')) {
                    return;
                }
                itemEl.classList.toggle('is-expanded');
            });

            const favoriteBtn = itemEl.querySelector('.favorite-toggle-btn') as HTMLButtonElement;
            favoriteBtn.addEventListener('click', () => {
                toggleFavoriteTranslation(item);
                const isNowFav = isFavoriteTranslation(item);
                favoriteBtn.classList.toggle('favorited', isNowFav);
                favoriteBtn.title = isNowFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd;
            });

            const copyBtn = itemEl.querySelector('.history-copy-btn') as HTMLButtonElement;
            copyBtn.addEventListener('click', () => {
                const textToCopy = copyBtn.dataset.text;
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalHTML = copyBtn.innerHTML;
                        copyBtn.innerHTML = '✅';
                        setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
                    });
                }
            });
        });
        container.appendChild(listEl);
    }
    resultsContainer.appendChild(container);
    
    const clearBtn = container.querySelector('#clear-history-btn');
    if (clearBtn) {
        if (history.length === 0) (clearBtn as HTMLElement).hidden = true;
        clearBtn.addEventListener('click', clearTranslationHistory);
    }
    
    container.querySelector('#back-btn')?.addEventListener('click', () => setView('translator'));
}

function renderPracticeView() {
    const t = translations[currentLanguage];
    form.hidden = true;
    resultsContainer.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'practice-container';
    resultsContainer.appendChild(container);

    if (currentPracticeSession && !currentPracticeSession.isComplete) {
        renderCurrentPracticeQuestion(container);
    } else if (currentPracticeSession && currentPracticeSession.isComplete) {
        renderPracticeSessionResults(container);
    } else {
        renderPracticeIntro(container);
    }
}

function renderPracticeIntro(container: HTMLElement) {
    const t = translations[currentLanguage];
    const history = getPracticeHistory();

    let historyHtml = '';
    if (history.length > 0) {
        historyHtml = `
            <div class="practice-history">
                <h3>${t.history}</h3>
                <ul class="practice-history-list">
                    ${history.map(item => `
                        <li class="practice-history-item">
                            <span>${new Date(item.timestamp).toLocaleString(currentLanguage, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                            <span>${t.yourScore.replace('{score}', String(item.score)).replace('{total}', String(item.total))}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    } else {
        historyHtml = `<p class="empty-section-text">${t.practiceEmpty}</p>`;
    }

    container.innerHTML = `
        <div class="practice-intro">
            <h2>${t.practiceHeaderTitle}</h2>
            <p>${t.practiceIntro}</p>
            <button id="start-practice-btn" class="main-action-btn">${t.startPracticeSession}</button>
        </div>
        ${historyHtml}
    `;

    document.getElementById('start-practice-btn')?.addEventListener('click', () => startPracticeSession());
}

async function startPracticeSession(adaptedPrompt?: string) {
    const t = translations[currentLanguage];
    const container = document.querySelector('.practice-container') as HTMLElement;
    if (!container) return;

    container.innerHTML = `<div class="loading-container"><div class="spinner"></div><p>${t.loadingPracticeSession}</p></div>`;

    try {
        const history = getPracticeHistory();
        const lastSessionMistakes = history.length > 0 ? history[0].mistakes : [];
        const recentFavoriteVerbs = getFavoriteVerbs().slice(0, 5);
        const recentFavoriteWords = getFavoriteWords().slice(0, 5);

        let prompt = `Eres un profesor de español. Crea una sesión de práctica de 10 preguntas para un estudiante. El idioma de la interfaz del estudiante es '${currentLanguage === 'ka' ? 'Georgian' : 'Spanish'}', así que las explicaciones deben estar en ese idioma.
        
        Las preguntas deben ser una mezcla de los siguientes tipos:
        - 'FILL_IN_THE_BLANK_VERB': Conjugar un verbo en un tiempo específico.
        - 'MULTIPLE_CHOICE_TRANSLATION': Traducir una palabra o frase corta de español a georgiano o viceversa.
        - 'MULTIPLE_CHOICE_VOCAB': Elegir la palabra correcta para completar una oración.

        Considera estos temas para generar las preguntas:
        - Verbos de uso común: ${MOST_COMMON_VERBS.join(', ')}.
        - Vocabulario básico: ${MOST_COMMON_WORDS.join(', ')}.
        - Verbos y palabras favoritas del usuario (si hay): ${[...recentFavoriteVerbs, ...recentFavoriteWords].join(', ')}.
        `;

        if (adaptedPrompt) {
            prompt += `\n**Instrucción Adicional:** ${adaptedPrompt}`;
        } else if (lastSessionMistakes.length > 0) {
            prompt += `\nEl estudiante cometió estos errores en la última sesión. Crea algunas preguntas que refuercen estos conceptos:\n${lastSessionMistakes.map(m => `- Pregunta: ${JSON.stringify(m.question)}, Respuesta incorrecta: ${m.userAnswer}`).join('\n')}`;
        }
        
        prompt += "\nDevuelve un array JSON de 10 objetos de pregunta, siguiendo el esquema proporcionado. Asegúrate de que las opciones y la respuesta correcta para MULTIPLE_CHOICE_TRANSLATION estén en el idioma correcto (si la pregunta es en español, las opciones son en georgiano, y viceversa)."

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: practiceSessionSchema,
            }
        });

        const questions = JSON.parse(response.text);

        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("No se pudieron generar las preguntas.");
        }

        currentPracticeSession = {
            questions: questions,
            userAnswers: Array(questions.length).fill(null),
            currentQuestionIndex: 0,
            isComplete: false
        };

        renderPracticeView();

    } catch (error) {
        console.error("Error starting practice session:", error);
        const errorMessage = (error instanceof Error && error.message) ? error.message : JSON.stringify(error);
        container.innerHTML = `<p class="error-message">${t.errorPrefix}: ${errorMessage || t.errorDefault}</p><button onclick="setView('practice')" class="main-action-btn">${t.back}</button>`;
    }
}


function renderCurrentPracticeQuestion(container: HTMLElement) {
    if (!currentPracticeSession) return;
    const t = translations[currentLanguage];
    const question = currentPracticeSession.questions[currentPracticeSession.currentQuestionIndex];
    const questionNum = currentPracticeSession.currentQuestionIndex + 1;
    const total = currentPracticeSession.questions.length;

    let questionBodyHtml = '';
    if (question.type === 'FILL_IN_THE_BLANK_VERB' && question.sentence_template) {
        questionBodyHtml = `
            <p class="practice-question-text">${question.sentence_template.replace('___', '<input type="text" id="practice-answer-input" class="practice-input" autocapitalize="off" autocomplete="off" spellcheck="false" />')}</p>
            <p class="practice-question-hint">${question.tense_hint}</p>
        `;
    } else if (question.type.startsWith('MULTIPLE_CHOICE') && question.question_text && question.options) {
        questionBodyHtml = `
            <p class="practice-question-text">${question.question_text}</p>
            <div class="practice-options">
                ${question.options.map(option => `
                    <button class="practice-option-btn" data-answer="${escapeHtml(option)}">${option}</button>
                `).join('')}
            </div>
        `;
    }

    container.innerHTML = `
        <div id="practice-question-card">
            <div class="practice-header">
                <h3>${t.questionOf.replace('{current}', String(questionNum)).replace('{total}', String(total))}</h3>
                <progress max="${total}" value="${questionNum}"></progress>
            </div>
            <div class="practice-body">
                ${questionBodyHtml}
            </div>
            <div id="practice-feedback" class="practice-feedback"></div>
            <div class="practice-footer">
                <button id="check-answer-btn" class="main-action-btn">${t.checkAnswer}</button>
            </div>
        </div>
    `;

    if (question.type === 'FILL_IN_THE_BLANK_VERB') {
        document.getElementById('check-answer-btn')?.addEventListener('click', handleCheckAnswer);
        document.getElementById('practice-answer-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleCheckAnswer();
        });
        (document.getElementById('practice-answer-input') as HTMLInputElement)?.focus();
    } else {
        document.querySelectorAll('.practice-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.practice-option-btn.selected')?.classList.remove('selected');
                (e.currentTarget as HTMLElement).classList.add('selected');
            });
        });
        document.getElementById('check-answer-btn')?.addEventListener('click', handleCheckAnswer);
    }
}

function handleCheckAnswer() {
    if (!currentPracticeSession) return;
    const t = translations[currentLanguage];
    const session = currentPracticeSession;
    const question = session.questions[session.currentQuestionIndex];
    let userAnswer: string | null = null;

    if (question.type === 'FILL_IN_THE_BLANK_VERB') {
        userAnswer = (document.getElementById('practice-answer-input') as HTMLInputElement).value.trim();
    } else {
        const selectedOption = document.querySelector('.practice-option-btn.selected') as HTMLButtonElement;
        if (selectedOption) {
            userAnswer = selectedOption.dataset.answer || null;
        }
    }

    if (!userAnswer) return;

    session.userAnswers[session.currentQuestionIndex] = userAnswer;
    const isCorrect = userAnswer.toLowerCase() === question.correct_answer.toLowerCase();

    const feedbackEl = document.getElementById('practice-feedback');
    if (!feedbackEl) return;

    if (isCorrect) {
        feedbackEl.innerHTML = `<p class="correct">${t.correct}</p><p>${question.explanation}</p>`;
        feedbackEl.classList.add('correct');
    } else {
        feedbackEl.innerHTML = `<p class="incorrect">${t.incorrect}</p><p>${t.correctAnswerIs} <strong>${question.correct_answer}</strong></p><p>${question.explanation}</p>`;
        feedbackEl.classList.add('incorrect');
    }

    const checkBtn = document.getElementById('check-answer-btn') as HTMLButtonElement;
    checkBtn.textContent = t.nextQuestion;
    checkBtn.onclick = () => {
        session.currentQuestionIndex++;
        if (session.currentQuestionIndex >= session.questions.length) {
            session.isComplete = true;
            // Save results
            const score = session.userAnswers.filter((ans, i) => ans?.toLowerCase() === session.questions[i].correct_answer.toLowerCase()).length;
            const mistakes = [];
            for(let i=0; i < session.questions.length; i++){
                if(session.userAnswers[i]?.toLowerCase() !== session.questions[i].correct_answer.toLowerCase()){
                    mistakes.push({question: session.questions[i], userAnswer: session.userAnswers[i]! });
                }
            }
            addPracticeResultToHistory({
                timestamp: Date.now(),
                score: score,
                total: session.questions.length,
                mistakes: mistakes
            });
        }
        renderPracticeView();
    };
}

function renderPracticeSessionResults(container: HTMLElement) {
    if (!currentPracticeSession) return;
    const t = translations[currentLanguage];
    const session = currentPracticeSession;
    const score = session.userAnswers.filter((ans, i) => ans?.toLowerCase() === session.questions[i].correct_answer.toLowerCase()).length;
    const total = session.questions.length;
    const mistakes = session.questions.map((q, i) => ({ q, ans: session.userAnswers[i] })).filter(item => item.ans?.toLowerCase() !== item.q.correct_answer.toLowerCase());

    let mistakesHtml = `<p>${t.noMistakes}</p>`;
    if (mistakes.length > 0) {
        mistakesHtml = `
            <h4>${t.reviewYourMistakes}</h4>
            <ul class="mistakes-list">
                ${mistakes.map(m => `
                    <li>
                        <p class="mistake-q">${m.q.sentence_template?.replace('___', `(${m.q.verb_infinitive})`) || m.q.question_text}</p>
                        <p><strong>Your answer:</strong> <span class="incorrect-text">${m.ans}</span></p>
                        <p><strong>Correct answer:</strong> <span class="correct-text">${m.q.correct_answer}</span></p>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    container.innerHTML = `
        <div class="practice-results">
            <h2>${t.sessionComplete}</h2>
            <div class="score-card">
                <p>${t.yourScore.replace('{score}', String(score)).replace('{total}', String(total))}</p>
                <div class="score-visual">${score} / ${total}</div>
            </div>

            <div class="results-analysis">
                <h3>${t.performanceAnalysis}</h3>
                <div id="analysis-content">
                    <div class="loading-container"><div class="spinner"></div><p>${t.loadingAnalysis}</p></div>
                </div>
            </div>
            
            <div class="mistakes-review">
                ${mistakesHtml}
            </div>
            
             <button id="restart-practice-btn" class="main-action-btn">${t.startPracticeSession}</button>
        </div>
    `;
    
    document.getElementById('restart-practice-btn')?.addEventListener('click', () => {
        currentPracticeSession = null;
        renderPracticeView();
    });
    
    analyzePerformanceAndSuggestSession();
}

async function analyzePerformanceAndSuggestSession() {
    if (!currentPracticeSession) return;
    const t = translations[currentLanguage];
    const analysisContainer = document.getElementById('analysis-content');
    if (!analysisContainer) return;
    
    const mistakes = currentPracticeSession.questions
        .map((q, i) => ({ q, ans: currentPracticeSession.userAnswers[i] }))
        .filter(item => item.ans?.toLowerCase() !== item.q.correct_answer.toLowerCase());
        
    if(mistakes.length === 0){
        analysisContainer.innerHTML = `<p>${t.noMistakes}</p>`;
        return;
    }

    try {
        const mistakesString = mistakes.map(m => `Question: ${m.q.sentence_template || m.q.question_text}, Correct: ${m.q.correct_answer}, User's incorrect answer: ${m.ans}`).join('; ');
        
        const prompt = `Un estudiante de español acaba de completar una sesión de práctica y cometió los siguientes errores: ${mistakesString}. 
        Analiza estos errores y proporciona:
        1. Un resumen muy breve (1-2 frases) de las áreas principales en las que el estudiante necesita mejorar.
        2. Una sugerencia para una nueva sesión de práctica adaptada. Esta sugerencia debe ser una instrucción de una frase para mí (la IA) para generar la próxima sesión. Por ejemplo: "Crea una sesión de práctica centrada en la conjugación del Pretérito Imperfecto y el vocabulario relacionado con la comida."
        
        Responde en formato JSON con dos claves: "analysis_summary" y "adapted_prompt_suggestion". El texto debe estar en el idioma de la interfaz del usuario, que es '${currentLanguage === 'ka' ? 'Georgian' : 'Spanish'}'.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const analysis = JSON.parse(response.text);

        analysisContainer.innerHTML = `
            <p>${analysis.analysis_summary}</p>
            <button id="start-adapted-session-btn" class="main-action-btn">${t.startNewAdaptedSession}</button>
        `;

        document.getElementById('start-adapted-session-btn')?.addEventListener('click', () => {
            currentPracticeSession = null; // Reset session
            startPracticeSession(analysis.adapted_prompt_suggestion);
        });

    } catch (error) {
        console.error("Error analyzing performance:", error);
        analysisContainer.innerHTML = `<p>No se pudo analizar el rendimiento.</p>`;
    }
}


function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function handleSwapLanguages() {
    releaseWakeLock();
    // Preserve current text
    const sourceDiv = document.getElementById('source-text') as HTMLDivElement;
    const targetDiv = document.getElementById('target-text') as HTMLDivElement;
    const sourceHTML = sourceDiv.innerHTML;
    const targetHTML = targetDiv.innerHTML;

    // Swap language state
    [translatorSourceLang, translatorTargetLang] = [translatorTargetLang, translatorSourceLang];
    
    // Re-render the entire translator view to update all labels and placeholders correctly
    renderTranslatorInitialView();

    // Restore text into the new (swapped) divs
    const newSourceDiv = document.getElementById('source-text') as HTMLDivElement;
    const newTargetDiv = document.getElementById('target-text') as HTMLDivElement;
    if (newSourceDiv) newSourceDiv.innerHTML = targetHTML;
    if (newTargetDiv) newTargetDiv.innerHTML = sourceHTML;

    // Trigger UI updates for the restored text
    const clearBtn = document.getElementById('clear-text-btn') as HTMLButtonElement;
    const sourceSpeakBtn = document.getElementById('source-speak-btn') as HTMLButtonElement;
    const targetSpeakBtn = document.getElementById('target-speak-btn') as HTMLButtonElement;
    const printBtn = document.getElementById('print-btn') as HTMLButtonElement;
    
    if (newSourceDiv) {
        const hasText = !!newSourceDiv.textContent;
        if(clearBtn) clearBtn.hidden = !hasText;
        if(sourceSpeakBtn) sourceSpeakBtn.hidden = !hasText || translatorSourceLang !== 'es';
    }
    if (newTargetDiv) {
        const hasTargetText = !!newTargetDiv.textContent;
        if(targetSpeakBtn) targetSpeakBtn.hidden = !hasTargetText || translatorTargetLang !== 'es';
        if(printBtn) printBtn.hidden = !hasTargetText;
    }
}

async function handleCopy() {
    const targetDiv = document.getElementById('target-text') as HTMLDivElement;
    const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
    const t = translations[currentLanguage];
    if (targetDiv && copyBtn && targetDiv.innerHTML) {
        try {
            const htmlBlob = new Blob([targetDiv.innerHTML], { type: 'text/html' });
            const textBlob = new Blob([targetDiv.innerText], { type: 'text/plain' });
            const data = [new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })];
            await navigator.clipboard.write(data);
            
            const originalText = copyBtn.title;
            copyBtn.textContent = '✅';
            copyBtn.title = t.copied;
            setTimeout(() => {
                copyBtn.textContent = '📄';
                copyBtn.title = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy rich text: ', err);
            // Fallback to plain text
            try {
                await navigator.clipboard.writeText(targetDiv.innerText);
                const originalText = copyBtn.title;
                copyBtn.textContent = '✅';
                copyBtn.title = t.copied;
                setTimeout(() => {
                    copyBtn.textContent = '📄';
                    copyBtn.title = originalText;
                }, 2000);
            } catch (fallbackErr) {
                 console.error('Failed to copy plain text: ', fallbackErr);
            }
        }
    }
}

async function handlePaste() {
    const sourceDiv = document.getElementById('source-text') as HTMLDivElement;
    const clearBtn = document.getElementById('clear-text-btn') as HTMLButtonElement;
    const sourceSpeakBtn = document.getElementById('source-speak-btn') as HTMLButtonElement;
    if (!sourceDiv) return;

    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            // Using execCommand to support undo/redo and work with contenteditable
            document.execCommand('insertText', false, text);
            sourceDiv.focus();
            const hasText = !!sourceDiv.textContent;
            if (clearBtn) clearBtn.hidden = !hasText;
            if (sourceSpeakBtn) sourceSpeakBtn.hidden = !hasText || translatorSourceLang !== 'es';
        }
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
    }
}


function showAlertModal(title: string, body: string) {
    if (!alertModal || !alertModalTitle || !alertModalBody || !alertModalCloseBtn) return;
    
    alertModalTitle.textContent = title;
    alertModalBody.innerHTML = body; // Use innerHTML to allow simple formatting if needed
    alertModalCloseBtn.textContent = translations[currentLanguage].okButton;

    alertModal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function handleMic() {
    const t = translations[currentLanguage];
    const sourceDiv = document.getElementById('source-text') as HTMLDivElement;
    const micBtn = document.getElementById('mic-btn') as HTMLButtonElement;

    // If recognition is already in progress, don't start a new one.
    if (recognition) {
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = translatorSourceLang === 'es' ? 'es-ES' : 'ka-GE';
    recognition.continuous = false; // It will stop automatically after a pause in speech.
    recognition.interimResults = false; // We only want the final, most accurate result.

    sourceDiv.focus();

    recognition.onstart = () => {
        micBtn.classList.add('mic-listening');
        if (!sourceDiv.textContent) {
            sourceDiv.setAttribute('data-original-placeholder', sourceDiv.getAttribute('placeholder') || '');
            sourceDiv.setAttribute('placeholder', t.speakNow);
        }
    };

    recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        document.execCommand('insertText', false, transcript);
    };

    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
            showAlertModal(t.micPermissionDeniedTitle, t.micPermissionDeniedBody);
        } else {
            if (!sourceDiv.textContent) {
                sourceDiv.setAttribute('placeholder', t.micErrorGeneric);
            }
        }
    };

    recognition.onend = () => {
        recognition = null; // Important: clear the global recognition object
        micBtn.classList.remove('mic-listening');
        const originalPlaceholder = sourceDiv.getAttribute('data-original-placeholder') || translations[translatorSourceLang].sourceTextPlaceholder;
        sourceDiv.setAttribute('placeholder', originalPlaceholder);
        
        const hasText = !!sourceDiv.textContent;
        const clearBtn = document.getElementById('clear-text-btn');
        if (clearBtn) (clearBtn as HTMLButtonElement).hidden = !hasText;
        const speakBtn = document.getElementById('source-speak-btn');
        if (speakBtn) (speakBtn as HTMLButtonElement).hidden = !hasText || translatorSourceLang !== 'es';
    };
    
    recognition.start();
}


async function handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
        const imageDataUrl = reader.result as string;
        openCropperModal(imageDataUrl);
    };

    reader.readAsDataURL(file);
    input.value = ''; // Reset input to allow re-uploading the same file
}

async function handleDocumentUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const sourceDiv = document.getElementById('source-text') as HTMLDivElement;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!sourceDiv) return;

    // Reset input to allow re-uploading the same file
    input.value = '';

    try {
        let text = '';
        if (fileExtension === 'txt') {
            text = await file.text();
        } else if (fileExtension === 'docx') {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
            text = result.value;
        } else if (fileExtension === 'pdf') {
            // This needs to be set before using pdfjsLib
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            const pageTexts = [];
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((s: any) => s.str).join(' ');
                pageTexts.push(pageText);
            }
            text = pageTexts.join('\n\n'); // Use double newline to separate pages
        } else {
            showAlertModal("Unsupported File", "Please upload a .txt, .docx, or .pdf file.");
            return;
        }

        // Populate the source div
        // Using textContent first prevents XSS, then replace newlines for display
        sourceDiv.textContent = text;
        sourceDiv.innerHTML = sourceDiv.innerHTML.replace(/\n/g, '<br>');

        // Trigger UI updates for buttons, but DO NOT translate automatically
        const hasText = !!sourceDiv.textContent;
        const clearBtn = document.getElementById('clear-text-btn');
        if (clearBtn) (clearBtn as HTMLButtonElement).hidden = !hasText;
        const speakBtn = document.getElementById('source-speak-btn');
        if (speakBtn) (speakBtn as HTMLButtonElement).hidden = !hasText || translatorSourceLang !== 'es';
        
        sourceDiv.focus();

    } catch (error) {
        console.error("Error processing document:", error);
        const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
        showAlertModal("Document Error", `Could not process the file. ${errorMessage}`);
    }
}


function openCropperModal(imageUrl: string) {
    const cropperImage = document.getElementById('cropper-image') as HTMLImageElement;
    const t = translations[currentLanguage];

    (document.getElementById('cropper-modal-title') as HTMLElement).textContent = t.cropTitle;
    (document.getElementById('crop-and-translate-btn') as HTMLElement).textContent = t.cropAndTranslate;

    cropperImage.src = imageUrl;
    openModalById('cropper-modal');

    cropperImage.onload = () => {
        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(cropperImage, {
            aspectRatio: NaN, // Free crop
            viewMode: 1,
        });
    };
}

async function handleCropAndTranslate() {
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas();
    if (!canvas) {
        console.error("Could not get cropped canvas.");
        return;
    }

    const mimeType = 'image/jpeg';
    const base64Data = canvas.toDataURL(mimeType).split(',')[1];
    
    closeModalByEvent({ currentTarget: document.getElementById('cropper-modal') } as unknown as Event);
    await translateImage(base64Data, mimeType);
}


function renderDictionaryInitialView() {
    form.hidden = false;
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
    form.hidden = false;
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

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function renderConjugatorLayoutSkeleton() {
    resultsContainer.innerHTML = `
        <div id="conj-results-content">
            <div id="conj-header-placeholder" class="result-card-enter">
                <div class="skeleton-header">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-star"></div>
                </div>
                <div class="skeleton skeleton-text" style="margin-top: 0.5rem;"></div>
            </div>
            <div id="conj-main-forms-placeholder" class="verb-main-forms result-card-enter" style="--delay-index: 1;">
                <div class="skeleton skeleton-card"></div>
                <div class="skeleton skeleton-card"></div>
                <div class="skeleton skeleton-card"></div>
            </div>
            <div id="conj-tables-grid" class="tables-grid">
                <!-- Tense tables will be populated here -->
            </div>
        </div>
    `;
}

async function populateConjugatorResults(data: any) {
    const t = translations[currentLanguage];
    const verb = data.infinitivo;

    // 1. Header
    const headerPlaceholder = document.getElementById('conj-header-placeholder');
    if (headerPlaceholder) {
        const isFav = isFavoriteVerb(verb);
        const headerHTML = `
            <div class="verb-header-container">
                <h2 class="verb-title">${verb.charAt(0).toUpperCase() + verb.slice(1)}</h2>
                <button class="speak-btn" title="${t.speak}" data-text-to-speak="${verb}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                </button>
                <button class="print-btn" title="${t.print}" data-printable-area="#conj-results-content">
                    ${PRINTER_ICON_SVG}
                </button>
                <button class="favorite-btn ${isFav ? 'favorited' : ''}" data-verb="${verb}" aria-label="${isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd}">&#9733;</button>
            </div>
            ${data.definicion ? `<p class="verb-definition">${data.definicion}</p>` : ''}
        `;
        headerPlaceholder.innerHTML = headerHTML;
        headerPlaceholder.classList.add('active');
    }
    await delay(150);

    // 2. Main Forms
    const mainFormsPlaceholder = document.getElementById('conj-main-forms-placeholder');
    if (mainFormsPlaceholder) {
        const mainFormsHTML = `
            <div class="form-card-wrapper">
                 <button class="form-card" data-tense="infinitivo"><h3>${translations.es.infinitiveCard}</h3><p>${data.infinitivo}</p></button>
                 <button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${data.infinitivo}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>
            </div>
            <div class="form-card-wrapper">
                <button class="form-card" data-tense="gerundio"><h3>${translations.es.gerundCard}</h3><p>${data.gerundio}</p></button>
                 <button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${data.gerundio}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>
            </div>
            <div class="form-card-wrapper">
                <button class="form-card" data-tense="participio"><h3>${translations.es.participleCard}</h3><p>${data.participio}</p></button>
                 <button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${data.participio}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>
            </div>
        `;
        mainFormsPlaceholder.innerHTML = mainFormsHTML;
        mainFormsPlaceholder.classList.add('active');
    }
    await delay(150);

    // 3. Tense Tables
    const tablesGrid = document.getElementById('conj-tables-grid');
    if (tablesGrid) {
        tablesGrid.innerHTML = ''; // Clear previous
        let delayIndex = 2;
        for (const tenseKey in tenseTitleMap) {
            if (data[tenseKey]) {
                const tenseData = data[tenseKey];
                const tableContainer = document.createElement('div');
                tableContainer.className = 'tense-container result-card-enter';
                (tableContainer.style as any).setProperty('--delay-index', delayIndex++);

                let tableHTML = `
                    <table class="conjugation-table">
                        <caption>
                            <button class="tense-title-btn" data-tense="${tenseKey}">${tenseTitleMap[tenseKey as keyof typeof tenseTitleMap]}</button>
                        </caption>
                        <tbody>
                `;
                for (const pronoun in pronounMap) {
                    if (tenseData.conjugaciones[pronoun]) {
                        tableHTML += `
                            <tr>
                                <th>${pronounMap[pronoun as keyof typeof pronounMap]}</th>
                                <td>
                                    <span>${tenseData.conjugaciones[pronoun]}</span>
                                    <button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${tenseData.conjugaciones[pronoun]}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>
                                </td>
                            </tr>
                        `;
                    }
                }
                tableHTML += '</tbody></table>';

                if (tenseData.ejemplo) {
                     const highlightedExample = highlightVerbInSentence(tenseData.ejemplo, tenseData.conjugaciones);
                     tableHTML += `<div class="example-sentence"><span>${highlightedExample}</span><button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${tenseData.ejemplo}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button></div>`;
                }

                tableContainer.innerHTML = tableHTML;
                tablesGrid.appendChild(tableContainer);
                // Trigger animation
                setTimeout(() => tableContainer.classList.add('active'), 50);
            }
        }
    }

    // 4. Re-attach all event listeners for the new content
    document.querySelectorAll('.speak-btn, .speak-btn-inline').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = (e.currentTarget as HTMLElement).dataset.textToSpeak;
            if (text) speakText(text, 'es', e.currentTarget as HTMLButtonElement);
        });
    });

    document.querySelectorAll('.tense-title-btn, .form-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tenseKey = (e.currentTarget as HTMLElement).dataset.tense;
            if (tenseKey) openTenseModal(tenseKey);
        });
    });

     document.querySelector('.print-btn')?.addEventListener('click', (e) => {
        const selector = (e.currentTarget as HTMLElement).dataset.printableArea;
        if(selector) handlePrint(selector);
    });
}

function renderDictionaryLayoutSkeleton() {
    resultsContainer.innerHTML = `
        <div class="word-results-container">
            <div class="result-block result-card-enter">
                <div class="skeleton-header">
                    <div class="skeleton skeleton-title" style="width: 200px;"></div>
                    <div class="skeleton skeleton-star"></div>
                </div>
            </div>
            <div class="result-block result-card-enter" style="--delay-index: 1;">
                <div class="skeleton skeleton-text" style="width: 150px; height: 24px; margin-bottom: 1rem;"></div>
                <div class="skeleton skeleton-text" style="width: 90%;"></div>
                <div class="skeleton skeleton-text" style="width: 70%; margin-top: 0.5rem;"></div>
            </div>
             <div class="result-block result-card-enter" style="--delay-index: 2;">
                <div class="skeleton skeleton-text" style="width: 150px; height: 24px; margin-bottom: 1rem;"></div>
                <div style="display: flex; gap: 0.5rem;">
                     <div class="skeleton skeleton-text" style="width: 80px; height: 30px;"></div>
                     <div class="skeleton skeleton-text" style="width: 100px; height: 30px;"></div>
                     <div class="skeleton skeleton-text" style="width: 90px; height: 30px;"></div>
                </div>
            </div>
        </div>
    `;
}

async function populateDictionaryResults(data: any) {
    const t = translations[currentLanguage];
    const word = data.palabra;
    renderDictionaryLayoutSkeleton(); // Start with skeleton

    await delay(100); // Small delay for skeleton to render

    const container = document.querySelector('.word-results-container') as HTMLElement;
    if (!container) return; // Should not happen

    const isFav = isFavoriteWord(word);
    const headerHTML = `
        <div class="verb-header-container">
            <h2 class="word-title">
                <span>${word.charAt(0).toUpperCase() + word.slice(1)}</span>
                ${data.articulo ? `<span class="article">${data.articulo}</span>` : ''}
            </h2>
             <button class="speak-btn" title="${t.speak}" data-text-to-speak="${word}">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
            </button>
            <button class="favorite-btn ${isFav ? 'favorited' : ''}" data-word="${word}" aria-label="${isFav ? t.favoriteAriaLabelRemove : t.favoriteAriaLabelAdd}">&#9733;</button>
        </div>
    `;

    let blocksHTML = '';

    if (data.definicion) {
        blocksHTML += `<div class="result-block"><h3>${t.definitionLabel}</h3><p class="word-definition-text">${data.definicion}</p></div>`;
    }
    if (data.forma_plural) {
         blocksHTML += `<div class="result-block"><h3>${t.pluralFormLabel}</h3><p class="plural-form-text">${data.forma_plural}</p></div>`;
    }

    const synonyms = data.sinonimos?.filter(Boolean) || [];
    if (synonyms.length > 0) {
         blocksHTML += `<div class="result-block"><h3>${t.synonymsLabel}</h3><div class="word-list">${synonyms.map((s:string) => `<button class="word-tag" data-word="${s}">${s}</button>`).join('')}</div></div>`;
    }

    const antonyms = data.antonimos?.filter(Boolean) || [];
    if (antonyms.length > 0) {
         blocksHTML += `<div class="result-block"><h3>${t.antonymsLabel}</h3><div class="word-list">${antonyms.map((a:string) => `<button class="word-tag" data-word="${a}">${a}</button>`).join('')}</div></div>`;
    }

    const examples = data.ejemplos ? Object.entries(data.ejemplos).filter(([_, val]) => val) : [];
    if (examples.length > 0) {
        blocksHTML += `<div class="result-block">
            <h3>${t.examplesLabel}</h3>
            <ul class="examples-list">
                ${examples.map(([key, value]) => {
                    const [sentence, translation] = (value as string).split(' // ');
                    const translationHtml = translation ? `<small class="translation">${translation.trim()}</small>` : '';
                    return `<li class="example-list-item">
                                <div style="flex-grow: 1;">
                                    <span><strong>${exampleTenseMap[key as keyof typeof exampleTenseMap] || key}:</strong> ${sentence}</span>
                                    ${translationHtml}
                                </div>
                                <button class="speak-btn-inline" title="${t.speak}" data-text-to-speak="${sentence}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg></button>
                            </li>`;
                }).join('')}
            </ul>
        </div>`;
    }

    if (data.verbo_derivado?.verbo) {
        blocksHTML += `<div class="derived-verb-card">
            <h4>${t.derivedVerbTitle}</h4>
            <div class="derived-verb-content">
                <div class="derived-verb-info">
                    <p class="derived-verb-word">${data.verbo_derivado.verbo}</p>
                    <p class="derived-verb-def">${data.verbo_derivado.definicion}</p>
                </div>
                <button class="conjugate-link-btn derived-verb-conjugate-btn" data-verb="${data.verbo_derivado.verbo}">${t.conjugateButton} <span>→</span></button>
            </div>
        </div>`;
    }

    resultsContainer.innerHTML = `
        <div class="word-results-container">
            <div class="result-block">${headerHTML}</div>
            ${blocksHTML}
        </div>
    `;
    
     document.querySelectorAll('.speak-btn, .speak-btn-inline').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = (e.currentTarget as HTMLElement).dataset.textToSpeak;
            if (text) speakText(text, 'es', e.currentTarget as HTMLButtonElement);
        });
    });
}

function openTenseModal(tenseKey: string) {
    const t = translations[currentLanguage];
    const tenseInfo = t.tenseExplanations[tenseKey as keyof typeof t.tenseExplanations];

    if (!tenseInfo || !modal || !modalBody) return;

    let examplesHtml = '';
    if (tenseInfo.examples) {
        if (typeof tenseInfo.examples === 'object' && !Array.isArray(tenseInfo.examples)) {
            // Conjugation examples
            examplesHtml = `<table class="endings-table">
                <thead><tr><th>Verb</th><th>yo</th><th>tú</th><th>él</th><th>nosotros</th><th>vosotros</th><th>ellos</th></tr></thead>
                <tbody>
                ${Object.entries(tenseInfo.examples).map(([verb, conjugations]) => `
                    <tr>
                        <td><strong>${verb}</strong></td>
                        ${(conjugations as string[]).map(c => `<td>${c}</td>`).join('')}
                    </tr>
                `).join('')}
                </tbody>
            </table>`;
        } else {
            // Simple sentence examples
             examplesHtml = `<ul class="modal-examples-list">${Object.values(tenseInfo.examples).map(ex => `<li>${ex}</li>`).join('')}</ul>`;
        }
    }


    modalBody.innerHTML = `
        <h2 id="modal-title">${tenseInfo.title}</h2>
        <p>${tenseInfo.explanation}</p>
        <h3>${tenseInfo.adverbsTitle}</h3>
        <p>${tenseInfo.adverbs}</p>
        ${examplesHtml ? `<h3>${tenseInfo.examplesTitle}</h3>${examplesHtml}`: ''}
    `;
    openModalById('tense-modal');
}


// --- Autocomplete ---
function showAutocomplete(matches: {es: string, ka: string}[]) {
    if (matches.length > 0) {
        suggestionsContainer.innerHTML = matches.map(match => `
            <div data-value="${match.es}">
                <span>${match.es}</span>
                <span class="ka-suggestion">${match.ka}</span>
            </div>
        `).join('');
        suggestionsContainer.hidden = false;
    } else {
        suggestionsContainer.hidden = true;
    }
}

function handleAutocompleteInput() {
    const value = input.value.toLowerCase();
    if (value.length < 2) {
        suggestionsContainer.hidden = true;
        return;
    }

    const matches = VERB_LIST.filter(verb =>
        verb.es.toLowerCase().startsWith(value) || (currentLanguage === 'ka' && verb.ka.startsWith(value))
    ).slice(0, 5);

    showAutocomplete(matches);
}

// --- PWA Install Prompt ---
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredInstallPrompt = e;
    // Show the custom install prompt
    const pwaModal = document.getElementById('pwa-install-modal');
    if (pwaModal) {
        const t = translations[currentLanguage];
        (document.getElementById('pwa-install-title') as HTMLElement).textContent = t.pwaInstallTitle;
        (document.getElementById('pwa-install-body') as HTMLElement).textContent = t.pwaInstallBody;
        (document.getElementById('pwa-install-confirm-btn') as HTMLElement).textContent = t.pwaInstallConfirm;
        (document.getElementById('pwa-install-decline-btn') as HTMLElement).textContent = t.pwaInstallDecline;
        openModalById('pwa-install-modal');
    }
});

async function handlePwaInstall() {
     closeModalByEvent({ currentTarget: document.getElementById('pwa-install-modal') } as unknown as Event);
     if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredInstallPrompt = null;
    }
}


// --- Initialization and Event Listeners ---
function init() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentView === 'conjugator') {
            conjugateVerb(input.value.trim());
        } else if (currentView === 'dictionary') {
            searchWord(input.value.trim());
        }
    });

    input.addEventListener('input', () => {
        if (currentView === 'conjugator') {
            handleAutocompleteInput();
        } else {
            suggestionsContainer.hidden = true;
        }
    });
    
    suggestionsContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const suggestionDiv = target.closest('div[data-value]') as HTMLDivElement;
        if (suggestionDiv) {
            const value = suggestionDiv.dataset.value;
            if (value) {
                input.value = value;
                suggestionsContainer.hidden = true;
                conjugateVerb(value);
            }
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!form.contains(e.target as Node)) {
            suggestionsContainer.hidden = true;
        }
    });

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = (btn as HTMLElement).dataset.lang as Language;
            if (lang !== currentLanguage) {
                currentLanguage = lang;
                document.querySelectorAll('.lang-btn.active').forEach(b => b.classList.remove('active'));
                document.querySelectorAll(`.lang-btn[data-lang="${lang}"]`).forEach(b => b.classList.add('active'));
                updateUIForLanguage();
            }
        });
    });

    mobileLangBtn.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'es' ? 'ka' : 'es';
        document.querySelectorAll('.lang-btn.active').forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`.lang-btn[data-lang="${currentLanguage}"]`).forEach(b => b.classList.add('active'));
        updateUIForLanguage();
    });

    document.querySelectorAll('.nav-btn, .bottom-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = (e.currentTarget as HTMLElement).dataset.view as View;
            setView(view);
        });
    });

    document.querySelector('.footer-about-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        setView('about');
    });
    document.querySelector('.footer-practice-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        setView('practice');
    });

    // Modal close listeners
    modalCloseBtn.addEventListener('click', closeModalByEvent);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalByEvent(e);
    });
    document.querySelectorAll('.modal-close[data-target-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = (btn as HTMLElement).dataset.targetModal;
            if (modalId) {
                const targetModal = document.getElementById(modalId);
                if(targetModal) (targetModal as HTMLElement).hidden = true;
                document.body.style.overflow = '';
            }
        });
    });
    
    // Image Upload Modals
    document.getElementById('take-photo-btn')?.addEventListener('click', () => imageUploadCameraInput.click());
    document.getElementById('from-gallery-btn')?.addEventListener('click', () => imageUploadGalleryInput.click());
    imageUploadGalleryInput.addEventListener('change', handleImageUpload);
    imageUploadCameraInput.addEventListener('change', handleImageUpload);
    documentUploadInput.addEventListener('change', handleDocumentUpload);

    // Cropper modal
    document.getElementById('crop-and-translate-btn')?.addEventListener('click', handleCropAndTranslate);

    // PWA Install Modal
    document.getElementById('pwa-install-confirm-btn')?.addEventListener('click', handlePwaInstall);
    document.getElementById('pwa-install-decline-btn')?.addEventListener('click', () => closeModalByEvent({ currentTarget: document.getElementById('pwa-install-modal') } as unknown as Event));
    
    // Alert Modal
    alertModalCloseBtn.addEventListener('click', closeModalByEvent);
    alertModal.addEventListener('click', (e) => {
         if (e.target === alertModal) closeModalByEvent(e);
    });


    // Initial setup
    const initialLang = (navigator.language.startsWith('ka') ? 'ka' : 'es') as Language;
    currentLanguage = initialLang;
    document.querySelectorAll(`.lang-btn[data-lang="${initialLang}"]`).forEach(b => b.classList.add('active'));
    setView(currentView); // Initial render with default view
    updateUIForLanguage();
}

document.addEventListener('DOMContentLoaded', init);
