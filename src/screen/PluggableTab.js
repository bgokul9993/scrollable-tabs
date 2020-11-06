//IMPORTING DEPENDENCIES
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled, { css } from 'styled-components'
import Sortable from 'react-sortablejs'
import AutosizeInput from 'react-input-autosize';

//IMPORTING COMPONENTS
import ConfirmationModal from 'common/ConfirmationModal'

//IMPORTING UTILS
import { cloneDeep, isEqual, findIndex } from 'lodash';
import { arrayMove } from "utils/helpers";

//IMPORTING CONSTANTS
import { MAX_TAB_LIMIT } from "constants/app";

//IMPORTING IMAGES
import { ArrowIcon } from "icons/ArrowIcon";

class TabListContainer extends Component {
    constructor(props) {
        super(props);
        const tabs = [1, 2, 3].map(item => ({ title: `Tab${item}`, content: `Tab ${item} contents` }));
        this.state = {
            containerScrollPosition: {
                scrollLeft: 0,
                scrollWidth: 0,
                clientWidth: 0
            },
            tabTitles: tabs.map(item => {
                return item.title
            }),
            tabs,
            currentTab: 0,
            isAddTabBoxShadowVisible: false,
            isSliderBoxShadowVisible: false,
            isSliderVisible: false,
            openDeleteTabModal: {
                show: false,
                index: 0
            }
        };
        this.tabList = [];
        this.tabActionDropDown = [];
        this.tabListContainer = undefined;
    }

    componentDidMount() {
        this.refTabListContainer = ReactDOM.findDOMNode(this.tabListContainer);
        this.setState({
            containerScrollPosition: {
                scrollLeft: this.refTabListContainer.scrollLeft
            }
        });
    }

    componentDidUpdate() {
        if (this.refTabListContainer) {
            let isVisible = this.refTabListContainer.scrollWidth > this.refTabListContainer.clientWidth;
            if (isVisible !== this.state.isSliderVisible) {
                this.setState({ isSliderVisible: isVisible })
            }
        }
    }

    switchTabs = (currentTab) => {
        this.setState({ currentTab });
    }

    updateTabs = (updatedTabs, switchTab) => {
        this.setState({
            tabs: updatedTabs,
            tabTitles: updatedTabs.map(item => {
                return item.title
            })
        })
        if (switchTab) {
            this.setState({ currentTab: updatedTabs.length - 1 }, () => {
                this.moveLeft();
            })
        }
    }

    addTab = () => {
        const { tabs } = this.state;
        let updatedTabs = cloneDeep(tabs);
        updatedTabs.push({
            title: `Tab${updatedTabs.length + 1}`,
            content: `Tab ${updatedTabs.length + 1} contents`
        });
        this.updateTabs(updatedTabs, true);
    }

    deleteTab = (index) => {
        const { tabs } = this.state;
        let updatedTabs = cloneDeep(tabs);
        updatedTabs.splice(index, 1);
        this.tabActionDropDown.splice(index, 1);
        this.updateTabs(updatedTabs);
        index === 0 ? this.switchTabs(index) : this.switchTabs(index - 1);
        this.setState({ openDeleteTabModal: { show: false } });
    }

    saveTab = (index) => {
        let allTitles = cloneDeep(this.state.tabTitles);
        const { tabs } = this.state;
        let updatedTabs = cloneDeep(tabs);
        updatedTabs[index].title = this.state.tabTitles[index];
        if (updatedTabs[index].title) {
            this.updateTabs(updatedTabs);
        }
        else {
            this.setState({ tabTitles: allTitles })
        }
    }

    performAction = (action, index, e) => {
        const { tabs } = this.state;
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        switch (action) {
            case "DELETE_TAB":
                if (tabs.length === 1) return;
                this.setState({ openDeleteTabModal: { show: true, index }})
                break;
            case "SAVE_TAB":
                this.saveTab(index);
                break;
            case "ADD_TAB":
                this.addTab();
                break;
            case "DOUBLE_CLICK":
                this.handleListItemDoubleClick(index);
                break;
            default:
        }
    }

    handleInputBlur = (index, e) => {
        this.editRef = null
        this.setState({ editIndex: null, tempEditIndex: index })
        this.performAction("SAVE_TAB", index)
    }

    handleInputKeyDown = (index, e) => {
        if (e.keyCode === 13 || e.which === 13) {
            this.handleInputBlur(index);
        }
    }

    handleInputChange = (index, e) => {
        let allTitles = cloneDeep(this.state.tabTitles);
        allTitles[index] = this.editRef.input.value;
        this.setState({ tabTitles: allTitles })
    }

    closeEmptyAlert = () => {
        const { tempEditIndex } = this.state;
        this.setState({ editIndex: tempEditIndex })
    }

    handleListItemClick = (index, e) => {
        const { currentTab } = this.state;
        e.stopPropagation();
        if (index !== currentTab) {
            this.switchTabs(index, e)
        }
    }

    handleListItemDoubleClick = (index) => {
        this.setState({ editIndex: index });
    }

    moveLeft = (e) => {
        this.refTabListContainer.scrollLeft += 400;
        this.setState({
            containerScrollPosition: {
                scrollLeft: this.refTabListContainer.scrollLeft
            }
        })
    }

    moveRight = (e) => {
        this.refTabListContainer.scrollLeft -= 400;
        this.setState({
            containerScrollPosition: {
                scrollLeft: this.refTabListContainer.scrollLeft
            }
        })
    }

    getContainerScrollPosition = () => {
        if (this.refTabListContainer) {
            let isVisible = this.refTabListContainer.scrollWidth > this.refTabListContainer.clientWidth;
            if (isVisible !== this.state.isSliderVisible) {
                this.setState({ isSliderVisible: isVisible })
            }
        }
    }

    isSliderBoxShadowVisible = () => {
        if (this.refTabListContainer) {
            let isSliderBoxShadowVisible = this.refTabListContainer.scrollLeft + this.refTabListContainer.clientWidth < this.refTabListContainer.scrollWidth;
            if (isSliderBoxShadowVisible !== this.state.isSliderBoxShadowVisible) {
                this.setState({ isSliderBoxShadowVisible: isSliderBoxShadowVisible })
            }
        }
    }

    isAddTabBoxShadowVisible = () => {
        if (this.refTabListContainer) {
            let isAddTabBoxShadowVisible = this.refTabListContainer.scrollLeft !== 0;
            if (isAddTabBoxShadowVisible !== this.state.isAddTabBoxShadowVisible) {
                this.setState({ isAddTabBoxShadowVisible: isAddTabBoxShadowVisible })
            }
        }

    }

    handleChangeOverride = (order, sortable, event) => {
        const { oldIndex, newIndex } = event;
        const { tabs, currentTab } = this.state;
        let updatedTabs = cloneDeep(tabs);
        updatedTabs = arrayMove(updatedTabs, oldIndex, newIndex);
        this.setState({
            tabs: updatedTabs
        })
        let _updatedCurrentTab = findIndex(updatedTabs, tabs[currentTab]);
        if (!isEqual(updatedTabs[currentTab], tabs[currentTab])) {
            let updatedCurrentTab = findIndex(updatedTabs, tabs[currentTab]);
            this.switchTabs(updatedCurrentTab);
        }

        this.setState({
            tabs: updatedTabs,
            currentTab: _updatedCurrentTab,
            tabTitles: updatedTabs.map(item => {
                return item.title;
            })
        });

        this.updateTabs(updatedTabs);
    }

    handleTabOnClick = () => {
        const { tabs } = this.state;
        if (tabs.length < MAX_TAB_LIMIT) {
            this.performAction("ADD_TAB")
        }
    }

    handleTabContainerScroll = (e) => {
        this.isSliderBoxShadowVisible();
        this.isAddTabBoxShadowVisible();
    }

    handleSortableChange = (order, sortable, evt) => {
        this.handleChangeOverride(order, sortable, evt)
    }

    getTabList = () => {
        const { tabTitles, tabs, currentTab, editIndex } = this.state;
        const hideDelete = tabs.length === 1;
        return (
            tabs.map((value, index) => {
                return (
                    <ContainerWrapper active={index === currentTab} key={value.title + index} data-id={index}>
                        {editIndex === index ?
                            <AutosizeInput
                                ref={el => {
                                    this.editRef = el;
                                    el && el.input && el.input.focus();
                                }}
                                onBlur={this.handleInputBlur.bind(this, index)}
                                onKeyDown={this.handleInputKeyDown.bind(this, index)}
                                onChange={this.handleInputChange.bind(this, index)}
                                value={tabTitles[index]}
                                className="rename-tab"
                            />
                            :
                            <ListItemWrapper active={index === currentTab}>
                                <ItemWrapper
                                    onClick={this.handleListItemClick.bind(this, index)}
                                    onDoubleClick={this.performAction.bind(this, "DOUBLE_CLICK", index)}
                                    active={index === currentTab}
                                    title={tabTitles[index]}
                                    tabIndex={0}>
                                    <Item>{tabTitles[index]}</Item>
                                </ItemWrapper>
                            </ListItemWrapper>
                        }
                        {!hideDelete && editIndex !== index && <Delete className="delete" onClick={() => this.performAction('DELETE_TAB', index)}> X </Delete>}
                    </ContainerWrapper>
                )
            })
        )
    }

    render() {
        const {
            containerScrollPosition,
            isAddTabBoxShadowVisible,
            isSliderBoxShadowVisible,
            currentTab,
            openDeleteTabModal,
            tabTitles,
            isSliderVisible,
            tabs
        } = this.state;

        const options = {
            direction: "horizontal",
            animation: 250
        }

        this.isAddTabBoxShadowVisible();
        this.getContainerScrollPosition();

        return (
            <React.Fragment>
                <Section>
                    <TopNav className="report-tab-list-container">
                        <Slider isVisible={isSliderVisible} right isBoxShadowVisible={isAddTabBoxShadowVisible} scrollAreaAvailable={containerScrollPosition}>
                            <SliderArrow disabled={!isAddTabBoxShadowVisible} onClick={this.moveRight} ><ArrowIcon width="14" height="14" isLeft /></SliderArrow>
                        </Slider>
                        <TabListWrapper
                            ref={e => { this.tabListContainer = e }}
                            onScroll={this.handleTabContainerScroll}
                        >
                            <Sortable
                                className="tab-list-container"
                                options={options}
                                onChange={this.handleSortableChange}
                            >
                                {this.getTabList()}
                            </Sortable>
                        </TabListWrapper>
                        <Slider isVisible={isSliderVisible} left isBoxShadowVisible={isSliderBoxShadowVisible} scrollAreaAvailable={containerScrollPosition}>
                            <SliderArrow disabled={!isSliderBoxShadowVisible} onClick={this.moveLeft}><ArrowIcon width="14" height="14" isRight /></SliderArrow>
                        </Slider>
                        <ItemWrapperAddTab id="reportTabAdd" title="Add Tab" isBoxShadowVisible={isAddTabBoxShadowVisible} disabled={tabs.length === MAX_TAB_LIMIT}
                            onClick={this.handleTabOnClick}
                            tabIndex={0}>
                            <ItemAdd disabled={tabs.length === MAX_TAB_LIMIT}>
                                <div className="addTabIcon" />
                            </ItemAdd>
                        </ItemWrapperAddTab>
                    </TopNav>
                    <Body>
                        {tabs[currentTab].content}
                    </Body>
                </Section>
                {openDeleteTabModal.show && <ConfirmationModal
                    modalTitle="Confirm Delete"
                    setConfirm={() => this.deleteTab(openDeleteTabModal.index)}
                    closeModal={() => this.setState({ openDeleteTabModal: { show: false } })}
                    modalContent={<span>Are you sure you want to delete <b>{`${tabTitles[openDeleteTabModal.index]}`}</b>?</span>}
                    confirmationMsg="Delete"
                />}
            </React.Fragment>
        )
    }
}

const Section = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Body = styled.div`
    margin: 30px;
    padding: 20px;
    border: 1px dashed #dadfe3;
    font-size: 23px;
    border-radius: 4px;
`;

const Delete = styled.div`
    visibility: hidden;
    position: absolute;
    right: 8px;
    top: 4px;
    color: #475867;
    font-size: 12px;
`;

const Slider = styled.div`
    display: flex;
    align-items: center;
    box-shadow: ${props => props.isBoxShadowVisible ? props.right ? "4px 1px 4px 0px rgba(18,52,77,0.24)" : "-4px 1px 4px 0px rgba(18,52,77,0.24)" : "none"};
    visibility: ${props => props.isVisible ? "visible" : "hidden"};
    z-index:1;
`

const SliderArrow = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 32px;
    ${props => props.disabled && `
        cursor: not-allowed;
        opacity: 0.3;
    `}
`
const TabListWrapper = styled.div`
    overflow: auto;
    transform: translae3d(0,0,0);
    transition: all 200ms linear;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
        display: none;
    }
    ${props => props.disabled && `
        pointer-events: none;
    `}
`

const Item = styled.div`
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    text-align: center;
`

const ItemAdd = styled.div`
    display: flex;
    ${props => props.disabled && css`
        opacity: 0.6;
        pointer-events: none;
    `}
`

const ItemWrapper = styled.div`
    align-items: center;
    display: flex;
    line-height: 16px;
    color: ${props => props.active ? "#2C5CC5" : "#475867"};
    font-size: 14px;
    font-weight: bold;
    padding: 12px 24px;
    background-color: ${props => props.active ? "#FFFFFF" : "#F5F7F9"};
    cursor: pointer;
    outline: none !important;
    border-bottom: 2px solid ${props => props.active ? "#2C5CC5" : "transparent"};
`

const ItemWrapperAddTab = styled(ItemWrapper)`
    border-right: 1px solid #D3DAE0;
    z-index: 1;
    padding-right: 10px !important;
    ${props => props.disabled && css`
        opacity: 0.6;
        cursor: not-allowed;
    `
    }
    width: 56px;
    justify-content: center;
`

const ContainerWrapper = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    line-height: 16px;
    font-size: 14px;
    font-weight: bold;
    border-right: 1px solid #D3DAE0;
    height: 100%;
    background-color: ${props => props.active ? "#FFFFFF" : "#F5F7F9"};
    cursor: pointer;

    &:hover {
        .delete {
            visibility: visible !important;
        }
    }
`

const TopNav = styled.div`
    display: flex;
    width: 100%;
    background-color: #F5F7F9;
    width: 100%;
    border-top: 1px solid #dadfe3;
    overflow-y: hidden;
`

const ListItemWrapper = styled.div`
    height: 100%;
    display: flex;
`

export default TabListContainer;
