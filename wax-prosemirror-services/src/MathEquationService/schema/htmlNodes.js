import { error } from "jquery";
import { getAttributesOfElement } from "../../../helpers/domHelper";

export const htmlTags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'embed', 'fieldset', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'style', 'sub', 'summary', 'sup', 'svg', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',];

// ['code','em', 'link', 'strong', 'img', 'figcaption', 'figure',]

export const createHtmlNode = props => {
    const { createNode } = props;

    htmlTags.forEach(tag => {
        if (tag) {
            createNode({
                [tag]: {
                    group: "inline",
                    content: 'inline+',
                    inline: true,
                    atom: true,
                    attrs: {
                        type: {default: 'undefined'}
                    },
                    toDOM(hook, next) {
                        console.log("toDOM" ,hook);
                        // hook.value = [tag, {class: "test"}, 0];
                        hook.value = [tag, hook.node.attrs, 0];
                        next();
                    },
                    parseDOM: [{
                        tag: tag,
                        getAttrs(hook, next) {
                            console.log('parseDom', hook);
                            if (hook.dom) {
                                let attrs = getAttributesOfElement({ element: hook.dom });
                                Object.assign(hook, attrs);
                            }
                            next();
                        },
                    }],
                }
            },
                { toWaxSchema: true }
            )
        }
    });

};


