import App from '@/app';
import IndexRoute from '@routes/index.route';
import AdminRoute from '@routes/admin.route';
import validateEnv from '@utils/validateEnv';
import '@databases/mongo';
import '@databases/firebase';
import http from 'http';
import WallpaperRoute from '@routes/wallpaper.route';
import { logger } from '@utils/logger';
validateEnv();

const app = new App([new IndexRoute(), new AdminRoute(), new WallpaperRoute()]);

const server = http.createServer(app.getServer());

server.listen(app.port, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${app.env} =======`);
  logger.info(`🚀 App listening on the port ${app.port}`);
  logger.info(`=================================`);
});

export default server;
