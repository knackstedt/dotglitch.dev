import { Component, HostListener, ViewChild } from '@angular/core';
import { environment } from 'src/environment';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './dialogs/about/about.component';

import { NavMenuComponent } from './components/navmenu/menu.component';
import { Fetch, LazyLoaderComponent, MenuItem, NavigationService, CommandPaletteService } from '@dotglitch/ngx-common';
import { UpdateService } from 'src/app/services/update.service';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
    standalone: true,
    imports: [NavMenuComponent, LazyLoaderComponent]
})
export class RootComponent {
    @ViewChild(NavMenuComponent) menu: NavMenuComponent;
    environment = environment;

    theme = 'dark';
    isMobile = false;

    readonly mainCtxItems: MenuItem<any>[] = [
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
        private readonly fetch: Fetch,
        public readonly navigator: NavigationService,
        private readonly dialog: MatDialog,
        private readonly updater: UpdateService,
        private readonly commandPalette: CommandPaletteService
    ) {
        this.onResize();

        this.commandPalette.initialize({
            keybind: "ctrl+p"
        });

        this.commandPalette.attachElementCommands([
            { visibleInList: false, shortcutKey: "pause", action: () => {debugger} },
            { icon: "info", label: "Explanation", hint: "These menu items are purely for sample purposes" },
            {
                label: "Oxymorons",
                icon: "list",
                hint: "View a list of Oxymorons",
                subMenu: [
                    { label: "Silent scream", shortcutKey: "ctrl+h" },
                    { label: "Old news", shortcutKey: "ctrl+g" },
                    { label: "Civil war", shortcutKey: "ctrl+e" },
                    { label: "Plastic silverware", shortcutKey: "ctrl+l" },
                    { label: "Crash landing", shortcutKey: "ctrl+t" },
                    { label: "Even odds", shortcutKey: "ctrl+y" },
                    { label: "Freezer burn", shortcutKey: "ctrl+u" },
                    { label: "Honest politician", shortcutKey: "ctrl+i" },
                    { label: "Random order", shortcutKey: "ctrl+o" },
                    { label: "Dry lake", shortcutKey: "ctrl+j" }
                ]
            },
            {
                icon: "restaurant_menu",
                label: "Foods",
                hint: "View a list of Foods",
                subMenu: [
                    { label: "Cake", icon: "cake" },
                    { label: "Pizza", icon: "local_pizza" },
                    { label: "Soup", icon: "soup_kitchen" },
                    { label: "Ramen", icon: "ramen_dining" },
                    { label: "Hamburger", icon: "lunch_dining" },
                    { label: "Coffee", icon: "local_cafe" },
                    { label: "Martini", icon: "local_bar" },
                    { label: "Croissant", icon: "bakery_dining" },
                    { label: "Chinese", icon: "takeout_dining" },
                    { label: "Ice Cream", icon: "icecream" },
                    { label: "Tapas", icon: "tapas" },
                ]
            },
            { icon: "open_with", label: "Do something cool", hint: "You can use mat-icons" },
            { icon: "./assets/icon.png", label: "Turn off gravity", hint: "You can also use image URLs" },
        ])
    }

    openInfo() {
        this.dialog.open(AboutComponent);
    }


    @HostListener("window:resize", ["$event"])
    onResize() {
        this.isMobile = window.innerWidth < 1000;
        document.body.classList.remove("mobile");
        document.body.classList.remove("desktop");

        this.isMobile && document.body.classList.add("mobile");
        !this.isMobile && document.body.classList.add("desktop");

        if (this.isMobile && this.menu) {
            this.menu.collapsed = true;
        }
    }

    @HostListener("window:swiped-right", ['$event'])
    onSwipeRight(evt?) {
        if (this.menu.collapsed) {
            this.menu.collapsed = false;
            evt.stopPropagation();
        }
    }

    @HostListener("window:swiped-left", ['$event'])
    onSwipeLeft(evt?) {
        if (this.menu.collapsed == false) {
            this.menu.collapsed = true;
            evt.stopPropagation();
        }
    }
}
