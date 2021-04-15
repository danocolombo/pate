import {createPortal} from 'react-dom';
import './modal.css'
const Modal = ({isOpened = true, children, onClose}) => {
    if(!isOpened){
        return null;
    }
    return createPortal(
        <div>
            <div className='modal-overlay'></div>
            <div className='modal-wrapper'>
                <div>
                    <span className='close-button' onClick={onClose}>X</span>
                    <div className='modal-content'>{children}</div>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );     
}

export default Modal
