import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { RootComponent } from './root.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { NgxAppMenuDirective, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';
import { NavMenuComponent } from 'src/app/components/navmenu/menu.component';
import { NgxLazyLoaderModule } from '@dotglitch/ngx-lazy-loader';
import { RegisteredComponents } from 'src/app/component.registry';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [
        RootComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        LogoComponent,
        NavMenuComponent,
        HttpClientModule,
        NgxAppMenuDirective,
        NgxContextMenuDirective,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        NgxLazyLoaderModule.forRoot({
            entries: RegisteredComponents,
            // componentResolveStrategy: ComponentResolveStrategy.PickFirst,
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [],
    bootstrap: [ RootComponent ]
})
export class AppModule { }
