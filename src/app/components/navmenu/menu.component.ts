import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { BaseCtx, ContextMenuItem, NgxAppMenuDirective } from '@dotglitch/ngx-ctx-menu';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { RegisteredComponents } from 'src/app/component.registry';
import { DomSanitizer } from '@angular/platform-browser';


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

    readonly pages: BaseCtx[] = [
        {
            label: "My GitHub",
            link: "https://github.com/knackstedt",
            icon: "https://github.com/favicon.ico",
            linkTarget: "_blank"
        },
        {
            label: "Dankpods.net",
            link: "https://dankpods.net",
            icon: "music_note",
            linkTarget: "_blank"
        },
        ...RegisteredComponents
        .filter(c => !c['hidden'])
        .sort((a, b) => (a['order'] || 0) - (b['order'] || 0))
        .map(i => {

            return {
                label: i.id,
                link: '#/' + i.id,
                // linkTarget: "_self",
                ...i
            }
        })
    ]

    public readonly matIconRx = /[\/\.]/i;


    @Input() isMobile = false;

    collapsed = false;
    showAdvancedMenu = true;
    theme = document.body.classList.contains('light') ? 'light' : 'dark';

    readonly profileLinks: ContextMenuItem[] = [

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
                        this.theme = "light";
                        document.body.classList.remove("dark");
                        document.body.classList.add("light");
                    }
                },
                {
                    // label: "Dark",
                    labelTemplate: () => `${this.theme == "dark" ? '⏺' : '\u00A0\u00A0\u00A0\u00A0'} Dark`,
                    action: () => {
                        this.theme = "dark";
                        document.body.classList.remove("light");
                        document.body.classList.add("dark");
                    }
                }
            ]
        },
        // { label: "Account Management", link: "https://dt-url.net/myaccount", linkTarget: "_blank" },
        // "separator",
        // { label: "Log out", link: "/api/logout?ngsw-bypass=true" }
    ]

    constructor(
        public readonly sanitizer: DomSanitizer
    ) {

    }
}
