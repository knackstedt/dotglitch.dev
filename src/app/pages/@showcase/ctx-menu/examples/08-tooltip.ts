import { ExampleTooltipComponent } from 'src/app/pages/@showcase/ctx-menu/examples/08-tooltip/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/ctx-menu/08-tooltip/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/ctx-menu/08-tooltip/example.html').then(e => e.text())
        },
        {
            label: "example-child.ts",
            value: fetch('/assets/@showcase/ctx-menu/07-child-template/example-child/example-child.ts').then(e => e.text())
        },
        {
            label: "example-child.html",
            value: fetch('/assets/@showcase/ctx-menu/07-child-template/example-child/example-child.html').then(e => e.text())
        },
        {
            label: "example-child.scss",
            value: fetch('/assets/@showcase/ctx-menu/07-child-template/example-child/example-child.scss').then(e => e.text())
        },
    ],
    component: ExampleTooltipComponent
};
