export const shorthands = undefined;

export const up = (pgm) => {
    pgm.addColumn('threads', {
        raw_description: { type: 'text', notNull: false }
    }, { ifNotExists: true });
};

export const down = (pgm) => {};
