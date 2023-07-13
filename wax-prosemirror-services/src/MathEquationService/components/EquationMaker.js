import React from 'react'
import './html/css/normalize.css'
import './html/css/skeleton.css'
import './html/css/math.css'
import './html/js/jquery.js'
import './html/js/lib/keypress-2.1.5.min.js'
import './html/js/symbol-entities.js'
import './html/js/math-editor.js'


const EquationMaker = () => {
    return (
        <>
            <div className="menus">
                <a
                    id="subsup"
                    title="subscript superscript"
                    className="button button-primary"
                >
                    □<sub>□</sub>
                </a>
                <a id="root" title="square root" className="button button-primary">
                    <math>
                        <msqrt>
                            <mrow>
                                <mi>□</mi>
                            </mrow>
                        </msqrt>
                    </math>
                </a>
                <a id="frac" title="fraction" className="button button-primary">
                    <math>
                        <mfrac>
                            <mi>□</mi>
                            <mi>□</mi>
                        </mfrac>
                    </math>
                </a>
                <a id="underover" title="under and over" className="button button-primary">
                    <math>
                        <munderover>
                            <mi>∑</mi>
                            <mi>□</mi>
                            <mi>□</mi>
                        </munderover>
                    </math>
                </a>
                <a id="matrix" title="fence and matrices" className="button button-primary">
                    <math>
                        <mo>(</mo>
                        <mtable>
                            <mtr>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                                <mtd>
                                    <mi>□</mi>
                                </mtd>
                            </mtr>
                        </mtable>
                        <mo>)</mo>
                    </math>
                </a>
                <a id="greek" title="greek" className="button button-primary">
                    <math>
                        <mrow>
                            <mi>α</mi>
                            <mi>β</mi>
                        </mrow>
                    </math>
                </a>
                <a id="math" title="math symbols" className="button button-primary">
                    <math>
                        <mrow>
                            <mi>∑</mi>
                            <mi>∞</mi>
                        </mrow>
                    </math>
                </a>
                <a id="text" title="math symbols" className="button button-primary">
                    <math>
                        <mrow>
                            <mtext>Text</mtext>
                        </mrow>
                    </math>
                </a>
                <a id="aboutus" title="About Us" className="button button-primary">
                    <img className="logo" src="img/mlq_logo.svg" />
                </a>
            </div>
            <br />
            <br />
            <br />
            <div className="output" contentEditable="true">
                <math displaystyle="true">
                    <mmultiscripts>
                        <mrow>
                            <mi>F</mi>
                        </mrow>
                        <mrow>
                            <mi>k</mi>
                        </mrow>
                        <mrow>
                            <mi>l</mi>
                        </mrow>
                        <mprescripts />
                        <mrow>
                            <mi>i</mi>
                        </mrow>
                        <mrow>
                            <mi>j</mi>
                        </mrow>
                    </mmultiscripts>
                    <mo>=</mo>
                    <mfrac>
                        <mrow>
                            <mi>a</mi>
                            <mo>+</mo>
                            <mi>b</mi>
                        </mrow>
                        <mrow>
                            <mi>c</mi>
                            <mo>+</mo>
                            <mi>d</mi>
                        </mrow>
                    </mfrac>
                    <mi>&nbsp;</mi>
                </math>
            </div>
            <button
                id="insmath"
                className="button button-primary"
                onclick="sendMathML();"
            >
                Insert Math
            </button>
            <textarea
                id="mathmlcode"
                cols={50}
                rows={7}
                ondblclick="this.style.display='none';"
                title="Double-click on this to remove the code area"
                defaultValue={""}
            />
        </>

    )
}

export default EquationMaker