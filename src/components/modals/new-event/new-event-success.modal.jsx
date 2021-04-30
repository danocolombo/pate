import { createPortal } from 'react-dom';
import './new-event-success.styles.css';
const Modal = ({ isOpened = true, children, onClose }) => {
    if (!isOpened) {
        return null;
    }
    return createPortal(
        <div>
            <div className='new-event-modal-overlay'></div>
            <div className='new-event-modal-wrapper'>
                <div>
                    <div className='new-event-modal-content'>{children}</div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Modal;
