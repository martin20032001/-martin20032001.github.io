Die Dateien müssen auf irgendeinem Server abgelegt werden (Bei VSC gibt es die Live Server Extension), ansonsten funktioniert die vewrwendetete face-api.js nicht. Andernfalls ist die Webseite über https://martin20032001.github.io/html/index.html erreichbar.
Wichtig: Es funktioniert nur mit Google Chrome und Microsoft Edge, nicht mit Firefox (mit anderen Browsern nicht getestet)
Struktur der Webseite:
index.html:
	Funktionalität: Diese Seite dient als Startpunkt und bietet Zugang zu den verschiedenen Funktionen des Projekts: Gesichtsverfolgung, Emotionstracking und das Emotionsspiel.
	Benutzeroberfläche: Es gibt Schaltflächen, die zu den einzelnen Funktionen führen: "Track Your Face", "Track Your Emotions" und "Emotion Game". Zusätzlich gibt es einen Informationsbutton.
	Technische Anforderungen und Hinweise: Die Anwendung ist optimiert für Google Chrome und funktioniert möglicherweise nicht auf Apple-Geräten.
track.html:
	Funktionalität: Benutzer können die Kamera ihres Geräts aktivieren, um Gesichter zu verfolgen. Ein "Track"-Button initiiert den Gesichtserkennungsprozess.
	Benutzeroberfläche: Es gibt Schaltflächen für "Start" und "Track" sowie eine Videoanzeige, die die Kameraaufnahme zeigt. Zudem gibt es einen "Zurück"-Button und eine Info-Schaltfläche.
showemotions.html:
	Funktionalität: Benutzer können die Anwendung starten, um Emotionen über ihre Gesichtsausdrücke zu erfassen. Dies geschieht über die Kamera des Geräts.
	Benutzeroberfläche: Es gibt Schaltflächen und Anzeigen, die verschiedene Emotionen wie "neutral", "glücklich", "überrascht", "wütend", "traurig" und "angewidert" repräsentieren.
emotionGame.html:
	Funktionalität: Das Spiel verwendet Gesichtsausdrücke als Steuerung. Die Richtungen "aufwärts", "abwärts", "links" und "rechts" werden durch die Emotionen "glücklich", "wütend", "überrascht" und "angewidert" gesteuert.
	Spielmechanik: Es handelt sich um eine Variante des klassischen Snake-Spiels, bei dem der Spieler einen wachsenden "Schwanz" steuert und "Äpfel" sammeln muss, ohne sich selbst zu fangen.
	Benutzeroberfläche: Es gibt Schaltflächen für Start und Informationen, sowie ein Canvas-Element für das Spiel.












