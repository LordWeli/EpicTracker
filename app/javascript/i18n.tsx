import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  Fragment,
} from "react"

// ── Types & lang list ────────────────────────────────────────────────────────
export type Lang = "en" | "pt" | "es" | "ja" | "ru" | "de" | "fr" | "zh" | "it"

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English",   flag: "🇬🇧" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "es", label: "Español",   flag: "🇪🇸" },
  { code: "ja", label: "日本語",     flag: "🇯🇵" },
  { code: "ru", label: "Русский",   flag: "🇷🇺" },
  { code: "de", label: "Deutsch",   flag: "🇩🇪" },
  { code: "fr", label: "Français",  flag: "🇫🇷" },
  { code: "zh", label: "中文",       flag: "🇨🇳" },
  { code: "it", label: "Italiano",  flag: "🇮🇹" },
]

// ── Dictionaries ─────────────────────────────────────────────────────────────
type Dict = Record<string, string>

const en: Dict = {
  "header.getAuthCode": "Get Auth Code ↗",
  "header.placeholder": "Paste your auth_code…",
  "header.fetch": "Fetch",
  "header.loading": "Loading…",
  "header.help": "Show instructions",
  "header.helpTitle": "How to use",
  "header.changeLanguage": "Change language",
  "library.label": "LIBRARY",
  "library.gamesLoaded": "GAMES LOADED",
  "library.games": "GAMES",
  "library.fetchingPrefix": "Fetching",
  "library.notFound": "Not found on HowLongToBeat",
  "library.timeToBeat": "Time to Beat",
  "library.mainStory": "Main Story",
  "library.mainExtra": "Main + Extra",
  "library.completionist": "Completionist",
  "empty.message": "ENTER YOUR AUTH CODE TO BEGIN",
  "error.noGames": "No games found.",
  "error.serverConnection": "Failed to connect to server.",
  "modal.back": "← BACK",
  "modal.next": "NEXT →",
  "modal.gotIt": "GOT IT",
  "modal.close": "Close",
  "modal.dotAria": "Go to step {n}",
  "modal.welcome.badge": "WELCOME",
  "modal.welcome.title": "Meet EpicTracker",
  "modal.welcome.body": "Your {epic} library, paired with {hltb} completion times — in one place. See how many hours each game in your collection will actually take, from a quick main story run to a full completionist playthrough. Two short steps and you're in.",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "STEP 01",
  "modal.step1.title": "Get your auth code",
  "modal.step1.body": "Click the {button} button at the top right. A new tab will open with a JSON response from Epic Games. Copy the value of the {field} field.",
  "modal.step1.button": "Get Auth Code ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "STEP 02",
  "modal.step2.title": "Fetch your library",
  "modal.step2.body": "Paste the code into the {input} input, then click {fetch}. EpicTracker will load your games and match them against HowLongToBeat.",
  "modal.step2.input": "Paste your auth_code…",
  "modal.step2.fetch": "Fetch",
}

const pt: Dict = {
  "header.getAuthCode": "Obter Auth Code ↗",
  "header.placeholder": "Cole seu auth_code…",
  "header.fetch": "Buscar",
  "header.loading": "Carregando…",
  "header.help": "Mostrar instruções",
  "header.helpTitle": "Como usar",
  "header.changeLanguage": "Mudar idioma",
  "library.label": "BIBLIOTECA",
  "library.gamesLoaded": "JOGOS CARREGADOS",
  "library.games": "JOGOS",
  "library.fetchingPrefix": "Buscando",
  "library.notFound": "Não encontrado no HowLongToBeat",
  "library.timeToBeat": "Tempo para Terminar",
  "library.mainStory": "História Principal",
  "library.mainExtra": "Principal + Extras",
  "library.completionist": "Completista",
  "empty.message": "INSIRA SEU AUTH CODE PARA COMEÇAR",
  "error.noGames": "Nenhum jogo encontrado.",
  "error.serverConnection": "Falha ao conectar ao servidor.",
  "modal.back": "← VOLTAR",
  "modal.next": "PRÓXIMO →",
  "modal.gotIt": "ENTENDI",
  "modal.close": "Fechar",
  "modal.dotAria": "Ir para passo {n}",
  "modal.welcome.badge": "BEM-VINDO",
  "modal.welcome.title": "Conheça o EpicTracker",
  "modal.welcome.body": "Sua biblioteca da {epic}, combinada com os tempos de conclusão do {hltb} — num só lugar. Veja quantas horas cada jogo da sua coleção realmente leva, da campanha rápida até o playthrough completista. Dois passos curtos e está pronto.",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "PASSO 01",
  "modal.step1.title": "Pegue seu auth code",
  "modal.step1.body": "Clique no botão {button} no canto superior direito. Uma nova aba abrirá com a resposta JSON da Epic Games. Copie o valor do campo {field}.",
  "modal.step1.button": "Obter Auth Code ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "PASSO 02",
  "modal.step2.title": "Carregue sua biblioteca",
  "modal.step2.body": "Cole o código no campo {input}, depois clique em {fetch}. O EpicTracker carregará seus jogos e cruzará com o HowLongToBeat.",
  "modal.step2.input": "Cole seu auth_code…",
  "modal.step2.fetch": "Buscar",
}

const es: Dict = {
  "header.getAuthCode": "Obtener Auth Code ↗",
  "header.placeholder": "Pega tu auth_code…",
  "header.fetch": "Buscar",
  "header.loading": "Cargando…",
  "header.help": "Mostrar instrucciones",
  "header.helpTitle": "Cómo usar",
  "header.changeLanguage": "Cambiar idioma",
  "library.label": "BIBLIOTECA",
  "library.gamesLoaded": "JUEGOS CARGADOS",
  "library.games": "JUEGOS",
  "library.fetchingPrefix": "Buscando",
  "library.notFound": "No encontrado en HowLongToBeat",
  "library.timeToBeat": "Tiempo para Completar",
  "library.mainStory": "Historia Principal",
  "library.mainExtra": "Principal + Extras",
  "library.completionist": "Completista",
  "empty.message": "INTRODUCE TU AUTH CODE PARA EMPEZAR",
  "error.noGames": "No se encontraron juegos.",
  "error.serverConnection": "Fallo al conectar con el servidor.",
  "modal.back": "← ATRÁS",
  "modal.next": "SIGUIENTE →",
  "modal.gotIt": "ENTENDIDO",
  "modal.close": "Cerrar",
  "modal.dotAria": "Ir al paso {n}",
  "modal.welcome.badge": "BIENVENIDO",
  "modal.welcome.title": "Conoce EpicTracker",
  "modal.welcome.body": "Tu biblioteca de {epic}, junto con los tiempos de finalización de {hltb} — en un solo lugar. Mira cuántas horas tomará realmente cada juego de tu colección, desde una pasada rápida de la historia hasta una completista. Dos pasos cortos y listo.",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "PASO 01",
  "modal.step1.title": "Obtén tu auth code",
  "modal.step1.body": "Haz clic en el botón {button} arriba a la derecha. Se abrirá una nueva pestaña con la respuesta JSON de Epic Games. Copia el valor del campo {field}.",
  "modal.step1.button": "Obtener Auth Code ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "PASO 02",
  "modal.step2.title": "Carga tu biblioteca",
  "modal.step2.body": "Pega el código en el campo {input}, luego haz clic en {fetch}. EpicTracker cargará tus juegos y los cruzará con HowLongToBeat.",
  "modal.step2.input": "Pega tu auth_code…",
  "modal.step2.fetch": "Buscar",
}

const ja: Dict = {
  "header.getAuthCode": "認証コードを取得 ↗",
  "header.placeholder": "auth_codeを貼り付け…",
  "header.fetch": "取得",
  "header.loading": "読み込み中…",
  "header.help": "使い方を表示",
  "header.helpTitle": "使い方",
  "header.changeLanguage": "言語を変更",
  "library.label": "ライブラリ",
  "library.gamesLoaded": "ゲーム読み込み済み",
  "library.games": "ゲーム",
  "library.fetchingPrefix": "取得中",
  "library.notFound": "HowLongToBeatで見つかりません",
  "library.timeToBeat": "クリア時間",
  "library.mainStory": "メインストーリー",
  "library.mainExtra": "メイン+サブ",
  "library.completionist": "コンプリート",
  "empty.message": "AUTHコードを入力して開始",
  "error.noGames": "ゲームが見つかりません。",
  "error.serverConnection": "サーバーへの接続に失敗しました。",
  "modal.back": "← 戻る",
  "modal.next": "次へ →",
  "modal.gotIt": "了解",
  "modal.close": "閉じる",
  "modal.dotAria": "ステップ{n}へ",
  "modal.welcome.badge": "ようこそ",
  "modal.welcome.title": "EpicTrackerへようこそ",
  "modal.welcome.body": "あなたの{epic}ライブラリと{hltb}のクリア時間を一つの場所に。コレクション内の各ゲームが実際にどれだけ時間がかかるか、メインストーリーから完全クリアまで確認できます。2つの簡単なステップで始められます。",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "ステップ01",
  "modal.step1.title": "認証コードを取得",
  "modal.step1.body": "右上の{button}ボタンをクリックします。Epic GamesのJSONレスポンスを含む新しいタブが開きます。{field}フィールドの値をコピーしてください。",
  "modal.step1.button": "Auth Codeを取得します ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "ステップ02",
  "modal.step2.title": "ライブラリを取得",
  "modal.step2.body": "コードを{input}フィールドに貼り付け、{fetch}をクリックします。EpicTrackerがゲームを読み込み、HowLongToBeatと照合します。",
  "modal.step2.input": "auth_codeを貼り付け…",
  "modal.step2.fetch": "取得",
}

const ru: Dict = {
  "header.getAuthCode": "Получить Auth Code ↗",
  "header.placeholder": "Вставьте auth_code…",
  "header.fetch": "Загрузить",
  "header.loading": "Загрузка…",
  "header.help": "Показать инструкции",
  "header.helpTitle": "Как использовать",
  "header.changeLanguage": "Сменить язык",
  "library.label": "БИБЛИОТЕКА",
  "library.gamesLoaded": "ИГР ЗАГРУЖЕНО",
  "library.games": "ИГР",
  "library.fetchingPrefix": "Загрузка",
  "library.notFound": "Не найдено на HowLongToBeat",
  "library.timeToBeat": "Время прохождения",
  "library.mainStory": "Основной сюжет",
  "library.mainExtra": "Основной + Доп.",
  "library.completionist": "100%",
  "empty.message": "ВВЕДИТЕ AUTH CODE ДЛЯ НАЧАЛА",
  "error.noGames": "Игры не найдены.",
  "error.serverConnection": "Не удалось подключиться к серверу.",
  "modal.back": "← НАЗАД",
  "modal.next": "ДАЛЕЕ →",
  "modal.gotIt": "ПОНЯТНО",
  "modal.close": "Закрыть",
  "modal.dotAria": "К шагу {n}",
  "modal.welcome.badge": "ДОБРО ПОЖАЛОВАТЬ",
  "modal.welcome.title": "Знакомьтесь, EpicTracker",
  "modal.welcome.body": "Ваша библиотека {epic} вместе со временем прохождения от {hltb} — в одном месте. Узнайте, сколько часов потребует каждая игра вашей коллекции — от быстрого сюжета до полного 100%. Всего два шага.",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "ШАГ 01",
  "modal.step1.title": "Получите ваш auth code",
  "modal.step1.body": "Нажмите кнопку {button} в правом верхнем углу. Откроется новая вкладка с JSON-ответом от Epic Games. Скопируйте значение поля {field}.",
  "modal.step1.button": "Получить Auth Code ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "ШАГ 02",
  "modal.step2.title": "Загрузите библиотеку",
  "modal.step2.body": "Вставьте код в поле {input}, затем нажмите {fetch}. EpicTracker загрузит ваши игры и сопоставит их с HowLongToBeat.",
  "modal.step2.input": "Вставьте auth_code…",
  "modal.step2.fetch": "Загрузить",
}

const de: Dict = {
  "header.getAuthCode": "Auth Code holen ↗",
  "header.placeholder": "auth_code einfügen…",
  "header.fetch": "Laden",
  "header.loading": "Laden…",
  "header.help": "Anleitung anzeigen",
  "header.helpTitle": "Bedienung",
  "header.changeLanguage": "Sprache wechseln",
  "library.label": "BIBLIOTHEK",
  "library.gamesLoaded": "SPIELE GELADEN",
  "library.games": "SPIELE",
  "library.fetchingPrefix": "Lade",
  "library.notFound": "Auf HowLongToBeat nicht gefunden",
  "library.timeToBeat": "Spielzeit",
  "library.mainStory": "Hauptstory",
  "library.mainExtra": "Haupt + Extras",
  "library.completionist": "Komplettist",
  "empty.message": "AUTH CODE EINGEBEN, UM ZU STARTEN",
  "error.noGames": "Keine Spiele gefunden.",
  "error.serverConnection": "Verbindung zum Server fehlgeschlagen.",
  "modal.back": "← ZURÜCK",
  "modal.next": "WEITER →",
  "modal.gotIt": "VERSTANDEN",
  "modal.close": "Schließen",
  "modal.dotAria": "Zu Schritt {n}",
  "modal.welcome.badge": "WILLKOMMEN",
  "modal.welcome.title": "Das ist EpicTracker",
  "modal.welcome.body": "Deine {epic}-Bibliothek, kombiniert mit den Spielzeiten von {hltb} — an einem Ort. Sieh, wie lange jedes Spiel deiner Sammlung wirklich dauert — von einem schnellen Story-Durchlauf bis zum Komplettisten. Zwei kurze Schritte und los.",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "SCHRITT 01",
  "modal.step1.title": "Hol deinen Auth Code",
  "modal.step1.body": "Klicke auf den Button {button} oben rechts. Ein neuer Tab öffnet sich mit der JSON-Antwort von Epic Games. Kopiere den Wert des Feldes {field}.",
  "modal.step1.button": "Auth Code holen ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "SCHRITT 02",
  "modal.step2.title": "Lade deine Bibliothek",
  "modal.step2.body": "Füge den Code in das Feld {input} ein und klicke auf {fetch}. EpicTracker lädt deine Spiele und gleicht sie mit HowLongToBeat ab.",
  "modal.step2.input": "auth_code einfügen…",
  "modal.step2.fetch": "Laden",
}

const fr: Dict = {
  "header.getAuthCode": "Obtenir Auth Code ↗",
  "header.placeholder": "Collez votre auth_code…",
  "header.fetch": "Charger",
  "header.loading": "Chargement…",
  "header.help": "Afficher les instructions",
  "header.helpTitle": "Utilisation",
  "header.changeLanguage": "Changer la langue",
  "library.label": "BIBLIOTHÈQUE",
  "library.gamesLoaded": "JEUX CHARGÉS",
  "library.games": "JEUX",
  "library.fetchingPrefix": "Chargement",
  "library.notFound": "Introuvable sur HowLongToBeat",
  "library.timeToBeat": "Temps de jeu",
  "library.mainStory": "Histoire principale",
  "library.mainExtra": "Principale + Extras",
  "library.completionist": "100%",
  "empty.message": "ENTREZ VOTRE AUTH CODE POUR COMMENCER",
  "error.noGames": "Aucun jeu trouvé.",
  "error.serverConnection": "Échec de la connexion au serveur.",
  "modal.back": "← RETOUR",
  "modal.next": "SUIVANT →",
  "modal.gotIt": "COMPRIS",
  "modal.close": "Fermer",
  "modal.dotAria": "Aller à l'étape {n}",
  "modal.welcome.badge": "BIENVENUE",
  "modal.welcome.title": "Découvrez EpicTracker",
  "modal.welcome.body": "Votre bibliothèque {epic}, associée aux temps de complétion de {hltb} — au même endroit. Voyez combien d'heures chaque jeu de votre collection prendra réellement, de la campagne rapide au complétiste. Deux étapes rapides et c'est parti.",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "ÉTAPE 01",
  "modal.step1.title": "Obtenez votre auth code",
  "modal.step1.body": "Cliquez sur le bouton {button} en haut à droite. Un nouvel onglet s'ouvrira avec la réponse JSON d'Epic Games. Copiez la valeur du champ {field}.",
  "modal.step1.button": "Obtenir Auth Code ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "ÉTAPE 02",
  "modal.step2.title": "Chargez votre bibliothèque",
  "modal.step2.body": "Collez le code dans le champ {input}, puis cliquez sur {fetch}. EpicTracker chargera vos jeux et les comparera à HowLongToBeat.",
  "modal.step2.input": "Collez votre auth_code…",
  "modal.step2.fetch": "Charger",
}

const zh: Dict = {
  "header.getAuthCode": "获取 Auth Code ↗",
  "header.placeholder": "粘贴你的 auth_code…",
  "header.fetch": "加载",
  "header.loading": "加载中…",
  "header.help": "显示说明",
  "header.helpTitle": "如何使用",
  "header.changeLanguage": "更改语言",
  "library.label": "游戏库",
  "library.gamesLoaded": "已加载游戏",
  "library.games": "游戏",
  "library.fetchingPrefix": "正在获取",
  "library.notFound": "HowLongToBeat 上未找到",
  "library.timeToBeat": "通关时长",
  "library.mainStory": "主线",
  "library.mainExtra": "主线+支线",
  "library.completionist": "全完成",
  "empty.message": "请输入 AUTH CODE 开始",
  "error.noGames": "未找到游戏。",
  "error.serverConnection": "无法连接到服务器。",
  "modal.back": "← 上一步",
  "modal.next": "下一步 →",
  "modal.gotIt": "知道了",
  "modal.close": "关闭",
  "modal.dotAria": "前往第{n}步",
  "modal.welcome.badge": "欢迎",
  "modal.welcome.title": "认识 EpicTracker",
  "modal.welcome.body": "你的 {epic} 游戏库，搭配 {hltb} 的通关时长 — 全在一处。看看你收藏中的每款游戏到底要花多少小时，从快速通关到全完成。两个简单步骤即可开始。",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "步骤 01",
  "modal.step1.title": "获取你的 auth code",
  "modal.step1.body": "点击右上角的 {button} 按钮。新标签页将打开来自 Epic Games 的 JSON 响应。复制 {field} 字段的值。",
  "modal.step1.button": "获取 Auth Code ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "步骤 02",
  "modal.step2.title": "加载你的游戏库",
  "modal.step2.body": "将代码粘贴到 {input} 输入框，然后点击 {fetch}。EpicTracker 将加载你的游戏并与 HowLongToBeat 对比。",
  "modal.step2.input": "粘贴你的 auth_code…",
  "modal.step2.fetch": "加载",
}

const it: Dict = {
  "header.getAuthCode": "Ottieni Auth Code ↗",
  "header.placeholder": "Incolla il tuo auth_code…",
  "header.fetch": "Carica",
  "header.loading": "Caricamento…",
  "header.help": "Mostra istruzioni",
  "header.helpTitle": "Come usare",
  "header.changeLanguage": "Cambia lingua",
  "library.label": "LIBRERIA",
  "library.gamesLoaded": "GIOCHI CARICATI",
  "library.games": "GIOCHI",
  "library.fetchingPrefix": "Caricamento",
  "library.notFound": "Non trovato su HowLongToBeat",
  "library.timeToBeat": "Tempo di completamento",
  "library.mainStory": "Storia principale",
  "library.mainExtra": "Principale + Extra",
  "library.completionist": "Completista",
  "empty.message": "INSERISCI L'AUTH CODE PER INIZIARE",
  "error.noGames": "Nessun gioco trovato.",
  "error.serverConnection": "Connessione al server fallita.",
  "modal.back": "← INDIETRO",
  "modal.next": "AVANTI →",
  "modal.gotIt": "CAPITO",
  "modal.close": "Chiudi",
  "modal.dotAria": "Vai al passo {n}",
  "modal.welcome.badge": "BENVENUTO",
  "modal.welcome.title": "Ecco EpicTracker",
  "modal.welcome.body": "La tua libreria {epic}, abbinata ai tempi di completamento di {hltb} — in un unico posto. Scopri quante ore richiede ogni gioco della tua collezione, dalla storia principale al completamento al 100%. Due passi rapidi e sei pronto.",
  "modal.welcome.epic": "Epic Games",
  "modal.welcome.hltb": "HowLongToBeat",
  "modal.step1.badge": "PASSO 01",
  "modal.step1.title": "Ottieni il tuo auth code",
  "modal.step1.body": "Clicca sul pulsante {button} in alto a destra. Si aprirà una nuova scheda con la risposta JSON di Epic Games. Copia il valore del campo {field}.",
  "modal.step1.button": "Ottieni Auth Code ↗",
  "modal.step1.field": "authorizationCode",
  "modal.step2.badge": "PASSO 02",
  "modal.step2.title": "Carica la tua libreria",
  "modal.step2.body": "Incolla il codice nel campo {input}, poi clicca {fetch}. EpicTracker caricherà i tuoi giochi e li confronterà con HowLongToBeat.",
  "modal.step2.input": "Incolla il tuo auth_code…",
  "modal.step2.fetch": "Carica",
}

const dicts: Record<Lang, Dict> = { en, pt, es, ja, ru, de, fr, zh, it }

// ── Context ──────────────────────────────────────────────────────────────────
const LANG_KEY = "epictracker.lang.v1"

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null
    if (saved && saved in dicts) return saved
  } catch {}
  const nav = (typeof navigator !== "undefined" ? navigator.language : "en")
    .slice(0, 2)
    .toLowerCase() as Lang
  return (nav in dicts) ? nav : "en"
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const I18nCtx = createContext<Ctx | null>(null)

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m))
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectLang())
  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(LANG_KEY, l) } catch {}
  }
  const t = (key: string, vars?: Record<string, string | number>) => {
    const raw = dicts[lang][key] ?? dicts.en[key] ?? key
    return interpolate(raw, vars)
  }
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>
}

export function useI18n(): Ctx {
  const c = useContext(I18nCtx)
  if (!c) throw new Error("useI18n must be used inside I18nProvider")
  return c
}

// ── format(): split string by {placeholder} tokens into ReactNode parts ──────
export function format(str: string, parts: Record<string, ReactNode>): ReactNode[] {
  return str.split(/(\{[^}]+\})/g).map((seg, i) => {
    const m = seg.match(/^\{([^}]+)\}$/)
    if (m) return <Fragment key={i}>{parts[m[1]] ?? seg}</Fragment>
    return <Fragment key={i}>{seg}</Fragment>
  })
}

// ── Language selector button + dropdown ──────────────────────────────────────
export function LangSelector() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const current = LANGS.find(l => l.code === lang) ?? LANGS[0]

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={t("header.changeLanguage")}
        title={t("header.changeLanguage")}
        style={{
          background: "rgba(88,28,135,0.15)",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: 10,
          height: 38,
          padding: "0 12px",
          color: "#c4b5fd",
          fontFamily: "'Syne', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          backdropFilter: "blur(12px)",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "#f3e8ff"
          e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)"
          e.currentTarget.style.boxShadow = "0 0 16px rgba(124,58,237,0.25)"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = "#c4b5fd"
          e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)"
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>{current.flag}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em" }}>
          {current.code.toUpperCase()}
        </span>
        <span style={{ fontSize: 9, opacity: 0.6, marginLeft: 2 }}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 180,
            background: "rgba(30,15,50,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(167,139,250,0.25)",
            borderRadius: 12,
            boxShadow: "0 12px 40px rgba(13,5,21,0.6), 0 0 24px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            padding: 6,
            zIndex: 60,
            maxHeight: 360,
            overflowY: "auto",
          }}
        >
          {LANGS.map(opt => {
            const active = opt.code === lang
            return (
              <button
                key={opt.code}
                role="option"
                aria-selected={active}
                onClick={() => { setLang(opt.code); setOpen(false) }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "9px 12px",
                  background: active ? "rgba(124,58,237,0.25)" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  color: active ? "#f3e8ff" : "rgba(196,181,253,0.85)",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.background = "rgba(124,58,237,0.12)"
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.background = "transparent"
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{opt.flag}</span>
                <span style={{ flex: 1 }}>{opt.label}</span>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: active ? "rgba(243,232,255,0.7)" : "rgba(196,181,253,0.4)",
                }}>
                  {opt.code.toUpperCase()}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
