import React from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
// My imports.
import Modal from '../../UI/Modal';
import Cart from '../../Cart/Cart';

// Only rerender if cartIsShown has changed.
function cartStateChanged(prevProps, nextProps) {
  return prevProps.cartIsShown === nextProps.cartIsShown;
}

function CartModal({ cartIsShown, onClose, onToSignIn }) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {cartIsShown && (
        <Modal onClose={onClose}>
          <Cart onClose={onClose} onToSignIn={onToSignIn} />
        </Modal>
      )}
    </AnimatePresence>,
    document.querySelector('#overlays')
  );
}

export default React.memo(CartModal, cartStateChanged);