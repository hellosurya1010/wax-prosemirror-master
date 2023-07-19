export const getAttributesOfElement = ({element}) => {
    const attributes = element.attributes;
    let attrs = {};
    for (let i = 0; i < attributes.length; i++) {
        const attributeName = attributes[i].name;
        const attributeValue = attributes[i].value;
        attrs[attributeName]= attributeValue;
    }
    return attrs;
}