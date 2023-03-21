import page from '../node_modules/page/page.mjs';
import { renderNavigationMiddleware, renderContentMiddelware } from './middlewares/renderMiddleware.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';


page(renderNavigationMiddleware);
page(renderContentMiddelware);

page('/', homeView);
page('/login', loginView);

page.start();