/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import diaries from '../../data/diaries';
import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';


const getEntries = (): Array<DiaryEntry> => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    // Specifically exclude the unwanted fields (comment in this case)
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const addDiary = ( entry: NewDiaryEntry ) : DiaryEntry => {
    // Create a specific id, and take a copy of entry for other parameters
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) +1,
        ...entry
    }

    diaries.push(newDiaryEntry);

    return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);

    return entry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};