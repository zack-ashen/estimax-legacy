
import { GridContainer, GridRow } from '../GridLayout/GridLayout';
import NavBar from '../NavBar/NavBar';
import styles from './AppLayout.module.scss';

export enum PageSizes {
    SMALL = 1200,
    MEDIUM = 1600,
    LARGE = 1800
}


interface AppLayoutProps extends React.PropsWithChildren{
    maxWidth?: PageSizes;
}

export default function AppLayout({ maxWidth, children } : AppLayoutProps) {
    return (
        <div className={styles.AppLayout} style={ { maxWidth } }>
            <NavBar />
            <GridContainer>
                {children}
            </GridContainer>
        </div>
    )
}