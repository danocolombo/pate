import { createPortal } from 'react-dom';
import './modifyRegisteredUsers.styles.scss';
const Modal = ({ isOpened = true, children, onClose }) => {
    if (!isOpened) {
        return null;
    }
    return createPortal(
        <div>
            <div className='modal-overlay'></div>
            <div className='modal-wrapper'>
                <div>
                    <div className='modal-content'>{children}</div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Modal;
