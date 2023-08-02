import React, { useRef, useState } from 'react'
import { editorUrl } from '../../../../editor-config'

const getSelectedMathMlData = ({ state }) => {
    let mathMl = null;
    const selection = state.selection;
    if (!selection.empty) {
        if (selection.node.type.name == 'image' && selection.node.attrs.extraData && selection.node.attrs.extraData.mathMl) {
            mathMl = selection.node.attrs.extraData.mathMl.replaceAll('»', '>').replaceAll('«', '<');
        }
        return mathMl;
    }
}

const EquationMaker = (props) => {
    const { fileUpload, view } = props;
    const { state } = view;
    const [status, setStatus] = useState('Insert');
    const mathMl = getSelectedMathMlData({state});

    const mathEditorAreaRef = useRef();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <iframe
                ref={mathEditorAreaRef}
                style={{ height: '200px', width: '100%' }}
                src={`${editorUrl}/math_html/index.html`}
                title="External Content"
                onLoad={e => {
                    const iframeDocument = mathEditorAreaRef.current.contentDocument || mathEditorAreaRef.current.contentWindow.document;
                    console.log(e, iframeDocument);
                    if (mathMl) {
                        iframeDocument.querySelector('#editor-content').innerHTML = mathMl;
                    }
                }}
            />
            <button
                style={{ width: '100px', marginTop: '5px', }}
                onClick={() => {
                    setStatus('Inserting');
                    const iframeDocument = mathEditorAreaRef.current.contentDocument || mathEditorAreaRef.current.contentWindow.document;
                    const elementInIframe = iframeDocument.querySelector('.output');
                    const convertButton = iframeDocument.querySelector('#convertButton');
                    convertButton?.click();
                    let imageEl = iframeDocument.querySelector('#MathImage');
                    let mathMl = iframeDocument.querySelector('#editor-content').innerHTML.replaceAll('>', '»').replaceAll('<', '«');
                    console.log(mathMl);
                    if (mathMl) {
                        const { from, to } = state.selection;
                        const selectedNode = state.doc.cut(from, to);
                        const updatedNode = selectedNode.content;
                        console.log(updatedNode.attrs);
                        updatedNode.attrs = {
                            ...selectedNode.attrs,
                            'data-custom-attr': 'new-value',
                        };
                        const transaction = state.tr.replaceWith(from, to, updatedNode);
                        view.dispatch(transaction);
                    } else {
                        fileUpload({ src: imageEl.src, mathMl });
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