# Importazione massiva di opere

1. Copia qui dentro le foto (jpg, png, heic, webp). Un file = un'opera.
   Se un'opera ha più foto, mettile in una sottocartella con il nome dell'opera:
   `import/Seme di fava 2020/1.jpg`, `import/Seme di fava 2020/2.jpg` …
2. Dai ai file un nome parlante: il titolo, e se li sai l'anno e le misure.
   Esempio: `Germoglio 2021 60x35x15.jpg` → titolo "Germoglio", anno 2021, dimensioni 60×35×15 cm.
3. (Facoltativo) Compila `import/schede.csv` con una riga per file per aggiungere tecnica, materiale, luogo, descrizione…
   Le colonne riconosciute sono: file, titolo, titolo_en, categoria, anno, luogo, materiale, tecnica, dimensioni, collezione, descrizione, descrizione_en
4. Dal terminale, nella cartella del progetto:

       npm run importa -- --categoria pittura

   Per importare da un'altra cartella senza copiare niente qui dentro:

       npm run importa -- --da "/percorso/della/cartella" --categoria pittura --codice P --ordine 1000

   Le categorie possibili: scultura, opera-pubblica, pittura, disegno, installazione, performance.
   Aggiungi `--bozza` per importare tutto come bozza (non visibile finché non lo pubblichi dal pannello).
5. Gli originali restano dove sono. Dentro `content/media/opere/<nome-opera>/` finisce una copia leggera e per ogni opera nasce una scheda
   `content/opere/<nome-opera>/index.yaml`, che puoi completare dal pannello (`npm run dev` → /keystatic).
