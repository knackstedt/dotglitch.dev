import { ExampleEntryContextComponent } from 'src/app/pages/@showcase/ctx-menu/examples/05-entry-context/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./05-entry-context/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./05-entry-context/example.html')
        },
        {
            label: "example.scss",
            value: require('!!raw-loader!./05-entry-context/example.scss')
        }
    ],
    component: ExampleEntryContextComponent
};
