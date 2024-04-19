import app from './app';
import { connectDB } from './lib/db';
const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
});
