import React, { useRef } from 'react'
import { editorUrl } from '../../../../editor-config'


const EquationMaker = () => {

    const mathEditorAreaRef = useRef();

    return (
        <div>

            <iframe ref={mathEditorAreaRef} height={'100%'} src={`${editorUrl}/math_html/index.html`} title="External Content" />
            <button onClick={() => {

                const iframeDocument = mathEditorAreaRef.current.contentDocument || mathEditorAreaRef.current.contentWindow.document;
                const elementInIframe = iframeDocument.querySelector('.output');
                console.log(elementInIframe.innerHTML);
            }}>click</button>
        </div>

    )
}

export default EquationMaker