# Kommentarer

Användaren har möjlighet att markera delar av texten i dokumentet som önskas kommenteras på. Den delen av texten som markerades kommer då sparas ner som en del av kommentaren. Användaren får möjlighet att skriva en kommentar till den markerade texten och efter att kommentaren har lagts till så kommer den delen av texten som kommentaren hänvisas till lysa up/markeras vid val av kommentar. 

## Utförande

För att skapa och spara ner kommentarer används `useState` för att hålla reda på den utvalda/markerade texten. Därefter används `useEffect` för att lysa upp/markera texten då användaren väljer att titta på kommentaren (genom att hålla muspekaren över kommentaren). Det här kan på så visa hänvisa till vilken del av texten som kommentaren tillhör, vilket underlättar vid redigering av text. 

Programmet behandlar texten som markerades i dokumentet och förknippar det sedan med den skrivna kommentaren. För att hitta texten som markerats används Regex-uttryck. Därefter så läggs den markerade texten i en `<mark>` för att på så sätt kunna applicera färg (i det här fallet gul) då kommentaren önskas lysas upp/markeras. För att dynamisk kunna applicera den här funktionalitet används `dangerouslySetInnerHTML`, för att på så sätt kunna bibehålla texten i dokumentet utan förändringar samtidigt som texten lyser upp/markeras. 

När en kommentar skapas läggs även en tillhörande knapp till, dvs en `<button>`. Den här knappen har ett `onClick-event` som tillåter att kommentaren raderas vid användning av nämnd knapp, genom att en funktion triggars.
