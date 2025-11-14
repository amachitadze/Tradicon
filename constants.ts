/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Static Assets & UI Constants ---
export const FLAG_URLS = {
    es: 'https://flagcdn.com/es.svg',
    ka: 'https://flagcdn.com/ge.svg'
};

export const PRINTER_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></svg>';
export const HOME_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>';
export const SOUND_ON_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';
export const SOUND_OFF_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>';
export const HAMBURGER_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>';
export const SPEAKER_SIMPLE_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"></path></svg>';
export const MIC_ICON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"></path></svg>';

export const AVATAR_ICONS: { [key: string]: string } = {
    'default': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>',
    'person_1': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></svg>',
    'person_2': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>',
    'robot': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6zm2 5h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"></path></svg>',
    'book': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></svg>',
    'world': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg>'
};

export const MOST_COMMON_VERBS = ['ser', 'estar', 'tener', 'hacer', 'ir', 'decir', 'poder', 'saber', 'querer', 'hablar', 'comer', 'vivir'];
export const MOST_COMMON_WORDS = ['casa', 'coche', 'libro', 'agua', 'comida', 'amigo', 'grande', 'pequeño', 'bueno', 'malo', 'día', 'noche'];

export const pronounMap = {
    yo: 'Yo',
    tu: 'Tú',
    el: 'Él/Ella/Ud.',
    nosotros: 'Nosotros/as',
    vosotros: 'Vosotros/as',
    ellos: 'Ellos/as/Uds.'
};

export const tenseTitleMap = {
    presente: 'Presente',
    preterito_perfecto: 'Pretérito Perfecto',
    preterito_indefinido: 'Pretérito Indefinido',
    preterito_imperfecto: 'Pretérito Imperfecto',
    futuro_simple: 'Futuro Simple'
};


// --- i18n Translations ---
export const translations = {
    es: {
        pageTitle: "Conjugador, Diccionario y Traductor",
        headerTitle: "CONJUGADOR",
        dictionaryHeaderTitle: "DICCIONARIO",
        translatorHeaderTitle: "TRADUCTOR",
        practiceHeaderTitle: "PRÁCTICA",
        chatHeaderTitle: "CHAT",
        historyHeaderTitle: "HISTORIAL",
        favoritesHeaderTitle: "FAVORITOS",
        aboutHeaderTitle: "Sobre la App y Ayuda",
        guidelinesHeaderTitle: "Guía de Estilo",
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
        errorServer: "Hubo un problema con el servidor. Por favor, inténtalo de nuevo en unos momentos.",
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
        footerAbout: "Sobre la app",
        footerGeminiCredit: '',
        conjugatorTab: "Conjugador",
        dictionaryTab: "Diccionario",
        translatorTab: "Traductor",
        practiceTab: "Práctica",
        chatTab: "Chat",
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
        micErrorNoSpeech: "No se detectó voz. Inténtalo de nuevo y habla con claridad.",
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
        noTextInImage: "No se encontró texto en la imagen.",
        dataManagementTitle: "Gestión de Datos",
        dataManagementDesc: "Guarda una copia de seguridad de tus favoritos e historial, o restáurala desde un archivo.",
        exportButton: "Exportar Datos",
        importButton: "Importar Datos",
        importConfirmTitle: "Confirmar Importación",
        importConfirmBody: "Esto reemplazará todos tus favoritos e historiales actuales con los datos del archivo. ¿Estás seguro de que quieres continuar?",
        importSuccessTitle: "Importación Exitosa",
        importSuccessBody: "Tus datos han sido restaurados. La aplicación se recargará ahora.",
        importErrorTitle: "Error de Importación",
        importErrorBody: "El archivo seleccionado no es válido o está corrupto. No se realizaron cambios.",
        yesButton: "Sí, continuar",
        noButton: "Cancelar",
        driveBackupLinkText: "Descargar desde Drive",
        importOptionsTitle: "Opciones de Importación",
        importReplace: "Reemplazar Datos",
        importReplaceDesc: "Esto borrará todos tus datos actuales y los reemplazará con los del archivo.",
        importMerge: "Combinar Datos",
        importMergeDesc: "Esto añadirá los datos del archivo a tus datos actuales, sin borrar nada.",
        importMergeSuccessTitle: "Combinación Exitosa",
        importMergeSuccessBody: "Tus datos existentes se han combinado con los del archivo. La aplicación se recargará ahora.",
        examplesNotFound: "No se encontraron ejemplos para esta palabra.",
        synonymsNotFound: "No se encontraron sinónimos para esta palabra.",
        antonymsNotFound: "No se encontraron antónimos para esta palabra.",
        pluralNotFound: "No se encontró una forma plural o no aplica.",
        derivedVerbAction: "Verbo Derivado",
        derivedVerbNotFound: "No se encontró un verbo derivado para esta palabra.",
        toggleSound: "Activar/desactivar sonido",
        quitSessionTitle: "¿Salir de la sesión?",
        quitSessionBody: "Tu progreso se perderá. ¿Estás seguro de que quieres salir?",
        auxiliaryMaterials: "Materiales de Apoyo",
        chatPersonaTitle: "Crea tu compañero de chat",
        chatPersonaDescription: "Describe la personalidad o el rol de la IA con la que quieres hablar. Sé creativo. La IA siempre responderá en español.",
        chatPersonaPlaceholder: "Ej: Un amigo de Madrid que me recomienda bares de tapas...",
        startChatButton: "Empezar Chat",
        startLiveChat: "Empezar Conversación",
        stopLiveChat: "Detener Conversación",
        chatStatusConnecting: "Conectando...",
        chatStatusListening: "Escuchando...",
        chatStatusError: "Error de conexión",
        endChatSession: "Finalizar Chat",
        chatInputPlaceholder: "Escribe un mensaje...",
        practiceNoQuestionsTitle: "Sin Preguntas",
        practiceNoQuestionsBody: "Todavía no hay preguntas disponibles para este tema.",
        apiUsageTitle: "Monitor de Uso de API",
        apiUsageDesc: "Este medidor rastrea el número de solicitudes que tu dispositivo envía a la API de Gemini por minuto. El límite para el nivel gratuito es de 60 solicitudes por minuto. El contador se reinicia cada minuto.",
        apiUsageLabel: "Solicitudes por Minuto",
        apiUsageTooltip: "Haz clic para ver más detalles sobre el uso de la API",
        chatLimitReached: "Límite diario de mensajes alcanzado.",
        chatLimitResets: "El límite se restablecerá mañana.",
        clearChatHistory: "Limpiar Chat",
        confirmClearChatBody: "¿Estás seguro de que quieres borrar el historial de este chat?",
        confirmDeletePersonaTitle: "Borrar Persona",
        confirmDeletePersonaBody: "¿Estás seguro de que quieres borrar esta persona y todo su historial de chat? Esta acción no se puede deshacer.",
        polishTab: "Pulir Texto",
        polishButton: "Pulir Texto",
        polishingText: "Puliendo...",
        textLanguage: "Idioma del Texto",
        toneLabel: "Tono",
        toneFormal: "Formal",
        toneFriendly: "Amistoso",
        toneBusiness: "Profesional",
        toneCreative: "Creativo",
        toneSimplified: "Simplificado",
        showChanges: "Mostrar cambios",
        translateThisText: "Traducir este texto",
        guidelinesLinkText: "Ver Guía de Estilo de la App",
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
                {{GUIDELINES_LINK}}
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
                examples: { hablar: ["hablaba", "hablabas", "hablaba", "hablamos", "hablabais", "hablaban"], comer: ["comía", "comías", "comía", "comíamos", "comíais", "comían"], vivir: ["vivía", "vivías", "vivía", "vivíamos", "vivíais", "vivían"] }
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
        chatHeaderTitle: "ჩატი",
        historyHeaderTitle: "ისტორია",
        favoritesHeaderTitle: "ფავორიტები",
        aboutHeaderTitle: "საიტის შესახებ",
        guidelinesHeaderTitle: "სტილის სახელმძღვანელო",
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
        errorServer: "სერვერზე პრობლემაა. გთხოვთ, სცადოთ ხელახლა რამდენიმე წამში.",
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
        footerAbout: "აპლიკაციის შესახებ",
        footerGeminiCredit: '',
        conjugatorTab: "უღლება",
        dictionaryTab: "ლექსიკონი",
        translatorTab: "მთარგმნელი",
        practiceTab: "პრაქტიკა",
        chatTab: "ჩატი",
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
        micErrorNoSpeech: "ხმა ვერ დაფიქსირდა. სცადეთ თავიდან და ისაუბრეთ გარკვევით.",
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
        noTextInImage: "სურათზე ტექსტი ვერ მოიძებნა.",
        dataManagementTitle: "მონაცემების მართვა",
        dataManagementDesc: "შეინახეთ თქვენი ფავორიტებისა და ისტორიის სარეზერვო ასლი, ან აღადგინეთ ფაილიდან.",
        exportButton: "მონაცემების ექსპორტი",
        importButton: "მონაცემების იმპორტი",
        importConfirmTitle: "იმპორტის დადასტურება",
        importConfirmBody: "ეს ჩაანაცვლებს თქვენს ამჟამინდელ ფავორიტებსა და ისტორიას ფაილში არსებული მონაცემებით. დარწმუნებული ხართ, რომ გსურთ გაგრძელება?",
        importSuccessTitle: "იმპორტი წარმატებით დასრულდა",
        importSuccessBody: "თქვენი მონაცემები აღდგენილია. აპლიკაცია ახლა გადაიტვირთება.",
        importErrorTitle: "იმპორტის შეცდომა",
        importErrorBody: "არჩეული ფაილი არასწორია ან დაზიანებულია. ცვლილებები არ განხორციელებულა.",
        yesButton: "დიახ, გაგრძელება",
        noButton: "გაუქმება",
        driveBackupLinkText: "გადმოწერა დრაივიდან",
        importOptionsTitle: "იმპორტის ოფციები",
        importReplace: "მონაცემების ჩანაცვლება",
        importReplaceDesc: "ეს წაშლის ყველა არსებულ მონაცემს და ჩაანაცვლებს ფაილში არსებულით.",
        importMerge: "მონაცემების გაერთიანება",
        importMergeDesc: "ეს დაამატებს ფაილში არსებულ მონაცემებს არსებულზე, წაშლის გარეშე.",
        importMergeSuccessTitle: "გაერთიანება წარმატებით დასრულდა",
        importMergeSuccessBody: "თქვენი მონაცემები გაერთიანდა ფაილიდან გადმოწერილ მონაცემებთან. აპლიკაცია გადაიტვირთება.",
        examplesNotFound: "ამ სიტყვისთვის მაგალითები არ მოიძებნა.",
        synonymsNotFound: "ამ სიტყვისთვის სინონიმები არ მოიძებნა.",
        antonymsNotFound: "ამ სიტყვისთვის ანტონიმები არ მოიძებნა.",
        pluralNotFound: "მრავლობითი რიცხვი არ მოიძებნა ან არ აქვს.",
        derivedVerbAction: "ნაწარმოები ზმნა",
        derivedVerbNotFound: "ამ სიტყვაზე ზმნის ფორმა არ იძებნება.",
        toggleSound: "ხმის ჩართვა/გამორთვა",
        quitSessionTitle: "სესიის დასრულება?",
        quitSessionBody: "თქვენი პროგრესი დაიკარგება. დარწმუნებული ხართ, რომ გსურთ გასვლა?",
        auxiliaryMaterials: "დამხმარე მასალები",
        chatPersonaTitle: "შექმენი შენი მოსაუბრე",
        chatPersonaDescription: "აღწერე პერსონა, ვისთანაც გსურს საუბარი. იყავი კრეატიული. ის ყოველთვის გიპასუხებს ესპანურად.",
        chatPersonaPlaceholder: "მაგ: მეგობარი მადრიდიდან, რომელიც მირჩევს ტაპას ბარებს...",
        startChatButton: "ჩატის დაწყება",
        startLiveChat: "საუბრის დაწყება",
        stopLiveChat: "საუბრის შეწყვეტა",
        chatStatusConnecting: "ვუკავშირდები...",
        chatStatusListening: "გისმენთ...",
        chatStatusError: "კავშირის შეცდომა",
        endChatSession: "სესიის დასრულება",
        chatInputPlaceholder: "დაწერეთ შეტყობინება...",
        practiceNoQuestionsTitle: "კითხვები არ არის",
        practiceNoQuestionsBody: "ამ თემისთვის კითხვები ჯერ არ არის ხელმისაწვდომი.",
        apiUsageTitle: "API გამოყენების მონიტორი",
        apiUsageDesc: "ეს მთვლელი აკონტროლებს თქვენი მოწყობილობიდან Gemini API-სადმი გაგზავნილი მოთხოვნების რაოდენობას წუთში. უფასო ვერსიის ლიმიტია 60 მოთხოვნა წუთში. მთვლელი ყოველ წუთს ნულდება.",
        apiUsageLabel: "მოთხოვნა წუთში",
        apiUsageTooltip: "დააჭირეთ API-ს გამოყენების დეტალების სანახავად",
        chatLimitReached: "შეტყობინებების დღიური ლიმიტი ამოწურულია.",
        chatLimitResets: "ლიმიტი განახლდება ხვალ.",
        clearChatHistory: "ჩატის გასუფთავება",
        confirmClearChatBody: "დარწმუნებული ხართ, რომ გსურთ ამ ჩატის ისტორიის წაშლა?",
        confirmDeletePersonaTitle: "პერსონის წაშლა",
        confirmDeletePersonaBody: "დარწმუნებული ხართ, რომ გსურთ ამ პერსონის და მისი ჩატის ისტორიის წაშლა? ამ მოქმედების გაუქმება შეუძლებელია.",
        polishTab: "დახვეწა",
        polishButton: "ტექსტის დახვეწა",
        polishingText: "ვამუშავებ...",
        textLanguage: "ტექსტის ენა",
        toneLabel: "ტონი",
        toneFormal: "ფორმალური",
        toneFriendly: "მეგობრული",
        toneBusiness: "საქმიანი",
        toneCreative: "შემოქმედებითი",
        toneSimplified: "გამარტივებული",
        showChanges: "ცვლილებების ჩვენება",
        translateThisText: "ამ ტექსტის თარგმნა",
        guidelinesLinkText: "აპლიკაციის სტილის სახელმძღვანელოს ნახვა",
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
                {{GUIDELINES_LINK}}
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
                examples: { hablar: ["hablaba", "hablabas", "hablaba", "hablamos", "hablabais", "hablaban"], comer: ["comía", "comías", "comía", "comíamos", "comíais", "comían"], vivir: ["vivía", "vivías", "vivía", "vivíamos", "vivíais", "vivían"] }
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

// --- Spanish Verb List with Georgian Translations for Autocomplete ---
export const VERB_LIST = [
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
    { es: "construir", ka: "აშენება" }, { es: "contar", ka: "თვლა" },
];