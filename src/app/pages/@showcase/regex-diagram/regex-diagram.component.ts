import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Regex2RailRoadDiagram } from './diagram/regex-to-railroad';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { VscodeComponent } from 'src/app/pages/general/vscode/vscode.component';

import * as RegexLanguage from './regex-syntax';


@Component({
    selector: 'app-regex-diagram',
    templateUrl: './regex-diagram.component.html',
    styleUrls: ['./regex-diagram.component.scss'],
    imports: [
        NgForOf,
        MatInputModule,
        MatSelectModule,
        VscodeComponent
    ],
    standalone: true
})
export class RegexDiagramComponent implements AfterViewInit {
    @ViewChild('diagram', { read: ElementRef, static: false }) diagram: ElementRef;

    RegexLanguage = RegexLanguage;

    code = '^(?P<protocol>(?:ftp|https?)):\/\/(?P<subDomain>(?:[\-.0-9A-Za-z])+)\.(?P<tld>(?:[A-Za-z]){2,4})(?:(?P<port>:(?:6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])))?(?:\/)?(?P<resource>(?:.)*)$'

    readonly samples = [
        {
            label: "Url Validator",
            value: "^(?P<protocol>(?:ftp|https?)):\/\/(?P<subDomain>(?:[\-.0-9A-Za-z])+)\.(?P<tld>(?:[A-Za-z]){2,4})(?:(?P<port>:(?:6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{3}|[1-9][0-9]{2}|[1-9][0-9]|[1-9])))?(?:\/)?(?P<resource>(?:.)*)$"
        },
        {
            label: "Date Validator",
            value: "^(?:2020|201[2-9])\\-((?:(?:A(?:pr|ug)|Dec|Feb|J(?:a|u[ln])|Ma[ry]|Nov|Oct|Sep)))\-((?:0?(?:3[0-1]|[1-2][0-9]|[2-9])))$"
        },
        {
            label: "PHP Email Regex",
            value: "(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){255,})(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){65,}@)(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22))(?:\\.(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\\]))"
        },
        {
            label: "Email Regex",
            value: "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?: [\\x01 -\\x08\\x0b\\x0c\\x0e -\\x1f\\x21\\x23 -\\x5b\\x5d -\\x7f] |\\\\[\\x01 -\\x09\\x0b\\x0c\\x0e -\\x7f]) *\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
        },
        {
            label: "CloudFlare Killer",
            value: "(?:(?:\\\"|'|\\]|\\}|\\\\|\\d|(?:nan|infinity|true|false|null|undefined|symbol|math)|\\`|\\-|\\+)+[)]*;?((?:\\s|-|~|!|{}|\\|\\||\\+)*.*(?:.*=.*)))"
        }
    ]

    private _regexText: string = "foo(bar)baz(limes(?:and)lemons)?are(coo((l)io))+";
    get regexText() { return this._regexText }
    set regexText(text: string) {
        this._regexText = text;
        try {
            const html = Regex2RailRoadDiagram(text, { flavour: 'perl', options: '' });
            this.diagram.nativeElement.innerHTML = html;
        }
        catch (ex) {
            console.log(ex);
            let message = this.errorMessageOverride(ex);
            this.diagram.nativeElement.innerHTML = message;
        }
    };

    constructor() { }

    @Input() errorMessageOverride: CallableFunction = (ex) => {
        // Syntax Highlighting taken from:
        // http://jsfiddle.net/KJQ9K/554/
        function syntaxHighlight(json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                if (cls == 'string')
                    return '"<span class="' + cls + '">' + match.substr(1, match.length - 2) + '</span>"';
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
        const style = ".string{color: #f28b54;} .number, .boolean, .null{color: #9980ff;} .key{ color: #e36eec; }";

        return `<style>${style}</style><pre>` + syntaxHighlight(JSON.stringify(ex, null, 2)) + '</pre>';
    };

    ngAfterViewInit(): void {
        this.regexText = this.regexText;
    }
}
