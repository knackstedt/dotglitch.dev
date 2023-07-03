import { ExampleChildrenComponent } from 'src/app/pages/@showcase/ctx-menu/examples/03-children/example';

export default {
    files: [
        {
            label: "example.ts",
            value: require('!!raw-loader!./03-children/example.ts')
        },
        {
            label: "example.html",
            value: require('!!raw-loader!./03-children/example.html')
        }
    ],
    component: ExampleChildrenComponent
};
