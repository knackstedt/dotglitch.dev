import { Component, HostListener, ViewChild } from '@angular/core';
import { Fetch } from 'src/app/services/fetch.service';
import { environment } from 'src/environment';
import { KeyboardService } from './services/keyboard.service';
import { WallpaperService } from './services/wallpaper.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './dialogs/about/about.component';
import { ContextMenuItem } from '@dotglitch/ngx-ctx-menu';

const desktopWidth = 1126;


@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent {
    @ViewChild("drawer") drawer: MatDrawer;
    environment = environment;

    taskbarPosition: "top" | "right" | "bottom" | "left" = "left";

    readonly headLinks = [
        { url: "https://github.com/knackstedt", label: "GitHub" },
        { url: "https://dankpods.net", label: "DankPods" }
    ]

    theme = 'dark';
    isMobile = false;


    readonly mainCtxItems: ContextMenuItem<any>[] = [
        {
            label: "Appearance",
            children: [
                {
                    labelTemplate: () => `${this.theme == "light" ? '⏺' : '\u00A0\u00A0\u00A0'} Light`,
                    action: () => {
                        document.body.classList.remove("dark");
                        document.body.classList.add("light");
                    }
                },
                {
                    labelTemplate: () => `${this.theme == "dark" ? '⏺' : '\u00A0\u00A0\u00A0\u00A0'} Dark`,
                    action: () => {
                        document.body.classList.remove("dark");
                        document.body.classList.add("light");
                    }
                }
            ]
        }
    ]

    constructor(
        private fetch: Fetch,
        private keyboard: KeyboardService,
        public wallpaper: WallpaperService,
        private dialog: MatDialog
    ) {
        this.onResize();
    }

    openInfo() {
        this.dialog.open(AboutComponent);
    }


    @HostListener("window:resize", ["$event"])
    onResize() {
        this.isMobile = (window.innerHeight / window.innerWidth > 1.5) || window.innerWidth < 900;
        document.body.classList.remove("mobile");
        document.body.classList.remove("desktop");

        this.isMobile && document.body.classList.add("mobile");
        !this.isMobile && document.body.classList.add("desktop");
    }
}
