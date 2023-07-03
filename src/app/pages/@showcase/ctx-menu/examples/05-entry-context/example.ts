import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ContextMenuItem, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';

type Entry = {
    name: string,
    value: number,
    color: string;
};

@Component({
    selector: 'app-example',
    templateUrl: './example.html',
    styleUrls: ['./example.scss'],
    imports: [ NgForOf, NgxContextMenuDirective ],
    standalone: true
})
export class ExampleEntryContextComponent {

    readonly entries: Entry[] = [
        {
            name: "Apple",
            value: 55,
            color: "red"
        },
        {
            name: "Banana",
            value: 72,
            color: "yellow"
        },
        {
            name: "Lemon",
            value: 485,
            color: "yellow"
        },
        {
            name: "Coconut",
            value: 37,
            color: "brown"
        },
        {
            name: "Kiwi",
            value: 0,
            color: "green"
        }
    ];

    readonly ctxMenu: ContextMenuItem<Entry>[] = [
        {
            labelTemplate: item => "Edit " + item.name,
            action: item => alert("Editing item\m" + JSON.stringify(item, null, 4))
        },
        {
            label: "Delete",
            action: async item => {
                console.log(item);
            }
        }
    ];
}
