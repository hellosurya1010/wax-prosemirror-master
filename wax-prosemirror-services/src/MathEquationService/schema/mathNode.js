const mathNode = props => {
    const { tag, group } = props;

    return {
        group,
        content: 'inline+',
        inline: true,
        atom: true,
        toDOM() {
            return [tag, 0]
        },
        parseDOM: [{ tag: tag }],
    }
};


export default mathNode;