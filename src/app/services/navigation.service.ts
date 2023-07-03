import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Logger, getUrlData, updateUrl } from './utils';
import { NgxLazyLoaderService } from '@dotglitch/ngx-lazy-loader';

const { log, warn, err } = Logger("NavigationService", "#ff9800");

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    activePage$ = new BehaviorSubject<{ id: string, args: { [key: string]: any; }; }>(null);

    constructor(
        private readonly lazyLoader: NgxLazyLoaderService
    ) {
        window.onhashchange = () => this.restoreNavigation();
        // TODO: This will fix history rewind?
        // window.onpopstate = this.restoreNavigation.bind(this);
        // Restore our previous navigation.
        this.restoreNavigation();
    }

    hasInitialized = false;
    private restoreNavigation(clientChange = false) {

        const data = getUrlData();


        // @ts-ignore (regex)
        const sid = location.hash.match(/[?&]id=(?<id>[^&]+)/)?.groups?.id;
        const id = sid?.length > 5 ? sid : parseInt(sid);
        const hash = location.hash.split("?")[0];

        // If the URL is imprecisely set, we restore it to the landing page
        if (
            [null, "", "#", '/#', '/#/', '/#?'].includes(location.hash) ||
            !hash ||
            hash.length < 4 ||
            !location.hash.startsWith("#") ||
            !this.lazyLoader.isComponentRegistered(hash)
        )
            return this.onMenuItemNavigate("#/Landing");

        this.onMenuItemNavigate({
            id: -1,
            parent: -2,
            url: location.hash
        });
        return null;
    }

    private async onMenuItemNavigate(options: any, navigate = true): Promise<void> {
        let data = options;


        const targetUrl = typeof data == "string" ? data : data.url;

        // Check if we need to load a local Angular component. (begins with #)
        const next = (targetUrl).slice(1);

        // Parse query params from URL and 'resolve' the values.
        const params = (targetUrl).split(/[?&]/).slice(1)
            .reduce((pars, par) => {
                const [key, value] = par.split("=");
                const decoded = decodeURIComponent(value);
                pars[key] = decoded;
                return pars;
            }, {});

        const target = next.split("?")[0].slice(1);

        log(`Navigate to '${target}'`, params);

        // TODO: window ref
        this.loadAngularPage({
            target: target,
            item: params
        });
    }

    private loadAngularPage({ target, item, query = {}, clear = false }) {
        if (!target || target == undefined || target == "undefined")
            debugger;
        return new Promise<void>((res, rej) => {
            const def = {
                id: 0,
                parent: 0,
                area: "root",
                shortname: target
            };

            window['selectedNavigation'] = item || def;

            updateUrl(target, item);

            this.activePage$.next({
                id: target,
                args: item
            });
        });
    }
}
