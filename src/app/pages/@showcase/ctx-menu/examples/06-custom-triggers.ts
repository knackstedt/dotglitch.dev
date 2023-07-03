import { ExampleCustomTriggersComponent } from 'src/app/pages/@showcase/ctx-menu/examples/06-custom-triggers/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./06-custom-triggers/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./06-custom-triggers/example.html')
        }
    ],
    component: ExampleCustomTriggersComponent
};
