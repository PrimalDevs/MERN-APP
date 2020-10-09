import React from 'react';

const Create = () => {
    return (
        <div>
            <form className="form-horizontal" id="createUserForm">

                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Nick</label>
                    <div className="col-md-9">
                        <input id="nickname" name="nickname" type="text" placeholder="Nick" className="form-control form-control-warning" required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Email</label>
                    <div className="col-md-9">
                        <input id="emailC" name="emailC" type="email" placeholder="Email" className="form-control form-control-warning" required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Rol</label>
                    <div className="col-md-9">
                        <select name="createSelectRol" className="form-control" id="createSelectRol">
                            <option value="no" selected>Seleccione un rol</option>

                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Contraseña</label>
                    <div className="col-md-9">
                        <input id="password1" name="password1" type="password" placeholder="Password" className="form-control form-control-warning" required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Validar contraseña</label>
                    <div className="col-md-9">
                        <input id="password2" name="password2" type="password" placeholder="Password" className="form-control form-control-warning" required />
                    </div>
                </div>

                <button className="btn btn-success" value="create">Crear</button>
            </form>
        </div>
    )
}

export default Create;