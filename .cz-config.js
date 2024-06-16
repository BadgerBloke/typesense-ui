module.exports = {
    types: [
        { value: 'feat', name: 'feat: A new feature' },
        { value: 'fix', name: 'fix: A bug fix' },
        {
            value: 'docs',
            name: 'docs: Documentation only changes',
        },
        {
            value: 'style',
            name: 'style: Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
        },
        { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
        { value: 'perf', name: 'perf: A code change that improves performance' },
        { value: 'test', name: 'test: Adding missing tests' },
        {
            value: 'chore',
            name: 'chore: Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
        },
        { value: 'revert', name: 'revert:   Revert to a commit' },
        { value: 'WIP', name: 'WIP: Work in progress' },
    ],
    scopes: [
        { name: 'component' },
        { name: 'page' },
        { name: 'asset' },
        { name: 'core' },
        { name: 'configs' },
        { name: 'deps' },
        { name: 'docker' },
        { name: 'docs' },
        { name: 'setup' },
    ],

    appendBranchNameToCommitMessage: false,
    allowTicketNumber: true,
    isTicketNumberRequired: true,
    ticketNumberPrefix: 'mk-',
    // Limit ticket number to numbers
    ticketNumberRegExp: '\\d{1,5}',
    // Append ticket number to commit message
    appendTicketNumber: true,
    isSubjectEmpty: false,
    questions: {
        scopes: {
            required: true,
        },
        subject: {
            required: true,
            minLength: 10,
        },
        body: {
            required: true,
        },
    },
    // format: '{type}({ticketNumber}): {scope} >>> {subject}',
    formatter: '@commitlint/format',
    // formatter: '{type}({ticketNumber}): {scope} >>> {subject}',
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w*)(?:\(([UI]+-[0-9]+)\))?\: (.*)$/,
            headerCorrespondence: ['type', 'scope', 'subject'],
            issuePrefixes: ['mk-'],
        },
    },

    // override the messages, defaults are as follows
    messages: {
        type: "Select the type of change that you're committing:",
        scope: 'Denote the SCOPE of this change:',
        // used if allowCustomScopes is true
        customScope: 'Denote the SCOPE of this change:',
        subject: 'Write a SHORT, IMPERATIVE tense description of the change (i.e.,Subject):\n',
        body: 'Provide a LONGER description of the change. Use "|" to break new line (optional):\n',
        breaking: 'List any BREAKING CHANGES (optional):\n',
        footer: 'List any JIRA ISSUES CLOSED by this change (optional). E.g.: mk-101, mk-125:\n',
        confirmCommit: 'Are you sure you want to proceed with the commit above?',
        ticketNumber: 'Enter ticket number (digits only). Prefix "mk-" will be added automatically:',
    },

    allowCustomScopes: false,
    allowBreakingChanges: ['feat', 'fix', 'refactor'],
    formatter: '@commitlint/format',
    subjectLimit: 100,
    breaklineChar: '|', // It is supported for fields body and footer.
    footerPrefix: '',
    askForBreakingChangeFirst: true,
};
