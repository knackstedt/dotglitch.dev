import { enableProdMode, isDevMode, importProvidersFrom } from '@angular/core';

import { environment } from './environment';
import { RootComponent } from './app/root.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RegisteredComponents } from 'src/app/component.registry';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LazyLoaderModule, MenuDirective } from '@dotglitch/ngx-common';

if (environment.production) {
    enableProdMode();
}
// Stub the global `process` variable because React
// uses a bad convention for developers.
// @ts-ignore
window.process = window.process ?? { env: { NODE_ENV: isDevMode() ? "development" : "production" } };


bootstrapApplication(RootComponent, {
    providers: [
        importProvidersFrom(
            CommonModule,
            BrowserModule,
            MenuDirective,
            MatButtonModule,
            MatToolbarModule,
            MatSidenavModule,
            MatDialogModule,
            MatIconModule,
            MatSnackBarModule,
            LazyLoaderModule.forRoot({
                entries: RegisteredComponents,
                // componentResolveStrategy: ComponentResolveStrategy.PickFirst,
            }),
            ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: !isDevMode(),
                // Register the ServiceWorker as soon as the application is stable
                // or after 30 seconds (whichever comes first).
                registrationStrategy: 'registerWhenStable:30000'
            })
        ),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch(err => console.error(err));
