import { useSelector, useDispatch } from "react-redux";

import { openDateModal, closeDateModal } from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const handleOpenDateModal = () => {
    dispatch(openDateModal());
  };

  const handleCloseDateModal = () => {
    dispatch(closeDateModal());
  };

  const toggleDateModal = () => {
    isDateModalOpen ? handleCloseDateModal() : handleOpenDateModal();
  };

  return {
    // * Properties
    isDateModalOpen,

    // * Methods
    handleOpenDateModal,
    handleCloseDateModal,
    toggleDateModal,
  };
};
