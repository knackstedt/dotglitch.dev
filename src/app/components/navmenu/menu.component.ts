
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
            label: "Matrix Canvas Animation",
            link: "https://matrix.dotglitch.dev",
            icon: "/assets/menu/language_japanese_kana_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg",
            linkTarget: "_blank"
        },
        // {
        //     label: "Show The Code",
        //     link: "https://showthecode.dev",
        //     icon: "https://showthecode.dev/assets/logo-C9oKWVGt.png",
        //     linkTarget: "_blank"
        // },

        ...RegisteredComponents
        .filter(c => !c['hidden'])
        .sort((a, b) => (a['order'] || 0) - (b['order'] || 0))
        .map(i => {

            return {
                label: i['name'] ?? i['label'] ?? i.id,
                link: '#/' + i.id,
                linkTarget: "_self" as "_self",
                ...i
            }
        })
    ]

    public readonly matIconRx = /[\/\.]/i;

    @Input() isMobile = false;

    collapsed = true;
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
