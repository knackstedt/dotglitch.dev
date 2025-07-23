import { ExampleEntryContextComponent } from 'src/app/pages/@showcase/ctx-menu/examples/05-entry-context/example';

export default {
    files: [
        {
            label: "example.ts",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/05-entry-context/example.ts').then(e => e.text())
        },
        {
            label: "example.html",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/05-entry-context/example.html').then(e => e.text())
        },
        {
            label: "example.scss",
            value: fetch('https://raw.githubusercontent.com/knackstedt/dotglitch.dev/refs/heads/main/src/app/pages/%40showcase/ctx-menu/examples/05-entry-context/example.scss').then(e => e.text())
        }
    ],
    component: ExampleEntryContextComponent
};
