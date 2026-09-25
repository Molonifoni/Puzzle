# Das Observatorium — schwerere Puzzle-Fassung

Ein statisches, mehrschichtiges Browser-Rätselspiel für GitHub Pages.

Die Idee bleibt bewusst „Notpron-artig“: Die Lösung einer Stufe ist nicht als Button markiert. Meist ist die Antwort ein Dateiname, der manuell in der Adresszeile aufgerufen werden muss.

## Neue Rätselkette

```text
index.html
  ↓ Adresse
empfang.html
  ↓ ASCII + Caesar-ähnlicher Schritt (-3)
turm.html
  ↓ Caesar (+4 beim Verschlüsseln, also -4 beim Lösen)
spiegel.html
  ↓ Morse → anschließend Reihenfolge spiegeln
schatten.html
  ↓ Logikrätsel mit vier Aussagen
echo.html
  ↓ DOM/Elementbaum + rückwärts + A1Z26
quelltext.html
  ↓ Quelltext/Metadaten + Hex
bewusst nicht existierender Pfad
  ↓ GitHub Pages 404
404.html
  ↓ Local Storage
KONSOLE
  ↓ Entwicklerkonsole + Hex
harmonie.html
```

## Was schwieriger geworden ist

Die Stufen verwenden unterschiedliche Denkmodelle, damit man nicht nach einem einzigen wiederholten Muster durch das Spiel kommt:

- Zahlen als ASCII-Zeichen, danach eine Verschiebung
- Caesar-Verschlüsselung
- Morsecode, dessen **Reihenfolge** zusätzlich gespiegelt werden muss
- Logikrätsel mit genau zwei wahren Aussagen
- 4th-Wall-Rätsel über DOM/Elementbaum
- Quelltext-/Metadaten-Rätsel
- absichtlicher Sprung in eine echte 404-Seite
- Rätsel über `localStorage`
- Entwicklerkonsole als letzte technische Ebene
- Hexadezimalcode als letzter Schritt

## Lokal starten

Für die normale Rätselkette reicht ein HTTP-Server. Da die 404-Stufe auf eine echte benutzerdefinierte Fehlerseite angewiesen ist, liegt zusätzlich `dev_server.py` bei.

```bash
python3 dev_server.py
```

Danach:

```text
http://localhost:8000/
```

## GitHub Pages

Den Inhalt dieses ZIPs in das Root-Verzeichnis eines GitHub-Repositories entpacken und anschließend GitHub Pages für den betreffenden Branch aktivieren.

Wichtig: Die Datei `404.html` muss im veröffentlichten Root liegen, damit GitHub Pages sie als benutzerdefinierte Fehlerseite verwenden kann.

## Dateien

```text
index.html
empfang.html
turm.html
spiegel.html
schatten.html
echo.html
quelltext.html
404.html
harmonie.html
assets/
  game.js
  style.css
README.md
dev_server.py
```

## Spoiler — komplette Lösung

<details>
<summary>SPOILER AUFKLAPPEN</summary>

### 1. Empfang

```text
87 88 85 80
```

ASCII ergibt:

```text
W X U P
```

Drei Stellen zurück im Alphabet:

```text
T U R M
```

→ `turm.html`

### 2. Turm

```text
WTMIKIP
```

Vier Stellen zurück:

```text
S P I E G E L
```

→ `spiegel.html`

### 3. Spiegel

Morse:

```text
-.  .  -  -  .-  ....  -.-.  ...
```

Direkt gelesen:

```text
NETTAHCS
```

Die Anweisung verlangt zusätzlich das Spiegeln der Reihenfolge:

```text
SCHATTEN
```

→ `schatten.html`

### 4. Schatten

Es gibt vier Schalter. Testet man A, B, C und D jeweils als richtigen Schalter und prüft die beiden Regeln, bleibt nur A übrig.

A trägt den Namen:

```text
ECHO
```

→ `echo.html`

### 5. Echo

Im DOM steckt:

```text
5 12 12 5 21 17
```

Rückwärts:

```text
17 21 5 12 12 5
```

A1Z26:

```text
Q U E L L E
```

→ `quelltext.html`

### 6. Quelltext

Im `<meta>`-Element steht:

```text
34 30 34
```

Als Hex:

```text
0x34 = 4
0x30 = 0
0x34 = 4
```

→ `404`

Es soll absichtlich ein nicht existierender Pfad aufgerufen werden, damit GitHub Pages `404.html` ausliefert.

### 7. 404

Die Seiten sammeln über `assets/game.js` im Local Storage die Buchstaben:

```text
K O N S O L E
```

Der Speicherwert lautet:

```text
orakel.memory.v2 = KONSOLE
```

→ Entwicklerkonsole öffnen.

### 8. Konsole

Wenn der gespeicherte Wert korrekt ist, schreibt die Seite:

```text
48 41 52 4D 4F 4E 49 45
```

Als Hex-ASCII:

```text
HARMONIE
```

→ `harmonie.html`

### 9. Ende

`harmonie.html` ist die Endseite.

</details>

## Hinweis für Weiterentwicklung

Die zentrale Mechanik für die 4th-Wall-Stufen liegt in `assets/game.js`. Sie absichtlich ruhig gehalten; nur die 404-Stufe schreibt die entscheidende Konsolennachricht.

Weitere Stufen sollten möglichst nicht erneut nur „Code entschlüsseln“ verwenden. Gute nächste Ebenen wären z. B. HTTP-Header, Bild-Metadaten, Unicode-Normalisierung, Zeitstempel, Browser-Titel oder ein Rätsel, bei dem der Spieler eine zuvor scheinbar nebensächliche Entscheidung später wieder benötigt.
