import { ComponentRegistration } from '@dotglitch/ngx-lazy-loader';

export const RegisteredComponents: ComponentRegistration[] = [
    // @ae-component-inject
    { id: 'Landing', load: () => import('src/app/pages/general/landing/landing.component'), hidden: true },
    { id: 'RegexDiagramGenerator', load: () => import('src/app/pages/@showcase/regex-diagram/regex-diagram.component'), icon: "schema" },
    { id: 'ContextMenuLibrary', load: () => import('src/app/pages/@showcase/ctx-menu/ctx-menu.component'), icon: "widgets" }
]

