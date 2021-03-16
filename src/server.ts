import app from './app';

app.listen(process.env.PORT_SERVER || 3333, () => console.log("The server is run"));
