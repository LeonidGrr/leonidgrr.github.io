import css from './Header.module.css';

type HeaderProps = {
    header: string,
};

const Header = (props: HeaderProps) => {
    const { header } = props;
    return (
        <header className={css.header}>
            <h1>{header}</h1>
        </header>
    );
};

export default Header;