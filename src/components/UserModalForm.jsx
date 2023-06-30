/* eslint-disable react/prop-types */
import { UserForm } from "./UserForm";

export const UserModalForm = ({
  userSelected,
  initialUserForm,
  handlerAddUser,
  handlerCloseForm,
}) => {
  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userSelected.id > 0 ? "Editar" : "Crear"} Usuario
              </h5>
            </div>
            <div className="modal-body">
              <UserForm
                userSelected={userSelected}
                initialUserForm={initialUserForm}
                handlerAddUser={handlerAddUser}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
