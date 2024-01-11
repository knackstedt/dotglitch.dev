
import { Component, ElementRef, HostListener, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { StackEditorComponent } from 'ngx-stackedit';
import { NgxFlickingModule, NgxFlickingComponent } from '@egjs/ngx-flicking';
import { CubeGraphicComponent } from 'src/app/components/cube-graphic/cube-graphic.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatrixRainComponent } from 'src/app/components/matrix-rain/matrix-rain.component';

@Component({
    selector: 'app-img',
    template: '<img [src]="url" (click)="dialog.close()">',
    styles: `:host{max-width: min(90vh, 90vw); max-height: min(90vh, 90vw)}`,
    standalone: true
})
class ImageComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly url: string,
        public readonly dialog: MatDialogRef<any>
    ) {}
}

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    imports: [
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        CubeGraphicComponent,
        LogoComponent,
        MatrixRainComponent,
        StackEditorComponent,
        NgxFlickingModule
    ],
    standalone: true
})
export class LandingComponent {

    @ViewChild('rootFlicker') rootFlicker: NgxFlickingComponent;
    @ViewChild('projectFlicker') projectFlicker: NgxFlickingComponent;
    @ViewChild('particles') particlesEl: ElementRef;

    readonly projects = [
        {
        name: "Angular StackEdit",
        description: "A Makdown Writing application and Web Component that is fully loaded with Batteries",
        startDate: "2023-07",
        endDate: "Present",
        url: "https://md.dotglitch.dev",
        highlights: [
            "Rewrote the entire app in Angular",
            "Created custom Tokenizer to provide best-in-class markdown highlighting",
            "Packaged as .exe, .dmg, .appimage and deployed as public website",
            "Using modern technologies such as Angular, Markdown-It and TypeScript",
            "Embedded React components in Angular application"
        ],
        images: [
            "./assets/ngx-stackedit/stackedit.png",
            "./assets/ngx-stackedit/excalidraw.png",
            "./assets/ngx-stackedit/monaco.png"
        ]
    },
    {
        name: "Angular Common Components",
        description: "A set of useful Angular components, services and utilities used across various projects",
        startDate: "2023-07",
        endDate: "Present",
        url: "https://github.com/knackstedt/dotglitch-ngx",
        highlights: [
            "Custom Routerless Lazy-Loading with dynamic input and output binding",
            "App & context menu directive (supports Components/Templates, lazy loading)",
            "Custom tooltip directive that supports components and templates",
            "Command Palette service that puts context first",
            "Monaco-Editor (VSCode text editor) wrapper",
            "Web file manager component",
            "Web kanban component",
            "Common services for data retrieval, dialog management, and updates among others"
        ],
        images: [
            "./assets/ngx-common/filemanager.png",
            "./assets/ngx-common/command-palette.png",
            "./assets/ngx-common/menu.png"
        ]
    },
    {
        name: "NodeJS Authentication Microservice (Oauth2.0)",
        description: "A microservice that runs on k8s which serves the primary purpose of federating authorization and authentication",
        startDate: "2021-04",
        endDate: "Present",
        highlights: [
            "Express routes securely guarded via middleware",
            "Compliant OdataV4 data endpoints for ingress/egress",
            "Sql Server model-less integration",
            "Redis and Azure endpoint integrations",
            "Transactional logging and monitoring with Dynatrace",
            "Stateless & scalable architecture enabling for elastic horizontal scaling"
        ]
    }];

    readonly technologies_1 = [
        { name: "HTML5", icon: "/assets/technology-logos/html5.svg"},
        { name: "JavaScript", icon: "/assets/technology-logos/javascript.svg"},
        { name: "TypeScript", icon: "/assets/technology-logos/typescript.svg"},
        { name: "NodeJS", icon: "/assets/technology-logos/nodejs.svg"},
        { name: "Angular", icon: "/assets/technology-logos/angular.gif"},
        { name: "PWA", icon: "/assets/technology-logos/pwa.svg"},
    ];

    readonly technologies_2 = [
        { name: "Azure", icon: "/assets/technology-logos/azure.svg"},
        { name: "GCP", icon: "/assets/technology-logos/gcp.svg"},
        { name: "SurrealDB", icon: "/assets/technology-logos/surrealdb.png"},
        { name: "Nginx", icon: "/assets/technology-logos/nginx.svg"},
        { name: "Kubernetes", icon: "/assets/technology-logos/kubernetes.svg"},
        { name: "THREE.js", icon: "/assets/technology-logos/threejs.svg"},
        { name: "GitHub", icon: "/assets/technology-logos/github.svg"},
    ];

    readonly technologies_3 = [
        { name: "VS Code", icon: "/assets/technology-logos/vscode.svg"},
        { name: "Dynatrace", icon: "/assets/technology-logos/dynatrace.svg"},
        { name: "Pop!_os", icon: "/assets/technology-logos/pop_os.svg"},
        { name: "Diagrams.net", icon: "/assets/technology-logos/diagrams.net.svg"},
    ];

    readonly allTechnologies = this.technologies_1
        .concat(this.technologies_2)
        .concat(this.technologies_3);

    readonly markdownText = `
#### Basic Styling

<span style="color: #33b579">Markdown</span> is a ~~heavyweight~~ lightweight and easy-to-read markup language used for text formatting. It was designed to provide a simple and straightforward way to structure and style plain text documents using a set of plain text symbols. In Markdown, you can easily create headers, emphasis (such as _italics_, **bold** text, and ~~strikethroughs~~), lists, links, code blocks, and more, all by using a **minimalistic** _syntax_ that resembles the way people often naturally format text in plain email or text documents. Markdown is widely used for creating documentation, writing \`web content\`, and even in [software development](https://en.wikipedia.org/wiki/Software_development), making it a popular choice for those who value simplicity and readability in their writing and document creation processes.

#### Colored text
 > Full-featured, <span style="color: #33b579">open-source <span style="color: #f4d679">Markdown</span> editor based </span> on PageDown, the <span style="color: #11b3a5">Markdown</span> library used by Stack Overflow and the other Stack <span style="color: #eaa100">Exchange</span> sites.

#### Images

> ![clown fish](https://unsplash.com/photos/rEM3cK8F1pk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZmlzaHxlbnwwfHx8fDE2OTg1NzkxMDV8MA&force=true&w=640)
> Photo by <a href="https://unsplash.com/@rachelhisko?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Rachel Hisko</a> on <a href="https://unsplash.com/photos/clown-fish-in-shallow-focus-photography-rEM3cK8F1pk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

> ![lava](https://unsplash.com/photos/80x3QULJDN4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bGF2YXxlbnwwfHx8fDE2OTg1ODk0MjF8MA&force=true&w=640)
> Photo by <a href="https://unsplash.com/@tetiana_grypachevska?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tetiana Grypachevska</a> on <a href="https://unsplash.com/photos/brown-and-black-mountain-under-white-clouds-80x3QULJDN4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

> ![split rock](https://unsplash.com/photos/an3qaxZ-2bY/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8ODZ8fHJvY2t8ZW58MHx8fHwxNjk4NTgzNjM2fDA&force=true&w=640)
> Photo by <a href="https://unsplash.com/@pabloheimplatz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pablo Heimplatz</a> on <a href="https://unsplash.com/photos/gray-rock-cut-in-half-an3qaxZ-2bY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

> ![tornado](https://unsplash.com/photos/n_3kdpSkrJo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8dG9ybmFkb3xlbnwwfHx8fDE2OTg1ODk1NzZ8MA&force=true&w=640)
> Photo by <a href="https://unsplash.com/@nikolasnoonan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nikolas Noonan</a> on <a href="https://unsplash.com/photos/long-exposure-photography-of-hurricane-n_3kdpSkrJo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

#### Links

We autodetect links via the gfm extension
> Something Nice: https://www.npmjs.com/package/@dotglitch/ngx-common

But you can also embed links normally like [so](https://npmgraph.js.org/?q=ngx-stackedit).

#### Lists

 - A bulleted list from dashes
 - Can have n number of entries

 1. Now when we number a _list_, things can get spicy.
 2. we can add some pretty neat <span style="color: #36955f">colors</span>.
 3. We can also put a table inside of the list.

 - [X] Install Linux
 - [ ] Stop using Google

#### Tables

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |


#### Code blocks
\`\`\`ts
import 'zone.js';  // Included with Angular CLI.

import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(CommonModule, BrowserModule,
            MatButtonModule, MatSidenavModule, MatDialogModule,
            ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: !isDevMode(),
                // Register the ServiceWorker as soon as the application is stable
                // or after 30 seconds (whichever comes first).
                registrationStrategy: 'registerWhenStable:30000'
            })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch(err => console.error(err));

\`\`\`

\`\`\`css
body { margin: 0; }
html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: 'Fira Sans', Arial;
    background-color: var(--background-color, #121212);
    color: var(--text-color);
}
\`\`\`

\`\`\`bash
#!/usr/bin / env bash;
KEEP_GOING = 1

export SD_WEBUI_RESTART = tmp / restart;
while [["$KEEP_GOING" - eq "1"]]; do
    if [[! -z "\${ACCELERATE}"]] && [\${ ACCELERATE } = "True"] && [-x "$(command -v accelerate)"]; then
        printf "\\n%s\\n" "\${delimiter}"
        printf "Accelerating launch.py..."
        printf "\\n%s\\n" "\${delimiter}";
prepare_tcmalloc
        accelerate launch--num_cpu_threads_per_process = 6 "\${LAUNCH_SCRIPT}" "$@"
    else
        printf "\\n%s\\n" "\${delimiter}"
        printf "Launching launch.py..."
        printf "\\n%s\\n" "\${delimiter}";
prepare_tcmalloc;
"\${python_cmd}" - u "\${LAUNCH_SCRIPT}" "$@";
fi;

if [[! -f tmp / restart]]; then;
KEEP_GOING = 0;
fi;
done
\`\`\`

#### Mermaid Diagrams

\`\`\`mermaid
pie title Pets adopted by volunteers
    "Dogs": 386
    "Cats": 85
    "Rats": 15
\`\`\`

\`\`\`mermaid
classDiagram
    note "From Duck till Zebra"
Animal <| --Duck
    note for Duck "can fly
    can swim
    can dive
    can help in debugging"
Animal <| --Fish
Animal <| --Zebra
Animal: +int age
Animal: +String gender
Animal: +isMammal()
Animal: +mate()
class Duck {
    +String beakColor
    + swim()
    + quack()
}
class Fish {
    -int sizeInFeet
    - canEat()
}
class Zebra {
    +bool is_wild
    + run()
}
\`\`\`
    `;

    pageFlickerIndex = 0;
    projectFlickerIndex = 0;
    animationFlickerIndex = 0;
    pages = [
        {},
        {},
        {},
        {},
        {}
    ];

    width = window.innerWidth;

    constructor(
        private readonly viewContainer: ViewContainerRef,
        private readonly dialog: MatDialog
    ) { }

    ngOnInit() {
        this.viewContainer.element.nativeElement.focus();
    }

    onImageClick(image) {
        this.dialog.open(ImageComponent, { data: image })
    }

    moveFlicker() {
        this.rootFlicker.stopAnimation();
        this.rootFlicker.moveTo(this.pageFlickerIndex);
    }

    @HostListener("wheel", ['$event'])
    onWheel(evt: WheelEvent) {
        evt.deltaY > 0 ? this.onArrowDown() : this.onArrowUp();
    }

    @HostListener("window:keydown.arrowdown")
    @HostListener("window:keydown.pagedown")
    onArrowDown() {
        if ([document.body, this.viewContainer.element.nativeElement].includes(document.activeElement)) {
            this.pageFlickerIndex = Math.min(this.pages.length-1, this.pageFlickerIndex + 1);
            this.moveFlicker();
        }
    }

    @HostListener("window:keydown.arrowup")
    @HostListener("window:keydown.pageup")
    onArrowUp() {
        if ([document.body, this.viewContainer.element.nativeElement].includes(document.activeElement)) {
            this.pageFlickerIndex = Math.max(0, this.pageFlickerIndex-1);
            this.moveFlicker();
        }
    }

    @HostListener("window:keydown.arrowleft")
    onArrowLeft() {
        if (
            [document.body, this.viewContainer.element.nativeElement].includes(document.activeElement) &&
            this.pageFlickerIndex == 2
        ) {
            this.projectFlickerIndex = Math.max(0, this.projectFlickerIndex-1);
            this.projectFlicker.stopAnimation();
            this.projectFlicker.moveTo(this.projectFlickerIndex);
        }
    }

    @HostListener("window:keydown.arrowright")
    onArrowRight() {
        if (
            [document.body, this.viewContainer.element.nativeElement].includes(document.activeElement) &&
            this.pageFlickerIndex == 2
        ) {
            this.projectFlickerIndex = Math.min(this.projects.length-1, this.projectFlickerIndex + 1);
            this.projectFlicker.stopAnimation();
            this.projectFlicker.moveTo(this.projectFlickerIndex);
        }
    }

    @HostListener("window:resize")
    onResize() {
        this.width = window.innerWidth;
    }
}
