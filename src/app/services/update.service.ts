import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
    providedIn: 'root'
})
export class UpdateService {
    constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
        // this.swUpdate.versionUpdates.subscribe((evt) => {
        //     // Catch installation errors that are not hash mismatches
        //     if (evt.type == "VERSION_INSTALLATION_FAILED" && !evt.error.includes("Hash mismatch")) {
        //         console.error(evt);
        //     }

        //     // If the new version is ready for reload
        //     if (evt.type == "VERSION_READY") {
        //         const snack = this.snackbar.open('Update Available', 'Reload');

        //         snack
        //             .onAction()
        //             .subscribe(() => {
        //                 window.location.reload();
        //             });

        //         setTimeout(() => {
        //             snack.dismiss();
        //         }, 6000);
        //     }
        // });

        if (this.swUpdate.isEnabled) {
            this.checkUpdate();
        }
    }

    private timer;
    async checkUpdate() {
        try {
            const isUpdateAvailable = await this.swUpdate.checkForUpdate();
            if (isUpdateAvailable) {
                const snack = this.snackbar.open('Update Available', 'Reload');

                snack
                    .onAction()
                    .subscribe(() => {
                        window.location.reload();
                    });

                setTimeout(() => {
                    snack.dismiss();
                }, 6000);
            }
        }
        catch(ex) {
            // Unclear what errors occur here
        }
        setTimeout(() => this.checkUpdate.bind(this), 60 * 1000);
    }
}
