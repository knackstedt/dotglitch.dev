import * as Monaco from 'monaco-editor';


const basicFlags: [RegExp, any][] = [
    // [/\\a|\\z|\^|\$/, { token: "sequence-operator" }],

    // +*?
    // Mark invalid quantifiers
    [ /[+?*][+?][+*?]/, "invalid"],
    [ /[+?*][*]/, "invalid"],

    [ /[+?*][+?]?/, "quantifier"],
    [ /\|/, "alternator" ],

    [/\\[ux][A-F0-9a-f]{2}/, "unicode"],
    [/\\[ux][A-F0-9a-f]{4}/, "unicode"],

    [ /\\./, "escape"],

    [ /\(\?#/,  { token: "comment", bracket: '@open', next: "@comment" }],
    [ /\(/,     { token: "group-terminator", bracket: '@open', next: "@group" }],


    [ /\{/,     { token: "quantifier", bracket: '@open', next: "@quantifier" }],
    [ /\[\[:/,  { token: "posix", bracket: '@open', next: "@posix" }],
    [ /\[\^/,   { token: "negativeLiteral", bracket: '@open', next: '@negativeLiteral' }],
    [ /\[/,     { token: "literal", bracket: '@open', next: '@literal' }],
]

export function init(monaco: typeof Monaco){
    monaco.languages.register({ id: 'rgx' });

    monaco.languages.setMonarchTokensProvider('rgx', {
        defaultToken: "basic",
        tokenPostfix: ".rgx",
        tokenizer: {
            root: [
                ...basicFlags
            ],

            group: [
                [/\?:/, { token: "non-capture-group", bracket: '@open', next: "@nonCaptureGroup" }],
                [/\?=/, { token: "lookahead", bracket: '@open', next: "@lookahead" }],
                [/\?<=/, { token: "lookbehind", bracket: '@open', next: "@lookbehind" }],
                [/\?</, { token: "group-name", bracket: '@open', next: "@namedGroup" }],
                [/\?!/, { token: "negative-lookahead", bracket: '@open', next: "@negativeLookahead" }],
                // [/\(/, { token: "capture-group", bracket: '@open', next: "@captureGroup" }],
                ...basicFlags,
                [/\)/, { token: "group-terminator", bracket: "@close", next: '@pop' }]
            ],

            //(?#...)
            comment: [

                [/\\./, "comment"],
                [/\)/, { token: "comment", bracket: "@close", next: '@pop' }],
                [/./, 'comment'],
            ],

            //(...)
            captureGroup: [
                ...basicFlags,
            ],

            //(?:...)
            nonCaptureGroup: [
                ...basicFlags,
                [/\)/, { token: "group-terminator", bracket: "@close", next: '@pop' }]
            ],

            //(?=...)
            lookahead: [
                ...basicFlags,
                [/\)/, { token: "group-terminator", bracket: "@close", next: '@pop' }]
            ],

            //(?<foobar>baz)
            namedGroup: [
                [/\\./, "group-name"],
                [/>/, { token: "group-name", bracket: "@close", next: '@pop' }],
                [/./, 'group-name'],
            ],

            //(?<=...)
            lookbehind: [
                ...basicFlags,
                [/\)/, { token: "group-terminator", bracket: "@close", next: '@pop' }]
            ],

            //(?!...)
            negativeLookahead: [
                ...basicFlags,
                [/\)/, { token: "group-terminator", bracket: "@close", next: '@pop' }]
            ],

            // {1,99} {99} {,99} {99,}
            quantifier: [
                [/\d+/, 'quantifier-number'],
                [/,/, 'quantifier'],
                [/\}/, { token: "quantifier", bracket: "@close", next: '@pop' }]
            ],

            // [[:alnum:]]
            posix: [
                [/./, "posix-operator"],
                [/:\]\]/, { token: "posix", bracket: "@close", next: '@pop' }],
            ],

            // [a-z] [abcdef()] [^abcdef] [abc\]def]
            literal: [
                [/\\[ux][A-F0-9a-f]{4}(?:-)/i, { token: "unicode-range", bracket: '@open', next: "@unicodeRange" }],
                [/\\[ux][A-F0-9a-f]{2}(?:-)/i, { token: "unicode-range", bracket: '@open', next: "@unicodeRange" }],

                [/\\[ux][A-F0-9a-f]{2}/, "literal-unicode"],
                [/\\[ux][A-F0-9a-f]{4}/, "literal-unicode"],

                [/\\./, "literal-escape"],

                [/.(?:-)/i, { token: "char-range", bracket: '@open', next: "@charRange" }],

                // [/(?<=\/)\]/, "literal"],
                [/\]/, { token: "literal", bracket: "@close", next: '@pop' }],
            ],

            negativeLiteral: [
                [/(?=-)\\[ux][A-F0-9a-f]{4}/i, { token: "unicode-range", bracket: '@open', next: "@unicodeRange" }],
                [/(?=-)\\[ux][A-F0-9a-f]{2}/i, { token: "unicode-range", bracket: '@open', next: "@unicodeRange" }],

                [/\\[ux][A-F0-9a-f]{2}/, "neg-literal-unicode"],
                [/\\[ux][A-F0-9a-f]{4}/, "neg-literal-unicode"],

                [/\\./, "literal-escape"],

                [/.(?:-)/i, { token: "char-range", bracket: '@open', next: "@charRange" }],

                [/\]/, { token: "neg-literal", bracket: "@close", next: '@pop' }],
            ],

            unicodeRange: [
                [/-/, "unicode-range"],
                [/\\[ux][a-f0-9A-F]{4}/, { token: "unicode-range", bracket: "@close", next: '@pop' }],
                [/\\[ux][a-f0-9A-F]{2}/, { token: "unicode-range", bracket: "@close", next: '@pop' }],
            ],

            charRange: [
                [/-/, "char-range"],
                [/\\[ux][a-f0-9A-F]{4}/, { token: "char-range", bracket: "@close", next: '@pop' }],
                [/\\[ux][a-f0-9A-F]{2}/, { token: "char-range", bracket: "@close", next: '@pop' }],
                [/./, { token: "char-range", bracket: "@close", next: '@pop' }],
            ]
        }
    });

    monaco.editor.defineTheme('vs-regex', {
        base: 'vs-dark',
        inherit: true,
        colors: { },
        rules: [
            { token: 'basic.rgx', foreground: '#8eff8e', },
            { token: 'unicode.rgx', foreground: '#009900' },

            { token: 'invalid.rgx', foreground: '#ff0000', fontStyle: 'italic' },
            { token: 'comment.rgx', foreground: '#6a9955', fontStyle: 'italic' },
            { token: 'posix.rgx', foreground: '#8eff8e', },
            { token: 'posix-operator.rgx', foreground: '#8eff8e' },

            // { token: 'literal-operator.rgx', foreground: '#8e8eff' },
            { token: 'literal.rgx', foreground: '#dcdc96' },
            { token: 'literal-unicode.rgx', foreground: '#ffa500' },
            { token: 'literal-escape.rgx', foreground: '#8eff8e' },

            { token: 'char-range.rgx', foreground: '#f0f064' },
            { token: 'unicode-range.rgx', foreground: '#f0f064' },

            { token: 'neg-literal.rgx', foreground: '#d27878' },
            { token: 'neg-literal-unicode.rgx', foreground: '#eb6464' },


            { token: 'quantifier.rgx', foreground: '#8e8eff' },
            { token: 'escape.rgx', foreground: '#8e8eff' },
            { token: 'alternator.rgx', foreground: '#ffa500' },
            // { token: 'quantifier.rgx', foreground: '#8e8eff' },
            // { token: 'quantifier.rgx', foreground: '#8e8eff' },
            // { token: 'quantifier.rgx', foreground: '#8e8eff' },
            // { token: 'quantifier.rgx', foreground: '#8e8eff' },

            { token: 'negative-lookahead.rgx', foreground: '#999999' },
            { token: 'capture-group.rgx', foreground: '#999999' },
            { token: 'non-capture-group.rgx', foreground: '#999999' },
            { token: 'lookahead.rgx', foreground: '#999999' },
            { token: 'lookbehind.rgx', foreground: '#999999' },



            // { token: 'severity-verbose.rgx', foreground: '#90a4ae' },
            // { token: 'severity-debug.rgx',   foreground: '#7cace8' },
            // { token: 'severity-error.rgx',   foreground: '#e43e3e', fontStyle: 'bold' },
            // { token: 'severity-warning.rgx', foreground: '#ff9800' },

            // { token: 'date.rgx',             foreground: '#00bfae' },
            // { token: 'scope.rgx',            foreground: '#aaaaaa' },
            // { token: 'code.rgx',             foreground: '#8aacbc' },

            // { token: 'exception-stack.rgx',  foreground: '#ff9800', fontStyle: 'bold' },
            // { token: 'file-uri1.rgx',         foreground: '#90caf8', fontStyle: 'italic' },
            // { token: 'file-uri2.rgx',         foreground: '#90caf7', fontStyle: 'italic' },
            // { token: 'file-uri3.rgx',         foreground: '#90caf6', fontStyle: 'italic' },
            // { token: 'file-uri4.rgx',         foreground: '#90caf5', fontStyle: 'italic' },
            // { token: 'file-uri5.rgx',         foreground: '#90caf4', fontStyle: 'italic' },
            // { token: 'file-uri6.rgx',         foreground: '#90caf3', fontStyle: 'italic' },
            // { token: 'file-uri7.rgx',         foreground: '#90caf2', fontStyle: 'italic' },
            // { token: 'ip-address.rgx',       foreground: '#90f998', fontStyle: 'italic' },
            // { token: 'file-position.rgx',    foreground: '#b6e7ff' },
            // { token: 'type.rgx',             foreground: '#2196f3' },
            // { token: 'http-method.rgx',      foreground: '#bdbdbd' },
            // { token: 'system-error.rgx',     foreground: '#ffc107' },
            // { token: 'muted.rgx',            foreground: '#777777' },
        ],
    });
}
