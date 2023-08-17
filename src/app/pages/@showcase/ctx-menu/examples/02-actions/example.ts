import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenuItem, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ NgxContextMenuDirective, MatButtonModule ],
    standalone: true
})
export class ExampleActionComponent {

    // Slightly more detailed actions, using JS events instead of links.
    readonly ctxMenu: ContextMenuItem[] = [
        {
            label: "Alert",
            icon: "notifications",
            action: () => alert("You clicked the 'Alert' item")
        },
        {
            label: "Console Message",
            icon: "terminal",
            action: () => console.log("You clicked the 'Console Message' item")
        },
    ];
}
