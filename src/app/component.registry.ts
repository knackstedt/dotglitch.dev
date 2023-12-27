import { ComponentRegistration } from '@dotglitch/ngx-common';

export const RegisteredComponents: ComponentRegistration[] = [
    // @ae-component-inject
    { id: 'Landing', load: () => import('src/app/pages/general/landing/landing.component'), hidden: true },
    { id: 'RegexDiagramGenerator', load: () => import('src/app/pages/@showcase/regex-diagram/regex-diagram.component'), icon: "schema" },
    { id: 'ContextMenuLibrary', load: () => import('src/app/pages/@showcase/ctx-menu/ctx-menu.component'), icon: "widgets" },
    { id: 'LazyLoaderLibrary', load: () => import('src/app/pages/@showcase/lazy-loader/lazy-loader.component'), icon: "downloading" },
    { id: 'Markdown', load: () => import('src/app/pages/@showcase/markdown-editor/editor.component'), icon: "edit_note" },
    { id: 'ReactFlow', load: () => import('src/app/pages/@showcase/reactflow-demo/reactflow-demo.component'), hidden: true },
    { id: 'Excalidraw', load: () => import('src/app/pages/@showcase/excalidraw-demo/excalidraw-demo.component'), hidden: true },

    { id: 'Experiment', load: () => import('src/app/pages/general/experiment/experiment.component'), icon: "experiment", hidden: !window.location.href.includes('localhost') }
]

