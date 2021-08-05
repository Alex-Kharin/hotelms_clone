import Modal from 'react-modal'
import React, {useState} from 'react'
import style from './SettingsMenuItem.module.css'


Modal.setAppElement('#root')

export function withModal(WrappedComponent) {
    return (props) => {
        let [showModal, setShowModal] = useState(props.isOpenModal || false)
        const openModal = () => setShowModal(true)
        const closeModal = () => {
            setShowModal(false)
            if (props.hasOwnProperty('setIsOpenModal')) props.setIsOpenModal(false)
        }

        return (
            <>
                <WrappedComponent openModal={openModal} {...props} />
                <Modal isOpen={showModal}
                       contentLabel={'settings'}
                       className={style.Modal}
                       overlayClassName={style.Overlay}
                       onRequestClose={closeModal}
                       shouldCloseOnOverlayClick={false}
                       shouldCloseOnEsc={true}
                >
                    {React.Children.map(props.children, (child) => {
                        if (React.isValidElement(child) && typeof(child.type) !== 'string' ) {
                            return React.cloneElement(child, {closeModal})
                        }
                        return child
                    })}
                </Modal>
            </>
        )
    }
}