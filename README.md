# AndrijaDjokicPortfolio
Publicerad sida: https://andrijadjokic07-png.github.io/AndrijaDjokicPortfolio/

1. Från skiss till kod

Jag började med att dela upp varje sida i sektioner (header, innehåll, footer) och sedan varje sektion i mindre delar. Mitt sätt att tänka i frontendprojekt är att varje del ska vara antingen en rad eller en kolumn, så att jag kan använda display: flex och hålla sidan enkel. Jag byggde först mobillayouten och lade till desktop efteråt.

Det svåraste att översätta var gradienten: texten i loggan och mitt namn samt ringen runt profilbilden. Jag hade inte skrivit linear-gradient förut och fick hjälp med att förstå hur det görs.

2. Semantik
header, nav (med aria-label), main och footer för sidans struktur.
Navigeringen och de sociala ikonerna är ul/li, eftersom de är listor med länkar.
En h1 per sida, därefter h2/h3 utan att hoppa över nivåer (till exempel About: h1 "About Me", h2 "Work Experience", h3 för varje jobb).
section för grupperat innehåll och article för varje jobb eller utbildning, eftersom de hänger ihop och går att förstå var för sig.
Hamburgaren är en riktig button.

Jag landade ändå i några div där jag inte hittade något bättre element: #appnav, #profilbild, .experienceinfo och .linkone/.linktwo. #profilbild hade kunnat vara en figure.

3. Layout

Jag använde Flexbox överallt, eftersom varje del av designen är antingen en rad eller en kolumn. Jag använde flex-wrap i tech stack så att ikonerna radbryts på mobil. Jag använde inte Grid. Projektkorten hade kunnat vara ett grid, men Flexbox räckte och jag ville ha en enda konsekvent metod.

CSS:en är mobile first: bas-stilarna är mobillayouten och desktop läggs till med en enda @media (min-width: 1000px). Jag lade brytpunkten vid 1000 px, och inte vid skissens 600 px, eftersom mina textblock på desktop är 708 px breda med stora vänstermarginaler. I testet gav de horisontell scroll under cirka 980 px. Mellan 600 och 1000 px används mobillayouten så att en iPad också kan visas bra.

4. Tillgänglighet

Det här har jag gjort:

Alla bilder har alt. Dekorativa ikoner har alt="".
Synlig fokusmarkering med a:focus-visible, button:focus-visible (3 px lila kantlinje).
aria-current="page" på den aktuella länken och en beskrivande aria-label på länkar som bara har en ikon.
En unik title på varje sida och lang="en".

Så testade jag:

Enbart tangentbord (Tab genom alla sidor): När jag tabbar genom sidorna får bara de interaktiva elementen fokus, alltså länkarna och knappen i headern (navigeringslänkarna, de sociala ikonerna och hamburgerknappen), och alla får en tydlig lila kantlinje. På sidan Projects får även länkarna "Live preview" och "View Code" samma lila kantlinje. Fokusordningen följer sidans ordning uppifrån och ned.
W3C-validatorn på alla sidor: "Document checking completed. No errors or warnings to show. Used the HTML parser. Externally specified character encoding was UTF-8." Total execution time 17 milliseconds.
Kontrast (WebAIM Contrast Checker): Jag testade färgerna från skissen. Grå text 
#A7A7A7 på vitt ger 2,41:1, rosa 
#FC03DB ger 3,4:1 och den gröna etikettens text 
#018C0F på 
#D7FFE0 ger 4,05:1. Alla tre ligger under AA-kravet 4,5:1 för liten text. Övriga textfärger klarade kravet. Eftersom uppgiften säger att utseendet ska följa skissen behöll jag färgerna.

Det här återstår:

Färgerna med låg kontrast (se ovan). Jag skulle göra dem mörkare, till exempel 
#767676 och 
#B800A0.
Hamburgerknappen öppnar eller stänger ingenting ännu, eftersom JavaScript ligger utanför den här uppgiften.
Flera länkar är platshållare (href="#").
5. Användbarhet

Principer jag känner igen i Pawans design: en tydlig visuell hierarki (stor rubrik, sedan mindre text), mycket luft, samma gradient som accent för namn och logga, och likadana kort för projekten. Navigeringen är enkel (fem länkar) och det är lätt att se vilken sida man är på.

Det här hade jag gjort annorlunda: den grå texten är för svag för att läsa. På kontaktsidan hade jag gjort e-postadressen och telefonnumret klickbara i stället för vanlig text, och helst ersatt adressen med ett formulär (med kopplade label). Skälet är användbarhet: med en mailto:-länk, ett formulär eller en tel:-länk tar det ett tryck i stället för flera steg (markera, kopiera, byta app, klistra in). Det minskar risken för fel och passar särskilt bra på mobil, där man har små skärmar och ofta vill ringa direkt. Formuläret kräver en tjänst som tar emot meddelanden, så det ryms inte i den här uppgiften men det är nånting jag personligen skulle göra för att göra webbsidan bättre för User Experience.

6. Styrkor och brister

Styrkor: samma HTML fungerar på både mobil och desktop, färgerna ligger i CSS-variabler och strukturen är konsekvent på alla sidor.

Brister: allt ligger i en enda style.css i stället för base.css plus sidspecifika filer. Några klassnamn har stavfel (logocontianer, secondsecion, phonenummber) och jag blandade svenska och engelska i profilbild. Med mer tid skulle jag rätta kontrasten, byta ut platshållartexter och länkar och dela upp CSS:en.

7. AI-verktyg

Jag använde Claude som hjälp med uppgifter som jag har förståelse och kunskaper för att göra, men som tar tid. Till exempel: göra om CSS-filen från desktop-first till mobile-first. Hela poängen med detta uppgiften är att byta värde på main css-klasser och id:n från anpassningen för desktop till anpassningen för mobilen. Jag kunde gå genom koden och byta width, flex direction och storlek på alla element manuellt men det skulle ta extra tid. Nästa gång kommer jag att ha bättre koll på kraven för uppgiften. Andra uppgifter som jag har använt AI för är att rätta min kod och hjälpa mig göra vissa delar som jag gör för första gången. Till exempel är linear-gradient något som jag inte hade skrivit manuellt förut, så det var nytt för mig. Claude skrev ut för mig hur det skulle se ut och jag skrev det manuellt så att jag kan komma ihåg det lättare.

Det här ändrade jag i det som genererades: jag behöll min egen kodstil (nästlade selektorer, flex-egenskaper och procent, inte gap), justerade textstorlekar och ikonstorlekar själv, rättade layouten på projektlänkarna (justify-content), ändrade hero-textens storlekar på desktop och testade allt i webbläsaren själv.