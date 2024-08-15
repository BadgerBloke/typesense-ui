/* eslint-disable no-extend-native */
String.prototype.toCamelCase = function (): string {
    return this.split(' ')
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
};

String.prototype.slugify = function (): string {
    return this.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

String.prototype.formattedDate = function (): string {
    const date = new Date(String(this));
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });
};

String.prototype.fromCamelToSpaceSeparated = function (): string {
    return this.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};

String.prototype.fromSnakeToSentenceCase = function (preserveCaseSubstrings?: string[]): string {
    return this.split('_')
        .map(word => {
            if (preserveCaseSubstrings?.includes(word)) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
};

String.prototype.dotNotedToReadable = function (): string {
    return this.split('.')
        .map(s => {
            const withSpaces = s.replace(/([A-Z])/g, ' $1').toLowerCase();
            return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
        })
        .join(' -> ');
};

String.prototype.templateStringToValue = function (variables: Record<string, string>): string {
    return this.replace(/{{(.*?)}}/g, (_, key) => {
        return variables[key.trim()] || `{{${key}}}`;
    });
};

String.prototype.convertToJson = function (): string {
    return this.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":').replace(/'/g, '"');
};

export {};
