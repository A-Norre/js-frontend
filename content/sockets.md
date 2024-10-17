# Sockets

I detta projekt har [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) implementerats för att tillåta realtidsprogrammering så att flertalet användare som ansluter till samma dokument kan se ändring i realtid likt google docs.

## Utförande

Detta har möjliggjorts genom npm paket för websockets och IO, våran backend drar igång en http-server som lyssnar på inkommande socket anslutningar på http://localhost:3030, anslutningarna delas in i rum baserade på vilket id dokumenten som de öppnat har, detta för att inte göra det möjligt att all trafik skickas ut till alla anslutna utan enbart till de rummen det gäller.

Medan socket servern körs i backend så ansluter användarna till backend via frontend, dokumentets id är som sagt det som skickas med när de ansluter för att dela upp de olika användarna i korrekt rum.

Nedan visar bild på hur det ser ut i frontend när man document.jsx:

```
useEffect(() => {
    // Connecting to the server
    const newSocket = io(`http://localhost:3030`); 

    // Sending the chatroom ID to the server
    newSocket.emit('joinRoom', id); 
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);
```

När användaren sedan utför ändringar i titel eller innehåll i ett dokuemnt så registreras detta via en `onChange` funktion (kan ses som eventlyssnare i JS), som då skickar med förändringen till backend som snappar upp det via lyssnare och sedan skickar ut samma information till alla anslutna användare.
