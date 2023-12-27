import { ExampleStyledComponent } from 'src/app/pages/@showcase/ctx-menu/examples/01-styling/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/ctx-menu/01-styling/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/ctx-menu/01-styling/example.html').then(e => e.text())
        },
        {
            label: "example.scss",
            value: fetch('/assets/@showcase/ctx-menu/01-styling/example.scss').then(e => e.text())
        }
    ],
    component: ExampleStyledComponent
};
