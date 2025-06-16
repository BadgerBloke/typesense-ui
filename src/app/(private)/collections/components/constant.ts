import { FieldType } from 'typesense/lib/Typesense/Collection';

export const DataType: { value: FieldType; label: string }[] = [
    { value: 'string', label: 'String values' },
    { value: 'string[]', label: 'Array of strings' },
    { value: 'int32', label: 'Integer values up to 2,147,483,647' },
    { value: 'int32[]', label: 'Array of int32' },
    { value: 'int64', label: 'Integer values larger than 2,147,483,647' },
    { value: 'int64[]', label: 'Array of int64' },
    { value: 'float', label: 'Floating point / decimal numbers' },
    { value: 'float[]', label: 'Array of floating point / decimal numbers' },
    { value: 'bool', label: 'true or false' },
    { value: 'bool[]', label: 'Array of booleans' },
    { value: 'geopoint', label: 'Latitude and longitude specified as [lat, lng]. Read more here.' },
    {
        value: 'geopoint[]',
        label: 'Arrays of Latitude and longitude specified as [[lat1, lng1], [lat2, lng2]]. Read more here.',
    },
    { value: 'object', label: 'Nested objects. Read more here.' },
    { value: 'object[]', label: 'Arrays of nested objects. Read more here.' },
    { value: 'string*', label: 'Special type that automatically converts values to a string or string[].' },
    {
        value: 'image',
        label: 'Special type that is used to indicate a base64 encoded string of an image used for Image search.',
    },
    {
        value: 'auto',
        label: 'Special type that automatically attempts to infer the data type based on the documents added to the collection. See automatic schema detection',
    },
];

export const Locales = [
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ko', label: 'Korean' },
    { value: 'th', label: 'Thai' },
    { value: 'el', label: 'Greek' },
    { value: 'ru', label: 'Russian' },
    { value: 'sr', label: 'Serbian / Cyrillic' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'be', label: 'Belarusian' },
];
