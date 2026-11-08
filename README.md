# Portfolio – Andrija Djokic (u02)

Publicerad sida: https://andrijadjokic07-png.github.io/AndrijaDjokicPortfolio02/

Betygsambition: **VG**. De fyra VG-punkterna finns under rubrikerna 4 (tillgänglighet), 7 (datahämtning som inte går sönder), 6 (kodkvalitet) samt 8 och 9 (självständighet och AI-granskning).

## 1. Datans väg (ett anrop till GitHub)
När "Projects.html" laddas startar "js/main.js" temat och menyn, och "js/pages/projects.js" startar projektlistan. Den visar först "Loading projects from GitHub…" och anropar "loadRepos" i "js/api/github.js". Den skickar ett "GET" till "https://api.github.com/users/andrijadjokic07-png/repos?sort=pushed&per_page=100" via "fetchJson" i "js/api/http.js", med timeout på 8 sekunder ("AbortSignal.timeout"). Svaret görs om till JSON. Är det en tom lista visas ett meddelande, annars rensas statusen och "renderProjects" fyller en mall ("template") för varje repo. Filtret byggs sist av de språk som finns i svaret.

## 2. Två datakällor
"data/cv.json" har jag skrivit själv och den ligger på samma server som sidan, så jag litar på innehållet. Filen kan ändå saknas eller vara trasig, så den går genom samma "fetchJson" och samma felhantering. GitHub-svaret styr jag inte över. Det kan vara långsamt, felaktigt, begränsat (60 anrop per timme utan nyckel) eller sakna fält: "description" kan vara "null". Därför har jag en egen felklass "HttpError" med typerna "timeout", "network", "ratelimit", "http" och "parse", och "describeError" gör om dem till begripliga meddelanden.

## 3. DOM och händelser
Jag fyller ut markup med "cloneNode(true)" på en "template", sätter text med "textContent" (aldrig "innerHTML") och byter innehåll med "replaceChildren". Händelser:
- "click" på temaknappen och hamburgaren ("theme.js", "nav.js");
- "click" på filtret ("ui/filter.js") med *event delegation*: en lyssnare på "fieldset" i stället för en per knapp, och "target.closest('button')" hittar rätt knapp;
- "keydown" (Escape) stänger menyn på mobil och flyttar fokus till hamburgaren;
- "click" på "Try again" ("{ once: true }").

Inga inline-attribut används.

## 4. Markup jag inte skrivit för hand (tillgänglighet)
Designen ligger kvar i HTML-mallarna och JavaScript fyller bara i texten, så semantiken är den jag valde själv: "article", "ul"/"li", "time", "a" för länkar och "button" för klick. Rubriknivåerna följer h1 → h2 → h3. Filtret ligger i en "fieldset" med "legend" och knapparna har "aria-pressed". Hamburgaren har "aria-expanded" och "aria-controls", och temaknappen "aria-pressed". Texten "Showing X of Y projects" och laddning har "role="status"", fel har "role="alert"". Länkarna "View Code" och "Live" har "aria-label" med projektnamn. Fokus syns med ":focus-visible" (3 px ram, lila). Om "Try again" trycks med tangentbord hamnar fokus kvar ("lib/status.js").

**Så testade jag:**
- **Lighthouse (Accessibility, mobil):** 100 på startsidan i mörkt läge och 100 på Projects i ljust läge. 
- **Kontrast:** Lighthouse räknar WCAG AA för all text. Färgerna är semantiska variabler, så båda paletterna är kontrollerade.
- **Tangentbord:** Fokus syns på alla knappar och länkar (dark/light mode, hamburgaren och knappar och länkar på andra sidor, till exempel på Projects). Jag testade med bara tangentbord: Tab går igenom alla element i logisk ordning, Enter på filterknapparna filtrerar listan och Escape stänger menyn på mobil.
- **W3C-validatorn:** 0 fel på alla sidor.
- **Konsolen:** inga fel.

## 5. Temaväxlingen
Alla färger ligger som semantiska CSS-variabler ("--pagebackground", "--surface", "--textcolor", …) i ":root". Klassen "dark" på "html" byter värdena i ":root.dark". JavaScript gör bara "classList.toggle('dark')" och sparar valet i "localStorage" (i "try/catch"). Utan sparat val följs "prefers-color-scheme". Ett litet skript i "<head>" ("theme-init.js") sätter klassen innan sidan ritas så det inte blinkar vitt. Hade färgerna legat i JavaScript hade jag fått hitta och skriva om varje element, och kontrasten hade inte kunnat kontrolleras på ett ställe.

## 6. Modern JavaScript och kodkvalitet
Koden är uppdelad i moduler med ett ansvar var: "api/" (hämta), "render/" (fylla mallar), "ui/" (filter), "pages/" (knyta ihop en sida) och "lib/" (delad statusvisning). Inga globala variabler, "const"/"let" överallt. Konkret: i "render/projects.js" använder "fillProject" destructuring med omdöpning ("html_url: url") och "??" för "null"-värden. I "about.js" hämtas "const { work, education }" direkt ur CV-datan. I "ui/filter.js" ger "[...new Set()]" unika språk, och spread används för att bygga knapparna. "async"/"await" används vid alla anrop. "about.js" och "projects.js" delar "lib/status.js" och "renderEntries"/"renderProjects" delar mallmönstret, så laddning, fel och tomt läge inte upprepas.

## 7. När det inte går som tänkt
- **Långsamt:** "Loading projects from GitHub…" visas. Efter 8 sekunder avbryts anropet och ett felmeddelande visas.
- **Fel (offline, 500, rate limit, trasig JSON):** ett tydligt meddelande på sidan, olika text per typ, och en "Try again"-knapp.
- **Tom lista:** "There is no CV information to show yet." / ett motsvarande meddelande för projekt.
- **CV-filen saknas:** samma felhantering på About.

Jag testade i DevTools med Offline och Slow 3G.

## 8. Styrkor och brister
Styrkor: tydlig modulindelning, tre lägen hanteras (laddar, fel, tomt) och alla färger finns på ett ställe. Det jag skulle bygga om: (1) anropet görs vid varje sidladdning. Jag skulle spara svaret i "sessionStorage" med tidsstämpel, så sidan fungerar även när rate limit är nådd. (2) "per_page=100" ger bara de 100 senaste repona. Jag skulle läsa "Link"-headern och hämta fler sidor. (3) Några klass- och id-namn har stavfel och en del texter är fortfarande platshållare. (4) Allt CSS ligger i en enda fil.

## 9. AI-verktyg
Jag har använt Claude som ett verktyg för att få information när jag skriver ny kod som jag fortfarande har problem med, till exempel import och export, och kod som jag stöter på för första gången. Jag har också använt det för att hitta fel i min kod och för att hela tiden kontrollera att jag följer kriterierna för att nå ett godkänt resultat. I förra uppgiften (u01) missade jag ett av de viktiga kriterierna (mobile first CSS), vilket jag upptäckte först nära inlämningsdatumet, så jag fick agera snabbt. Jag läste igenom koden innan jag använde den och testade den i webbläsaren. Jag valde att använda template i stället för createElement för att behålla min egen design och inte använda JS få mycket.