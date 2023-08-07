import React, { useRef, useState } from 'react'
import { editorUrl } from '../../../../editor-config'

const getSelectedMathMlData = ({ state }) => {
    let mathMl = null;
    const selection = state.selection;
    if (!selection.empty && selection.node.type.name == 'image') {
        mathMl = selection.node.attrs.extraData?.mathml?.replaceAll('»', '>')?.replaceAll('«', '<') ?? null;
    }
    return mathMl;
}

const EquationMaker = (props) => {
    const { fileUpload, view } = props;
    const { state } = view;
    const [status, setStatus] = useState('Insert');
    const mathMl = getSelectedMathMlData({ state });

    const mathEditorAreaRef = useRef();

    console.log({ mathMl });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <iframe
                ref={mathEditorAreaRef}
                style={{ height: '200px', width: '100%' }}
                src={`${editorUrl}/math_html/index.html`}
                title="External Content"
                onLoad={e => {
                    const iframeDocument = mathEditorAreaRef.current.contentDocument || mathEditorAreaRef.current.contentWindow.document;
                    if (mathMl) {
                        iframeDocument.querySelector('#editor-content').innerHTML = mathMl;
                    }
                }}
            />
            <button
                style={{ width: '100px', marginTop: '5px', }}
                onClick={async () => {
                    setStatus('Inserting');
                    const iframeDocument = mathEditorAreaRef.current.contentDocument || mathEditorAreaRef.current.contentWindow.document;
                    const elementInIframe = iframeDocument.querySelector('.output');
                    const convertButton = iframeDocument.querySelector('#convertButton');
                    await convertButton?.click();
                    let imageEl = iframeDocument.querySelector('#MathImage');
                    let mathMlSrc = iframeDocument.querySelector('#editor-content').innerHTML.replaceAll('>', '»').replaceAll('<', '«');
                    if (mathMl) {
                        const { from, to } = state.selection;
                        const selectedNode = state.doc.cut(from, to);
                        const imageAttrs = selectedNode.content.content[0].content.content[0].attrs;
                        const updatedNode = selectedNode.content;
                        imageAttrs.extraData.mathml = mathMlSrc;
                        const attrs = {
                            ...imageAttrs,
                            'data-custom-attr': 'new-value',
                            src: imageEl.src,
                        };
                        console.log(attrs);
                        let tr = state.tr.setNodeMarkup(from, undefined, attrs);
                        view.dispatch(tr);
                        // const transaction = state.tr.replaceWith(from, to, imageNode);
                        // view.dispatch(transaction);
                    } else {
                        fileUpload({ src: imageEl.src, mathml: mathMlSrc });
                    }
                    setStatus('Inserted');
                    setTimeout(() => {
                        setStatus('Insert');
                    }, 2000);
                }}>{status}</button>
        </div>

    )
}

export default EquationMaker