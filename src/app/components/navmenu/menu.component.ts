import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { BaseCtx, ContextMenuItem, NgxAppMenuDirective } from '@dotglitch/ngx-ctx-menu';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { RegisteredComponents } from 'src/app/component.registry';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [
        NgForOf,
        NgIf,
        NgxAppMenuDirective,
        MatTooltipModule,
        MatIconModule,
        LogoComponent
    ],
    standalone: true
})
export class NavMenuComponent {

    readonly pages: BaseCtx[] = RegisteredComponents
        .filter(c => !c['hidden'])
        .sort((a, b) => (a['order'] || 0) - (b['order'] || 0))
        .map(i => {

            return {
                label: i.id,
                link: '#/' + i.id,
                // linkTarget: "_self",
                ...i
            }
        });

    // rootItems: any[] = [
    //     {
    //         label: "Angular context menu",
    //         link: "https://www.npmjs.com/package/@dotglitch/ngx-ctx-menu",
    //         linkTarget: "_blank",
    //         icon: "inventory_2"
    //     },
    //     {
    //         label: "Angular lazy loader",
    //         link: "https://www.npmjs.com/package/@dotglitch/ngx-lazy-loader",
    //         linkTarget: "_blank",
    //         icon: "inventory_2"
    //     },
    //     {
    //         label: "Osiris (Web Desktop)",
    //         link: "https://github.com/knackstedt/osiris",
    //         linkTarget: "_blank",
    //         icon: "desktop_windows"
    //     }
    // ];

    @Input() isMobile = false;

    collapsed = false;
    showAdvancedMenu = true;
    theme = 'dark';

    profileLinks: ContextMenuItem[] = [

        // {
        //     label: "User Settings",
        //     link: "#/users?trail=user.{current.user.id}"
        // },
        {
            label: "Appearance",
            children: [
                // {
                //     label: "Browser Theme",
                //     action: () => {

                //     }
                // },
                // "separator",
                {
                    // label: "Light",
                    labelTemplate: () => `${this.theme == "light" ? '⏺' : '\u00A0\u00A0\u00A0'} Light`,
                    action: () => {
                        document.body.classList.remove("dark");
                        document.body.classList.add("light");
                    }
                },
                {
                    // label: "Dark",
                    labelTemplate: () => `${this.theme == "dark" ? '⏺' : '\u00A0\u00A0\u00A0\u00A0'} Dark`,
                    action: () => {
                        document.body.classList.remove("dark");
                        document.body.classList.add("light");
                    }
                }
            ]
        },
        // { label: "Account Management", link: "https://dt-url.net/myaccount", linkTarget: "_blank" },
        // "separator",
        // { label: "Log out", link: "/api/logout?ngsw-bypass=true" }
    ]

    constructor() {

    }
}
