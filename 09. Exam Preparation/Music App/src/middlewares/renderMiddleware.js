import { render, TemplateResult} from "../../node_modules/lit-html/lit-html.js";
import { navigationView } from "../views/navigationView.js";

const headerElement = document.querySelector('.header-navigation');
const contentElement = document.querySelector('#main-content');

const renderContent = (TemplateResult) => {
    render(TemplateResult, contentElement);
}

export const renderNavigationMiddleware = (ctx, next) => {


    render(navigationView(ctx), headerElement);
    next();
}

export const renderContentMiddelware = (ctx, next) => {
    ctx.render = renderContent;
    next();

}
