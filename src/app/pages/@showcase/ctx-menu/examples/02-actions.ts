import { ExampleActionComponent } from 'src/app/pages/@showcase/ctx-menu/examples/02-actions/example';

export default {
    files: [
        {
            label: "template.ts",
            value: require('!!raw-loader!./02-actions/example.ts')
        },
        {
            label: "template.html",
            value: require('!!raw-loader!./02-actions/example.html')
        }
    ],
    component: ExampleActionComponent
};
