import styles from './GridLayout.module.scss';


// GridContainer.js
export const GridContainer = ({ children } : React.PropsWithChildren) => <div className={styles.container}>{children}</div>;

// GridRow.js

interface GridRowProps extends React.PropsWithChildren{
    className?: string;
}

export const GridRow = ({ children, className }: GridRowProps ) => <div className={`${styles.row} ${className}`}>{children}</div>;

// GridColumn.js

type ColumnSpan = number | [number, number]; // span | [start, end]

const BREAKPOINTS_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

interface GridColumnProps extends React.PropsWithChildren {
    xs?: ColumnSpan | 'hidden';
    sm?: ColumnSpan | 'hidden';
    md?: ColumnSpan | 'hidden';
    lg?: ColumnSpan | 'hidden';
    xl?: ColumnSpan | 'hidden';
    xxl?: ColumnSpan | 'hidden';
}

export const GridColumn = ({ xs, sm, md, lg, xl, xxl, children }: GridColumnProps) => {
    const classes = new Array<string>(7);
    classes[0]  = styles.column;

    const breakpoints = [xs, sm, md, lg, xl, xxl];
    breakpoints.forEach((breakpoint, index) => {
        if (breakpoint === 'hidden') {
            for (let i = index; i >= 0; i = i-1) {
                classes[i+1] = `${styles[`hidden-${BREAKPOINTS_ORDER[i]}`]}`;
            }
        } else if (typeof breakpoint === 'number') {
            for (let i = index; i < BREAKPOINTS_ORDER.length; i = i+1)
                classes[i+1] = `${styles[`${BREAKPOINTS_ORDER[i]}-${breakpoint}`]}`;
        } else if (breakpoint) {
            for (let i = index; i < BREAKPOINTS_ORDER.length; i = i+1)
                classes[i+1] = `${styles[`${BREAKPOINTS_ORDER[i]}-${breakpoint[0]}-${breakpoint[1]}`]}`;
        }
    })

    return <div className={classes.join(' ')}>{children}</div>;
};