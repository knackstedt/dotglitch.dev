
import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MenuItem, MenuDirective } from '@dotglitch/ngx-common';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { RegisteredComponents } from 'src/app/component.registry';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [
        MenuDirective,
        MatTooltipModule,
        MatIconModule,
        LogoComponent
    ],
    standalone: true
})
export class NavMenuComponent {

    readonly pages: any[] = [
        {
            label: "My GitHub",
            link: "https://github.com/knackstedt",
            icon: "https://github.com/fluidicon.png",
            linkTarget: "_blank"
        },
        {
            label: "NG React Wrappers",
            icon: "https://avatars.githubusercontent.com/u/139426?s=200&v=4",
            children: [
                {
                    label: "ReactFlow",
                    icon: "https://reactflow.dev/img/favicon.ico",
                    link: "#/Reactflow"
                },
                {
                    label: "Excalidraw",
                    icon: "https://plus.excalidraw.com/favicon-32x32.png",
                    link: "#/Excalidraw"
                }
            ]
        },
        // {
        //     label: "My Libraries",
        //     icon: "",
        //     children: [
        //         {
        //             label: "@dotglitch/ngx-common",
        //             icon: "",
        //             link: ""
        //         }
        //     ]
        // },
        ...RegisteredComponents//.concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents).concat(RegisteredComponents))
        .filter(c => !c['hidden'])
        .sort((a, b) => (a['order'] || 0) - (b['order'] || 0))
        .map(i => {

            return {
                label: i['name'] ?? i.id,
                link: '#/' + i.id,
                linkTarget: "_self" as "_self",
                ...i
            }
        })
    ]

    public readonly matIconRx = /[\/\.]/i;

    @Input() isMobile = false;

    collapsed = false;
    showAdvancedMenu = true;

    readonly profileLinks: MenuItem[] = [
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
                    labelTemplate: () => `${this.theme.value == "light" ? '⏺' : '\u00A0\u00A0\u00A0'} Light`,
                    action: () => this.theme.setTheme("light")
                },
                {
                    // label: "Dark",
                    labelTemplate: () => `${this.theme.value == "dark" ? '⏺' : '\u00A0\u00A0\u00A0\u00A0'} Dark`,
                    action: () => this.theme.setTheme("dark")
                }
            ]
        },
        // "separator",
        // { label: "Log out", link: "/api/logout?ngsw-bypass=true" }
    ]

    constructor(
        public readonly sanitizer: DomSanitizer,
        private readonly theme: ThemeService
    ) {

    }
}
