import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "react-filter-search";
import { Link } from "react-router-dom";

import {
  activesToolsLoaded, //BYSTATUS
  removeTools,
  addToolSelected,
  removeInSelectedTools,
} from "../../actions/ToolAction";
import { UseForm } from "../../hooks/UseForm";
import Swal from "sweetalert2";

export const ActiveScreen = () => {
  const dispatch = useDispatch();
  const { actives, selectedTools, tools } = useSelector((state) => state.tool);

  useEffect(() => {
    dispatch(activesToolsLoaded());
  }, [dispatch]);

  const [formValues, handleInputChange] = UseForm({
    filter: "",
    document_id: "",
  });

  const { filter, document_id } = formValues;

  const toggleCheckbox = (e, active) => {
    if (e.target.checked) {
      dispatch(addToolSelected({ tool_id: active.tool._id }));
    } else {
      dispatch(removeInSelectedTools(active._id));
    }
  };

  const removeManyTool = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "La herramienta se regresara a Bodega",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar de activos",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(removeTools(selectedTools));
      }
    });
  };

  return (
    <>
      <div className="bg-indigo-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
        <div>
          <h2 className="text-2xl">HERRAMIENTAS ACTIVAS</h2>
          <p className="text-blue-100 opacity-70">
            Funcionalidades principales
          </p>
        </div>
        <nav className="md:flex md:space-x-4 space-y-2 md:space-y-0">
          <Link
            to="/listar-herramientas"
            className="inline-flex flex-col justify-center items-center m-1 px-3 py-3 bg-indigo-900 rounded-lg hover:bg-gray-800 w-35"
          >
            <i className="fas fa-arrow-circle-left"></i>
            <span className="text-white font-bold">
              Regresar a Herramientas
            </span>
          </Link>
        </nav>
      </div>

      <div className="bg-gray-700 rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 ">
        <h2 className="text-green-400 text-xl font-bold mb-2">
          HERRAMIENTAS EN USO
        </h2>
        <input
          type="text"
          name="filter"
          className="rounded-t-lg w-1/4 h-4 p-4 placeholder-blue-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
          placeholder="Filtrar por ..."
          value={filter}
          onChange={handleInputChange}
        />
        <span className="bg-green-200 text-green-600 md:ml-2 py-1 px-1 rounded-t-lg  inline-block text-center uppercase">
          <i className="fas fa-tools"></i> {`total: ${actives.length}`}
        </span>

        <div className="overflow-x-auto py-4">
          <button
            onClick={() => removeManyTool()}
            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:bg-red-600 outline-none focus:outline-none mr-1 mb-1"
            type="button"
            hidden={selectedTools.length === 0}
            style={{ transition: "all .15s ease" }}
          >
            <i className="fas fa-trash-alt"></i> Eliminar marcados
          </button>
          <div className="align-middle inline-block min-w-full overflow-hidden">
            <SearchResults
              value={filter}
              data={actives}
              renderResults={(results) => (
                <table className="min-w-full">
                  <thead className="bg-gray-600">
                    <tr className="bg-gray-600 text-white text-lg">
                      <th className="py-2 px-4">
                        <i className="fas fa-check"></i> Marcar
                      </th>
                      <th className="p-4 w-1/4">
                        <i className="fas fa-user"></i> Nombre completo
                      </th>
                      <th className="py-2 px-4">
                        <i className="fas fa-id-card"></i> Cedula
                      </th>
                      <th className="py-2 px-3">
                        <i className="fas fa-wrench"></i> Herramienta
                      </th>
                      <th className="py-2 px-3"># Codigo</th>
                      <th className="py-2 px-3">
                        <i className="far fa-calendar-alt"></i> Registrada
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-grey-600 divide-solid text-blue-100 text-opacity-80 whitespace-nowrap">
                    {results.map((active) => (
                      <tr key={active._id}>
                        <th className="py-3 px-2">
                          <label className="inline-flex items-center mt-3 ">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5"
                              defaultChecked={false}
                              onChange={(e) => toggleCheckbox(e, active)}
                            />
                          </label>
                        </th>
                        <th className="py-3 px-3">{`${active.collaborator.name} ${active.collaborator.surname}`}</th>
                        <th className="py-3 px-3">
                          {active.collaborator.document_id}
                        </th>

                        <th className="py-3 px-3">{active.tool.name}</th>
                        <th className="py-3 px-3">{active.tool.active_num}</th>
                        <th className="py-3 px-3">{active.date_active}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};