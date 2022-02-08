import { NewDiaryEntry, Weather, Visibility } from './types';

// Unknown --> don't yet need to define the type to match any type, but can first verify the type and then confirm the expected type
type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };

const toNewDiaryEntry = ({ comment, date, weather, visibility } : Fields): NewDiaryEntry => {
    const newEntry: NewDiaryEntry = {
        comment: parseComment(comment),
        date: parseDate(date),
        weather: parseWeather(weather),
        visibility: parseVisibility(visibility)
    };

    return newEntry;
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }

    return comment;
};

// Need 2 forms of check to recognize a string created via '=' or via 'new String(...)'
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

// Need to use 'any' and not string, otherwise the '.inculudes' doesn't compile
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
    return Object.values(Weather).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
    return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

/****************************
 *          Exports         *
 ****************************/
export default toNewDiaryEntry;