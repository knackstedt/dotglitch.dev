import { ExampleBasicComponent } from 'src/app/pages/@showcase/markdown-editor/examples/00-basic/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('/assets/@showcase/markdown/00-basic/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('/assets/@showcase/markdown/00-basic/example.html').then(e => e.text())
        }
    ],
    component: ExampleBasicComponent
}
