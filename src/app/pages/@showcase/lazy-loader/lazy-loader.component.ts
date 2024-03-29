import { Component, OnInit } from '@angular/core';
import { ExampleViewerComponent } from 'src/app/components/example-viewer/example-viewer.component';
import { VscodeComponent } from '@dotglitch/ngx-common';

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
import { NgxLazyLoaderModule } from '@dotglitch/ngx-common';
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
import { ComponentRegistration } from '@dotglitch/ngx-common';

export const RegisteredComponents: ComponentRegistration[] = [
    { id: 'Homepage', load: () => import('src/app/pages/landing/landing.component') },
    { id: 'AboutUs', load: () => import('src/app/pages/about/about.component') },
    { id: 'ContactUs', load: () => import('src/app/pages/contact/contact.component') },
    { id: 'MyProfile', load: () => import('src/app/pages/profile/profile.component') }
]
`;

    constructor() { }

    ngOnInit() {
    }

}
