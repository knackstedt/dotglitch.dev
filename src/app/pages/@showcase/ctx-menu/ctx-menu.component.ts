import { Component, OnInit } from '@angular/core';
import { ExampleViewerComponent } from 'src/app/components/example-viewer/example-viewer.component';
import { VscodeComponent } from '@dotglitch/ngx-web-components';

import BasicExample from "./examples/00-basic";
import StylingExample from "./examples/01-styling";
import ActionExample from "./examples/02-actions";
import ChildrenExample from "./examples/03-children";
import DynamicChildrenExample from "./examples/04-dynamic-children";
import EntryContextExample from "./examples/05-entry-context";
import CustomTriggersExample from "./examples/06-custom-triggers";
import ChildTemplateExample from "./examples/07-child-template";


@Component({
    selector: 'app-ctx-menu',
    templateUrl: './ctx-menu.component.html',
    styleUrls: ['./ctx-menu.component.scss'],
    imports: [
        ExampleViewerComponent,
        VscodeComponent
    ],
    standalone: true
})
export class CtxMenuComponent {
    BasicExample = BasicExample;
    StylingExample = StylingExample;
    ActionExample = ActionExample;
    ChildrenExample = ChildrenExample;
    DynamicChildrenExample = DynamicChildrenExample;
    EntryContextExample = EntryContextExample;
    CustomTriggersExample = CustomTriggersExample;
    ChildTemplateExample = ChildTemplateExample;

    readonly importCode = `
import { NgModule } from '@angular/core';
import { NgxAppMenuDirective, NgxContextMenuDirective } from '@dotglitch/ngx-ctx-menu';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        NgxAppMenuDirective,
        NgxContextMenuDirective,
        ...
    ]
    bootstrap: [AppComponent]
})
export class AppModule { }`

    constructor() { }

    ngOnInit() {
    }

}
