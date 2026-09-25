# Das Observatorium — ein Cicada/Notpron-artiges Rätselspiel

Ein kleines, rein statisches Rätselspiel: fünf HTML-Seiten, ein gemeinsames
Stylesheet, keine Backend-Abhängigkeit. Perfekt für GitHub Pages.

## Struktur

```
orakel-puzzle-game/
├── index.html      Intro
├── kapitel1.html    Rätsel 1: Binärcode, versteckt in einem HTML-Kommentar
├── kapitel2.html    Rätsel 2: Spiegelschrift (CSS scaleX(-1))
├── kapitel3.html    Rätsel 3: Morsecode
├── kapitel4.html    Rätsel 4: Logikrätsel (kein Code nötig)
├── finale.html       Alle vier Lösungswörter als Passphrase + ein
│                      verstecktes Base64-Easter-Egg im Quelltext
└── assets/
    └── style.css     Gemeinsames Dossier-Design
```

Jede Kapitel-Seite prüft die Antwort per SHA-256-Hash (`crypto.subtle`),
sodass die Lösung nicht einfach im Klartext im Quelltext steht — im Sinne
von Notpron/Cicada, wo Nachdenken zählt, nicht nur "Ansicht-Quelltext".

## Lösungen (nur für dich, Spoiler)

<details>
<summary>Klicken zum Aufdecken</summary>

- Kapitel 1: `ZEIT` (Binär im HTML-Kommentar: 01011010 01000101 01001001 01010100)
- Kapitel 2: `SPIEGEL` (Text ist per CSS gespiegelt, im Original lesbar)
- Kapitel 3: `SCHATTEN` (Morsecode)
- Kapitel 4: `ECHO` (Logikrätsel)
- Finale: `zeit spiegel schatten echo` (alle vier, per Leerzeichen getrennt, Groß-/Kleinschreibung egal)
- Bonus-Easter-Egg im Quelltext von `finale.html`: Base64-codierte Abschlussnachricht

</details>

## Lokal testen

`crypto.subtle` (für die Hash-Prüfung) funktioniert aus Sicherheitsgründen
**nicht** über `file://`. Starte lokal einen simplen Webserver:

```bash
cd orakel-puzzle-game
python3 -m http.server 8000
```

Dann im Browser `http://localhost:8000` öffnen. Auf GitHub Pages (https)
funktioniert es automatisch, ohne weitere Schritte.

## Eigene Rätsel ergänzen

1. Neue `kapitelX.html` nach dem Muster der bestehenden Seiten anlegen.
2. Antwort-Hash erzeugen:
   ```bash
   python3 -c "import hashlib; print(hashlib.sha256('deinwort'.encode()).hexdigest())"
   ```
3. Den Hash als `CORRECT_HASH` einsetzen und `NEXT_PAGE` auf die nächste Datei zeigen lassen.
4. Fortschrittsanzeige (`.progress`-Punkte) und Verlinkung in den Nachbarseiten anpassen.

## Deployment auf GitHub Pages

Siehe die Schritt-für-Schritt-Anleitung im Chat.