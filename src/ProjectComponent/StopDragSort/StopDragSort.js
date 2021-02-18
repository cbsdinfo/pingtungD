import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Fin } from './Assets/img/Fin.svg'
import { ReactComponent as Start } from './Assets/img/Start.svg'
import { /*useDrop, useDrag, Droppable*/ } from 'react-dnd';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { isNil } from 'lodash';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


//#region 基礎按鈕
export const StopDragSortBase = React.forwardRef((props, ref) => {

    const [Stops, setStops] = useState([]); // 右方穿梭框 id 集合

    useEffect(() => {
        // 隱藏 warning
        window['__react-beautiful-dnd-disable-dev-warnings'] = true;
    }, [])

    useEffect(() => {
        setStops(props.stops)
        // console.log(props.stops)
        if (!isNil(props.stops)) {
            props?.onChange && props.onChange(props.stops ?? [])
        }

    }, [props.stops, props.onChange])

    const { scrollBarRef } = ref ?? {};
    //const { ref1, ref2 } = ref;

    const onDragEnd = (result) => {
        // dropped outside the list

        if (!result.destination) {
            return;
        }

        const items = reorder(
            Stops,
            result.source.index,
            result.destination.index
        );

        props?.onChange && props.onChange(items);

        setStops(items);
    }

    return (
        <>
            {/* 最外層容器  */}
            <BasicContainer

                {...props.containerEvent}
                className={`${props.className} container`}
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({
                        ...props,
                    }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")
                }}
            >
                {/* 容器內滾動條 */}
                <ScrollBar
                    ref={scrollBarRef}
                    autoHide={props.autoHide ?? true}
                    className={`scrollBar`}
                    basedefaulttheme={"DefaultTheme"}
                    theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "scrollBar") }}
                >

                    {/* <BasicContainer
                        {...props.ContentContainerEvent}
                        className={`contentContainer`}
                        baseDefaultTheme={"DefaultTheme"}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "contentContainer") }} //吃theme
                    > */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {/* 容器內 ScrollBar 下容器 接受容器 */}
                            {(provided, snapshot) => (
                                <BasicContainer
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    {...props.ContentContainerEvent}
                                    className={`dropContainer`}
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{
                                        ...iterateTheme(
                                            {
                                                ...props,
                                                length: Stops.length,
                                                isDraggingOver: snapshot.isDraggingOver,
                                            },
                                            props.theme, switchDefaultTheme(props.baseDefaultTheme), "dropContainer")
                                    }}
                                >
                                    {Stops.map((stop, index, arr) => (
                                        <Draggable key={stop.id} draggableId={stop.id} index={index}>
                                            {(provided, snapshot) => (
                                                <StopComponent
                                                    ref={provided.innerRef}
                                                    draggableProps={{ ...provided.draggableProps }}
                                                    dragHandleProps={{ ...provided.dragHandleProps }}
                                                    // style={getItemStyle(
                                                    //     snapshot.isDragging,
                                                    //     provided.draggableProps.style
                                                    // )}
                                                    key={index}
                                                    sort={index + 1}
                                                    length={arr?.length}
                                                    id={`${stop.id}`}
                                                    text={stop.title}
                                                    snapshot={snapshot}
                                                >
                                                    {stop.content}
                                                </StopComponent>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </BasicContainer>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* </BasicContainer> */}
                </ScrollBar>
            </BasicContainer >
        </>
    )
})

export const StopDragSort = styled(StopDragSortBase).attrs((props) => ({}))`
`
//#endregion

//#region 站牌組件
const StopComponent = React.forwardRef((props, ref) => {

    return (

        <BasicContainer
            className={`stop ${props?.snapshot.isDragging ? "isDragging" : ""}`}
            baseDefaultTheme={"DefaultTheme"}
            ref={ref}
            {...props.draggableProps}
            {...props.dragHandleProps}

            theme={{
                ...iterateTheme({
                    ...props,
                    isDragging: props?.snapshot.isDragging,
                }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "stop")
            }}
        >
            {props.sort === 1 && <Start style={{ position: "absolute", top: "-12px", left: "18px", zIndex: 100 }} />}
            {props.sort === props.length && <Fin style={{ position: "absolute", top: "-10px", left: "18px", zIndex: 100 }} />}
            {/* 排序index */}
            <Text
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({
                        ...props,
                        isDragging: props?.snapshot.isDragging,
                    }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "sort")
                }}
            >
                {props.sort}
            </Text>
            {/* 名字 */}
            <Text
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({
                        ...props,
                        isDragging: props?.snapshot.isDragging,
                    }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "name")
                }}
            >
                {props?.text}
            </Text>
        </BasicContainer>


    )
})
//#endregion



