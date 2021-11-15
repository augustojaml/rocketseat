import { app } from './app';

app.listen(process.env.APP_PORT, () => console.log(`Server running ${process.env.APP_URL} 🖥`));
