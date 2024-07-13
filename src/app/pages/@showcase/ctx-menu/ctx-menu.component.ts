import { Component, OnInit } from '@angular/core';
import { ExampleViewerComponent } from 'src/app/components/example-viewer/example-viewer.component';
import { VscodeComponent } from '@dotglitch/ngx-common';

import BasicExample from "./examples/00-basic";
import StylingExample from "./examples/01-styling";
import ActionExample from "./examples/02-actions";
import ChildrenExample from "./examples/03-children";
import DynamicChildrenExample from "./examples/04-dynamic-children";
import EntryContextExample from "./examples/05-entry-context";
import CustomTriggersExample from "./examples/06-custom-triggers";
import ChildTemplateExample from "./examples/07-child-template";
import TooltipExample from "./examples/08-tooltip";


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
    TooltipExample = TooltipExample;
}
