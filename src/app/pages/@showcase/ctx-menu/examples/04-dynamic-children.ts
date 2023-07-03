import { ExampleDynamicChildrenComponent } from 'src/app/pages/@showcase/ctx-menu/examples/04-dynamic-children/example';

export default {
    files: [
        {
            label: "template.ts",
            value: require('!!raw-loader!./04-dynamic-children/example.ts')
        },
        {
            label: "template.html",
            value: require('!!raw-loader!./04-dynamic-children/example.html')
        }
    ],
    component: ExampleDynamicChildrenComponent
};
