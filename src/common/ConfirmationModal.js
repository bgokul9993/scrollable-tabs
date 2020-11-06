import React from "react";
import styled from "styled-components";

const ConfirmationModal = ({
    modalTitle,
    setConfirm,
    closeModal,
    modalContent,
    isDanger,
    confirmationMsg
}) => {
    return (
        <ModalOverLay
            style={{}}
        >
            <ModalContent onOuterClick={() => closeModal}>
                <StyledForm>
                    <ModalBody>
                        <ModalTitle> {modalTitle} </ModalTitle>
                        <ModalSection>
                            {modalContent}
                        </ModalSection>
                    </ModalBody>
                    <ModalFooter rightAlign className="flex">
                        <Button type="button" onClick={closeModal}>Cancel</Button>
                        <Button type="button" danger onClick={setConfirm}> {confirmationMsg} </Button>
                    </ModalFooter>
                </StyledForm>
            </ModalContent>
        </ModalOverLay>
    );
};

export default ConfirmationModal;


const ModalSection = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #475867;
  font-weight: 400;

  b {
    word-break: break-word;
  }
`;

const ModalOverLay = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(18,52,77,0.5);
    display: flex;
    justify-content: center;
`;

const ModalContent = styled.div`
    border-radius: 0 0 6px 6px;
    width: 400px;
`;

const Button = styled.button`
    text-align: center;
    margin-left: 14px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    min-width: 100px;
    font-weight: 600;

    ${props => props.danger ? 
        `
            color: #fff;
            border: 1px solid #C82124;
            background: linear-gradient(180deg, #D72D30 0%, #C82124 100%);
            box-shadow: 0 1px 0 0 rgba(24,50,71,0.05);
        `
        :
        `
            color: #000;
            border: 1px solid #ffffff;
            background: #ffffff;
            box-shadow: 0 1px 0 0 rgba(24,50,71,0.05);
        `
    };
`;

export const ModalHeader = styled.div`
    background-color: #F9F9F9;
    padding: 24px 32px;
`;

export const ModalBody = styled.div`
    padding: 24px 16px;
    background: white;
    width: 100%;
`

export const ModalFooter = styled.div`
    text-align: right;
    padding: 12px 16px;
    border-radius: 0 0 6px 6px;
    background: #f5f7f9;
    width: 100% !important;
`;

export const ModalTitle = styled.h2`
	font-size: 16px;
	font-weight: 600;
    text-align: left;
    padding-bottom: 10px;
    line-height: 24px;
`;

export const StyledForm = styled.form`
  width: 400px;
  background-color: #F9F9F9;
  border-radius: 0 0 6px 6px;
`;