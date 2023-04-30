import { Component, HostListener, ViewChild } from '@angular/core';
import { Fetch } from 'src/app/services/fetch.service';
import { environment } from 'src/environment';
import { KeyboardService } from './services/keyboard.service';
import { WallpaperService } from './services/wallpaper.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './dialogs/about/about.component';

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


    isDesktop = true;
    @HostListener("window:resize", ["$event"])
    onResize() {
        if (window.innerWidth >= desktopWidth)
            this.isDesktop = true;
        else
            this.isDesktop = false;

        // Close the drawer if a resize expands to show desktop buttons
        if (this.isDesktop)
            this.drawer?.close()
    }
}
