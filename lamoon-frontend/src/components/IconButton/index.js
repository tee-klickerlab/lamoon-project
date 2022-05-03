const IconButton = ({ children, color, classes, wrapper: Wrapper, wrapperProps, ...other }) => {
    const extraClass = classes ? ` ${classes}` : "";

    if (Wrapper) {
        return (
            <Wrapper {...wrapperProps}>
                <button
                    {...other}
                    className={`icon-button${extraClass}`}
                    style={{ backgroundColor: color }}
                    type="button"
                >
                    {children}
                </button>
            </Wrapper>
        );
    } else {
        return (
            <button {...other} className={`icon-button${extraClass}`} style={{ backgroundColor: color }} type="button">
                {children}
            </button>
        );
    }
};

export default IconButton;
