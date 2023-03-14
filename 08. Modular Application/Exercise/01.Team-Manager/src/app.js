
import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { homeView } from "./views/homeView.js";
import { browseView } from "./views/browseView.js";
import { editView } from "./views/editView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { myTeamView } from "./views/myTeamView.js";
import { teamHomeView } from "./views/teamHomeView.js";


const root = document.querySelector('main');

page(middleWare);
page('/', homeView);
page('/index.html', homeView);
page('/login', loginView);
page('/register', registerView);
page('/browse', browseView);
page('/edit/:id', editView);
page('/my-team', myTeamView);
page('/team-home', teamHomeView);

page.start();

function middleWare(ctx, next) {
    //ctx.render = (content) => render(content, root);
   ctx.render = myRender;
    next();
}

function myRender(content) {
    render(content, root);
}
