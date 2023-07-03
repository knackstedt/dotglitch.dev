import { Component, OnInit } from '@angular/core';
import { ExampleViewerComponent } from 'src/app/components/example-viewer/example-viewer.component';
import { VscodeComponent } from 'src/app/pages/general/vscode/vscode.component';

import BasicExample from './examples/00-basic';

@Component({
    selector: 'app-lazy-loader',
    templateUrl: './lazy-loader.component.html',
    styleUrls: ['./lazy-loader.component.scss'],
    imports: [
        ExampleViewerComponent,
        VscodeComponent
    ],
    standalone: true
})
export class LazyLoaderComponent implements OnInit {

    BasicExample = BasicExample;


    readonly importCode = `
import { NgModule } from '@angular/core';
import { NgxLazyLoaderModule } from '@dotglitch/ngx-lazy-loader';
import { AppComponent } from './app.component';
import { RegisteredComponents } from './component.registry';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        NgxLazyLoaderModule.forRoot({
            entries: RegisteredComponents
        }),
        ...
    ]
    bootstrap: [AppComponent]
})
export class AppModule { }`;

    readonly registryCode = `
import { ComponentRegistration } from '@dotglitch/ngx-lazy-loader';

export const RegisteredComponents: ComponentRegistration[] = [
    // @ae-component-inject
    { id: 'Landing', load: () => import('src/app/pages/general/landing/landing.component'), hidden: true },
    { id: 'RegexDiagramGenerator', load: () => import('src/app/pages/@showcase/regex-diagram/regex-diagram.component'), icon: "schema" },
    { id: 'ContextMenuLibrary', load: () => import('src/app/pages/@showcase/ctx-menu/ctx-menu.component'), icon: "widgets" },
    { id: 'LazyLoaderLibrary', load: () => import('src/app/pages/@showcase/lazy-loader/lazy-loader.component'), icon: "downloading" }
]
`;

    constructor() { }

    ngOnInit() {
    }

}
