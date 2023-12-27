import { ExampleChildrenComponent } from 'src/app/pages/@showcase/ctx-menu/examples/03-children/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/ctx-menu/03-children/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/ctx-menu/03-children/example.html').then(e => e.text())
        }
    ],
    component: ExampleChildrenComponent
};
