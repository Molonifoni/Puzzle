# Das Observatorium — Notpron-artiges Rätselspiel (schwere Fassung)

Rein statisches Rätselspiel ohne jede Bedienoberfläche: keine Formulare,
keine Richtig/Falsch-Rückmeldung, keine Fortschrittsanzeige, keine Links
zurück. Die Lösung eines Rätsels ist der Dateiname der nächsten Seite —
man muss ihn selbst in die Adresszeile eintippen. Findet man ihn nicht,
gibt es nur eine ganz normale 404-Seite, keinen Hinweis.

## Struktur & Kette

```
index.html                        Einstieg. Der Link ins Spiel ist als
                                   normaler Fließtext getarnt (kein Button).
  → empfang.html                  Binärcode, aufgeteilt auf zwei
                                   unsichtbare (display:none) Divs an
                                   getrennten Stellen im Quelltext.
      → zeit.html                 Gespiegelter Satz (CSS scaleX(-1)),
                                   ergibt entspiegelt einen Rätselsatz,
                                   dessen Antwort erst noch erschlossen
                                   werden muss.
          → spiegel.html          Morsecode, aufgeteilt auf zwei
                                   Off-Screen-Spans (position:absolute;
                                   left:-9999px), umrahmt von einem
                                   thematischen Rätseltext.
              → schatten.html     Reines Logikrätsel, ohne Frageform
                                   ("Was bin ich?") formuliert.
                  → echo.html     Letzte Zwischenstation. Sehr vorsichtiger
                                   Hinweis, dass die vier gefundenen Worte
                                   am Ende zusammengehören.

Ziel: zeitspiegelschattenecho.html
      (alle vier Lösungswörter aneinandergehängt, kleingeschrieben,
       ohne Trenner — muss von Hand in die Adresszeile getippt werden)
```

`assets/style.css` liefert das gemeinsame Dossier-Design. Die CSS-Klassen
heißen bewusst neutral (`.t-2`, `.t-7`, `.t-0`) statt beschreibend, damit
das Stylesheet selbst nichts über die Mechanik verrät.

## Lösungen (nur für dich, Spoiler)

<details>
<summary>Klicken zum Aufdecken</summary>

- `empfang.html`: Binär `01011010 01000101 01001001 01010100` → **ZEIT** → weiter zu `zeit.html`
- `zeit.html`: gespiegelter Satz "IN MIR SIEHST DU NIE MICH SELBST, NUR DICH, SEITENVERKEHRT" → Antwort **SPIEGEL** → weiter zu `spiegel.html`
- `spiegel.html`: Morse `... -.-. .... .- - - . -.` (+ Schatten-Thematik im Text) → **SCHATTEN** → weiter zu `schatten.html`
- `schatten.html`: Logikrätsel (wiederholt Schall, ohne zu sprechen) → **ECHO** → weiter zu `echo.html`
- `echo.html`: kein weiteres Rätsel, nur der Hinweis, alle vier Worte zusammenzusetzen
- Finale: `zeitspiegelschattenecho.html`
- Bonus im Quelltext von `zeitspiegelschattenecho.html`: Base64-Kommentar (unkommentiert, nicht erwähnt)

</details>

## Lokal testen

Reines HTML/CSS, kein JavaScript mehr nötig für die Rätsellogik — funktioniert
auch direkt über `file://`. Ein lokaler Server ist trotzdem praktisch:

```bash
cd orakel-puzzle-game
python3 -m http.server 8000
```

## Eigene Rätsel ergänzen

1. Neue Seite nach dem Muster der bestehenden anlegen — keine Formulare,
   keine erklärenden Absätze, keine Fortschrittsanzeige.
2. Den Lösungsbegriff als Dateinamen der nächsten Seite verwenden
   (klein geschrieben, `.html`-Endung).
3. Versteckte Inhalte über `display:none` oder Off-Screen-Positionierung
   einbauen, nie über HTML-Kommentare mit Erklärtext — die verraten zu viel.
4. Wenn ein Rätsel eine Antwort direkt ausgeben würde, stattdessen einen
   zweiten Schritt einbauen (erst dekodieren, dann die Antwort erschließen).

## Deployment auf GitHub Pages

Siehe die Schritt-für-Schritt-Anleitung im Chat (unverändert gültig).
