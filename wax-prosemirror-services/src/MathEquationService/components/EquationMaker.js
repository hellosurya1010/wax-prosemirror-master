import React, { useRef } from 'react'
import { editorUrl } from '../../../../editor-config'


const EquationMaker = (props) => {
    const { fileUpload } = props;

    const mathEditorAreaRef = useRef();

    return (
        <div>

            <iframe ref={mathEditorAreaRef} height={'100%'} src={`${editorUrl}/math_html/index.html`} title="External Content" />
            <button onClick={() => {
                const iframeDocument = mathEditorAreaRef.current.contentDocument || mathEditorAreaRef.current.contentWindow.document;
                const elementInIframe = iframeDocument.querySelector('.output');
                let imageEl = iframeDocument.querySelector('#MathImage');
                let mathMl = iframeDocument.querySelector('#editor-content').innerHTML.replaceAll('>', '»').replaceAll('<', '«');
                console.log(mathMl);
                fileUpload({ src: imageEl.src, mathMl });
            }}>click</button>
        </div>

    )
}

export default EquationMaker