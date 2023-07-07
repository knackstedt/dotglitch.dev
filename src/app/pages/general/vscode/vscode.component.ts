import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';

import * as MonacoEditor from 'monaco-editor';
import { debounceTime } from 'rxjs';

// Monaco has a UMD loader that requires this
// @ts-ignore
window.require = { paths: { 'vs': '/lib/monaco/vs' } };

const monacoFiles = [
    '/lib/monaco/vs/loader.js',
    '/lib/monaco/vs/editor/editor.main.nls.js',
    '/lib/monaco/vs/editor/editor.main.js',
]
let isInstalled = false
function installMonaco() {
    if (isInstalled) return;

    for (let i = 0; i < monacoFiles.length; i++) {
        const script = document.createElement("script");
        script.setAttribute("defer", "");
        script.setAttribute("src", monacoFiles[i]);
        document.body.append(script)
    }
    isInstalled = true;
}

let Monaco: typeof MonacoEditor;

@Component({
    selector: 'app-vscode',
    templateUrl: './vscode.component.html',
    styleUrls: ['./vscode.component.scss'],
    standalone: true
})
export class VscodeComponent implements AfterViewInit, OnDestroy {
    @ViewChild("editor", { read: ElementRef, static: false }) editorElement: ElementRef;

    isDirty = false;
    editor: MonacoEditor.editor.IStandaloneCodeEditor;
    filename: string;

    private _code: string;
    @Input() set code(value: string) {
        if (value == this._code)
            return;
        if (typeof value != "string")
            throw new TypeError("Value must be of type string");

        this._code = value;
        this.editor?.setValue(this.code);
    };
    get code() { return this._code?.trim() }
    @Output() codeChange = new EventEmitter<string>();
    private onCodeType = new EventEmitter<string>();
    private typeDebounce = this.onCodeType.pipe(debounceTime(100));

    @Input() customLanguage: { init: Function; };


    private _language: string;
    @Input() set language(value: string) {
        this._language = {
            'ts': "typescript",
            'html': 'xml',
            'scss': 'css'
        }[value] || value || "auto"
    }
    get language() { return this._language }

    @Input() tabSize = 2;
    @Input() readOnly = false;
    @Input() theme = "vs-dark";
    @Input() fontFamily = "Droid Sans Mono";
    @Input() fontSize = 14;

    @Input() automaticLayout = true;
    @Input() colorDecorators = true;
    @Input() folding = true;

    @Input() minimapEnabled = true;
    @Input() minimap: MonacoEditor.editor.IEditorMinimapOptions = {
        enabled: true
    };
    @Input() scrollbar: MonacoEditor.editor.IEditorScrollbarOptions = {
        alwaysConsumeMouseWheel: false,
        // scrollByPage: true
    };
    @Input() smoothScrolling = true;
    @Input() mouseWheelScrollSensitivity = 2;
    @Input() scrollBeyondLastLine = false;
    @Input() scrollBeyondLastColumn = 0;
    @Input() scrollbarAlwaysConsumeMouseWheel = 2;

    @Input() lineNumbers: MonacoEditor.editor.LineNumbersType = "on";

    get settings() {
        return {
            theme: this.theme,
            language: this.language,
            tabSize: this.tabSize,
            readOnly: this.readOnly,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            automaticLayout: this.automaticLayout,
            scrollBeyondLastLine: this.scrollBeyondLastLine,
            colorDecorators: this.colorDecorators,
            folding: this.folding,
            scrollBeyondLastColumn: this.scrollBeyondLastColumn,
            minimap: this.minimap,
            scrollbar: this.scrollbar,
            smoothScrolling: this.smoothScrolling,
            mouseWheelScrollSensitivity: this.mouseWheelScrollSensitivity,
            lineNumbers: this.lineNumbers
        } as MonacoEditor.editor.IStandaloneEditorConstructionOptions;
    }

    verticalScrollExhausted = false;

    private _sub;
    constructor() {
        installMonaco();

        this._sub = this.typeDebounce.subscribe(t => {
            this.codeChange.next(this._code = this.editor.getValue());
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        // If we changed anything OTHER than code, reload the editor
        if (Object.keys(changes).length > 1 || !changes['code']) {
            if (this.editor) {
                this.editor?.dispose();
                this.createEditor();
            }
        }
    }

    async ngAfterViewInit() {

        await new Promise((res, rej) => {
            let count = 0;
            let i = window.setInterval(() => {
                count++;

                if (window['monaco'] != undefined) {
                    window.clearInterval(i);

                    Monaco = window['monaco'];
                    res(true);
                }
                if (count >= 100) {
                    window.clearInterval(i);
                    res(false);
                }
            }, 100);
        });

        this.createEditor();
    }

    ngOnDestroy(): void {
        this.editor?.dispose();
        this._sub?.unsubscribe();
    }

    private createEditor() {
        if (this.customLanguage) {
            this.customLanguage.init(Monaco);
        }

        let editor = this.editor = Monaco.editor.create(this.editorElement.nativeElement, this.settings as any);

        if (this.code)
            editor.setValue(this.code);

        editor.getModel().onDidChangeContent(() => this.onCodeType.emit());
    }

    download() {
        const code = this.editor.getValue();

        let blob = new Blob([code], { type: 'text/log' });
        let elm = document.createElement('a');
        let blobURL = URL.createObjectURL(blob);

        // Set the data values.
        elm.href = blobURL;
        elm.download = this.filename;

        document.body.appendChild(elm);
        elm.click();

        document.body.removeChild(elm);
        elm.remove();

        URL.revokeObjectURL(blobURL);
    }

    @HostListener('window:resize', ['$event'])
    resize = (): void => {
        this.editor?.layout();
    };
}
