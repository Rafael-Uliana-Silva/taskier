import React from 'react';
import PropTypes from 'prop-types'
import { ModalForm } from './FormStyle';
import Sidebar from '../Sidebar/Sidebar.jsx';

const SidebarMobile = ({ abrirModal, tema, setTema }) => {
  return (
    <ModalForm>
      <Sidebar             
        abrirModal={() => abrirModal('quadro')}
        tema={tema}
        setTema={setTema}
        isMobile={true} />
    </ModalForm>
  );
};

SidebarMobile.propTypes = {
  abrirModal: PropTypes.func,
  tema: PropTypes.string,
  setTema: PropTypes.func,
}

export default SidebarMobile;
