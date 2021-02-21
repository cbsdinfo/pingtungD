import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Slider as SilderExtend } from 'antd';
// import { ReactComponent as SilderSVG } from './Assets/img/Silder.svg'
import SilderSVG from './Assets/img/Silder.png';

const SilderExtendStyle = styled(SilderExtend).attrs((props) => ({}))`

    & {
        margin: 0;
    }

    &.ant-slider:hover .ant-slider-rail {
        background: #3d3d3d; 
    }

    &:before {
        content: ${props => `"${props.text}"`};
        position: absolute;
        z-index: 100;
        font-size: 50px;
        color: #fff;
        text-align: center;
        width: 100%;
    }

    & .ant-slider-rail {
        height: 75px;
        background-color: #3d3d3d;
        border-radius: 40px;
    }

    & .ant-slider-track {
        top: 11px;
        height: 60px;
        border-radius: ${props => props?.value > 0 ? "40px 40px 40px 40px" : "40px 8px 8px 40px"};
        background-color: rgba(248,169,30,1);
    }

    && .ant-slider-track {
        left: 1% !important;
    }

    &.ant-slider:hover .ant-slider-track {
        background-color: rgba(248,169,30,1);
    }

    & .ant-slider-handle {
        height: 60px;
        width: 60px;
        top: 16px;
        background-color: rgba(248,169,30,1);
        border: unset;
        z-index: 101;
        margin: ${props => {
        console.log(props?.value)
        return props?.value > 0 ? "-5px 0px 0px -24px" : "-5px 0 0px 42px"
    }};
    }

    & .ant-slider-handle:before {
        content: url(${SilderSVG});
        position: absolute;
        top: 12px;
        left: 8px;
    }
`

export const Silder = (props) => {
    const [Value, setValue] = useState(0);

    return (
        <SilderExtendStyle
            {...props}
            tooltipVisible={false}
            max={100}
            min={0}
            step={1}
            defaultValue={0}
            value={Value}
            onChange={(value) => {
                setValue(value)
            }}
            onAfterChange={(value) => {
                if (value < 90) {
                    setValue(0)
                }
                else {
                    setValue(96)
                    props?.onToRight && props.onToRight()
                }
            }}
        />
    )
}

