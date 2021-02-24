import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CanvasDraw from "react-canvas-draw";
// import { ReactComponent as SilderSVG } from './Assets/img/Silder.svg'
// import SilderSVG from './Assets/img/Silder.png';
import { BasicContainer } from '../../Components';
import { isEqual } from 'lodash';

// const SilderExtendStyle = styled(SilderExtend).attrs((props) => ({}))`

//     & {
//         margin: 0;
//         height: 75px;
//         padding: 0;
//         background-color: transparent;
//     }

//     &.ant-slider:hover .ant-slider-rail {
//         background: #3d3d3d; 
//     }

//     &:before {
//         content: ${props => `"${props.text}"`};
//         position: absolute;
//         z-index: 100;
//         font-size: 36px;
//         height: 75px;
//         top: 10px;
//         color: #fff;
//         text-align: center;
//         width: 100%;
//     }

//     & .ant-slider-rail {
//         height: 75px;
//         background-color: #3d3d3d;
//         border-radius: 40px;
//     }

//     & .ant-slider-track {
//         top: 11px;
//         height: 60px;
//         border-radius: ${props => props?.value > 0 ? "40px 40px 40px 40px" : "40px 8px 8px 40px"};
//         background-color: rgba(248,169,30,1);
//     }

//     && .ant-slider-track {
//         left: 1% !important;
//     }

//     &.ant-slider:hover .ant-slider-track {
//         background-color: rgba(248,169,30,1);
//     }

//     & .ant-slider-handle {
//         height: 60px;
//         width: 60px;
//         top: 16px;
//         background-color: rgba(248,169,30,1);
//         border: unset;
//         z-index: 101;
//         margin: ${props => props?.value > 0 ? "-5px 0px 0px -24px" : "-5px 0 0px 42px"};
//     }

//     & .ant-slider-handle:before {
//         content: url(${SilderSVG});
//         position: absolute;
//         top: 12px;
//         left: 8px;
//     }
// `

export const Sign = (props) => {
    const [SaveableCanvas, setSaveableCanvas] = useState(0);

    return (
        <>
            <BasicContainer>
                <BasicContainer
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            background: "#383838",
                            padding: "4px 0",
                            height: "49px",
                        })
                    }}
                >
                    {/* <button
                        onClick={() => {
                            localStorage.setItem(
                                "savedDrawing",
                                SaveableCanvas.getSaveData()
                            );
                        }}
                    >
                        Save
                    </button> */}
                    <button
                        onClick={() => {
                            SaveableCanvas.clear();
                            localStorage.removeItem(`${props?.primaryKey}_savedDrawing`)
                        }}
                        style={{
                            position: "absolute",
                            right: "140px",
                            fontWeight: 900,
                            background: "#383838",
                            border: "1px solid #FFFFFF",
                            borderRadius: "50px",
                            color: "#fff",
                            width: "123px",
                            height: "41px",
                        }}
                    >
                        清空
                    </button>

                    <button
                        onClick={() => {
                            localStorage.setItem(
                                `${props?.primaryKey}_savedDrawing`,
                                SaveableCanvas.getSaveData()
                            );

                            props?.sendOnClick
                                &&
                                props.sendOnClick(
                                    SaveableCanvas?.canvas?.drawing?.toDataURL('image/png'),
                                    isEqual(JSON.parse(SaveableCanvas.getSaveData())?.lines, []),
                                    () => { localStorage.removeItem(`${props?.primaryKey}_savedDrawing`) }
                                )
                        }}
                        style={{
                            position: "absolute",
                            right: "9px",
                            fontWeight: 900,
                            background: "#FFFFFF",
                            border: "1px solid #383838",
                            borderRadius: "50px",
                            color: "#383838",
                            width: "123px",
                            height: "41px",
                        }}
                    >
                        送出簽名
                    </button>
                    {/* <button
                        onClick={() => {
                            SaveableCanvas.undo();
                        }}
                    >
                        Undo
                    </button> */}

                </BasicContainer>

                <CanvasDraw
                    ref={canvasDraw => (setSaveableCanvas(canvasDraw))}
                    brushColor={"black"}
                    brushRadius={2}
                    lazyRadius={0}
                    canvasWidth={"100%"}
                    canvasHeight={`${props?.height - 49}px`}
                    saveData={
                        (props?.primaryKey && localStorage.getItem(`${props?.primaryKey}_savedDrawing`))
                            ?
                            localStorage.getItem(`${props?.primaryKey}_savedDrawing`)
                            :
                            JSON.stringify({ "height": `${props?.height - 49}px`, "lines": [], "width": "100%" })
                    }
                    hideGrid
                />

                {/* <button
                    onClick={() => {
                        this.loadableCanvas.loadSaveData(
                            localStorage.getItem("savedDrawing")
                        );
                    }}
                >
                    loadableCanvas
                </button> */}
                {/* <CanvasDraw
                    disabled
                    hideGrid
                    ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                    saveData={localStorage.getItem("savedDrawing")}
                /> */}

            </BasicContainer>
        </>
    )
}

