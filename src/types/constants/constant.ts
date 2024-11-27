type Constants = {
    LITERALS: {
        STRING: {
            EMPTY: () => string;
        };
        BOOLEAN: {
            TRUE: () => boolean;
            FALSE: () => boolean;
        };
    };
    ARRAY: {
        EMPTY: <T>() => Array<T>;
    };
    OBJECT: {
        EMPTY: <T>() => T;
    };
};

export default Constants;
