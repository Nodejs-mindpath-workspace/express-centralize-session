import Constants from "../types/constants/constant";

const constants: Constants = {
    LITERALS: {
        STRING: {
            EMPTY: (): string => "",
        },
        BOOLEAN: {
            TRUE: (): boolean => true,
            FALSE: (): boolean => false,
        },
    },
    ARRAY: {
        EMPTY: <T>(): Array<T> => <Array<T>>[],
    },
    OBJECT: {
        EMPTY: <T>(): T => <T>{},
    },
};

export default constants;
