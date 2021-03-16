import { Types } from "../types/Types";
import { FetchConsult } from "../helpers/FetchService";
import Swal from "sweetalert2";
import { uiCloseModalAddTool } from "./../actions/UIAction";
import TopLoaderService from "top-loader-service";

export const toolsLoading = (status = "stock") => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/ver/${status}`);
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(toolLoaded(body.tools));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const activesToolsLoaded = () => {
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(`herramientas/activas`);
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(activesLoaded(body.actives));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeToolByCollaboratorLoading = (collaboratorId) => {
  //No borrar
  return async (dispatch) => {
    try {
      const resp = await FetchConsult(
        `herramientas/activas/colaborador/${collaboratorId}`
      );
      const body = await resp.json();
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };
};

export function registerTool(toolFormValues) {
  return async (dispatch) => {
    const resp = await FetchConsult(
      "herramientas/registrar",
      {
        name: toolFormValues.name,
        liters: toolFormValues.liters,
      },
      "POST"
    );

    const body = await resp.json();
    if (body.status === "success") {
      await dispatch(addToolSuccess());
      await dispatch(toolsLoading());
      await dispatch(uiCloseModalAddTool());
      await Swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
}

export const removeTools = (data) => {
  return async (dispatch) => {
    await TopLoaderService.start();
    try {
      const resp = await FetchConsult(
        `herramientas/eliminar-activos`,
        { tools: data },
        "DELETE"
      );
      const body = await resp.json();

      if (body.status === "success") {
        data.forEach(async function (element) {
          await dispatch(removeInActives(element.active_id));
        });

        dispatch(cleanSelectedActives());

        Swal.fire("Eliminados", body.msg, "success");
        await TopLoaderService.end();
        
      } else {
        await TopLoaderService.end();
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      await TopLoaderService.end();
    }
  };
};

export const addToolSelected = (tool) => {
  return async (dispatch) => {
    dispatch(addToSelectedTools(tool));
  };
};

export const addActiveSelected = (tool) => {
  return async (dispatch) => {
    dispatch(addToSelectedActives(tool));
  };
};

export const addToSelectedTools = (tool) => ({
  type: Types.ADD_TO_SELECT_TOOLS,
  payload: tool,
});

export const removeInSelectedTools = (tool_id) => ({
  type: Types.REMOVE_IN_SELECT_TOOLS,
  payload: tool_id,
});

export const addToSelectedActives = (tool) => ({
  type: Types.ADD_TO_SELECT_ACTIVES,
  payload: tool,
});

export const removeInSelectedActives = (tool_id) => ({
  type: Types.REMOVE_IN_SELECT_ACTIVES,
  payload: tool_id,
});

export const removeInActives = (tool_id) => ({
  type: Types.REMOVE_IN_ACTIVES,
  payload: tool_id,
});

export const cleanSelectedTools = () => ({
  type: Types.CLEAN_SELECT_TOOLS,
});

export const cleanSelectedActives = () => ({
  type: Types.CLEAN_SELECT_ACTIVES,
});

export const addToolSuccess = () => ({
  type: Types.ADD_NEW_TOOL,
});

const toolLoaded = (tools) => ({
  type: Types.TOOLS_LOADED,
  payload: tools,
});

const activesLoaded = (actives) => ({
  type: Types.ACTIVES_LOADED,
  payload: actives,
});
