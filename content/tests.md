# Tester

För att testa koden i Frontend för det här projektet så har Jest använts som testing ramverk. Genom användandet av Jest i REACT-applikationen kan man försäkra sig om att koden levererar det resultat som förväntats. Det här sker genom att kolla så att HTML fungerar på tänkt sätt samt genom att efterlikna användar-input. Det här sker genom användandet av verktyget `@testing-library/react` där element renderars i en tillfällig browser för att testa så att allt fungerar.  

## Utförande

Genom att använda kommandot `npm test` i projektets yttersta mapp så körs tester för samtliga komponenter i projektet. 

De komponenter som testas är:

- App
- Document
- Login
- NewDocument
- Registration
- Header
- Footer

Testerna ser till så att den förprogrammerade HTML finns med vilket intygar på att programmet fungerar som förväntat. Det genomförs även tester som simulerar en användare för att därigenom testa programmets flöde och att HTML-element uppdateras därefter. 

De här sker till exempel genom att testa så att formulär och input-fält renderas korrekt eller genom att testa så att programmet reagerar på rätt sätt då en användare genomför en knapptryckning. 



