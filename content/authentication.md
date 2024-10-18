# Autentisering

Till denna applikation har autentisering lagts till i backenden och sedan har även samtliga av alla routes till backend skyddats m.h.a ett middleware som kollar om användaren faktiskt är autentiserad.

## Uppsättning

Vi använder oss av [Passport JS](https://www.passportjs.org/) tillsammans med [JWT](https://jwt.io/) för att säkerställa att inloggningar sker på ett säkert sätt.

Då inloggningen sker mot vårt backend som är uppsatt i [MongoDB Atlas](https://www.mongodb.com/) måste användare först ha registrerat sig i våran applikation innan de faktiskt kan logga in. Kollektionen som vi använder oss av heter `JSRAMVERK` och sedan finns då ett dokument för `users` och ett för `dokument`.

De ser ut på följande sätt:

```
users:{
    username: string
    password: string 
}

dokument:{
    title: string
    content: string
    contributors: array
    comments: array
    created_at: date
}
```
## Funktionalitet

Det börjar med att en användare får registrera sig i våran applikation, lösenordet hashas med hjälp av paketet `bcryptjs` och sedan skickas användarnamn och det krypterade lösenordet till våran databas. När användaren sedan loggar in och autentisering lyckas så signas ett `JWT` token tillsammans med ett delat lösenord som är fördinierat i en .env-variabel, token som skickas tillbaka sparas i localstorage i webbläsaren på klienten (detta görs i frontend componenten för protected routes) så att de inte behöver skriva om lösenordet. I localstorage kan vi även hitta användarnamnet på vem som är inloggad tillsammans med då ett token.

Om användaren inte lyckas autentisera sig så får hen inte tillgång till våran applikation, detta då samtliga routes är skyddade via ett middleware som dubbelkollar så att token är giltigt och tillhör en viss användare.

Samtliga token som vi utfärdar via våran applikation har ett utgångdatum på 1h.