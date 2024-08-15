declare global {
    interface String {
        formattedDate(): string;
        slugify(): string;
        toCamelCase(): string;
        fromCamelToSpaceSeparated(): string;
        fromSnakeToSentenceCase(preserveCaseSubstrings?: string[]): string;
        dotNotedToReadable(): string;
        templateStringToValue(variables: Record<string, string>): string;
        convertToJson(): string;
    }
}

export {};
