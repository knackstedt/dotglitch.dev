import { ExampleEntryContextComponent } from 'src/app/pages/@showcase/ctx-menu/examples/05-entry-context/example';

export default {
    files: [
        {
            label: "template.ts",
            value: require('!!raw-loader!./05-entry-context/example.ts')
        },
        {
            label: "template.html",
            value: require('!!raw-loader!./05-entry-context/example.html')
        }
    ],
    component: ExampleEntryContextComponent
};
