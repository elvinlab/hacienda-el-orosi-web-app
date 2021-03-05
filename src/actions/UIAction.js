import { Types } from "../types/Types";

export const uiOpenMenu = () => ({ type: Types.UI_OPEN_MENU });
export const uiCloseMenu = () => ({ type: Types.UI_CLOSE_MENU });

export const uiOpenModalFee = () => ({ type: Types.UI_OPEN_MODAL_FEES });
export const uiCloseModalFee = () => ({ type: Types.UI_CLOSE_MODAL_FEES });

export const uiOpenModalAddLend = () => ({
  type: Types.UI_OPEN_MODAL_ADD_LEND,
});
export const uiCloseModalAddLend = () => ({
  type: Types.UI_CLOSE_MODAL_ADD_LEND,
});

export const uiOpenModalAddTool = () => ({
  type: Types.UI_OPEN_MODAL_ADD_TOOL,
});
export const uiCloseModalAddTool = () => ({
  type: Types.UI_CLOSE_MODAL_ADD_TOOL,
});

export const uiOpenModalActive = () => ({ type: Types.UI_OPEN_MODAL_ACTIVES });
export const uiCloseModalActive = () => ({ type: Types.UI_CLOSE_MODAL_ACTIVES });