import { ExampleBasicComponent } from 'src/app/pages/@showcase/lazy-loader/examples/00-basic/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/lazy-loader/00-basic/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/lazy-loader/00-basic/example.html').then(e => e.text())
        },
        {
            label: "example-child.ts",
            value: fetch('/assets/@showcase/lazy-loader/00-basic/example-child/example-child.ts').then(e => e.text())
        },
        {
            label: "example-child.html",
            value: fetch('/assets/@showcase/lazy-loader/00-basic/example-child/example-child.html').then(e => e.text())
        },
        {
            label: "example-child.scss",
            value: fetch('/assets/@showcase/lazy-loader/00-basic/example-child/example-child.scss').then(e => e.text())
        }
    ],
    component: ExampleBasicComponent
}
