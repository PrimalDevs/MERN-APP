import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {

    return (
        <div>
            <div className="row btn-group">
                <button className="btn btn-success"><Link to="/home/user/create">Nuevo usuario</Link></button>
            </div>
            <div>
                <table className="table table-striped table-hover card-text">
                    <thead>
                        <tr>
                            <th>Nick</th>
                            <th>Correo electronico</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <th>1@1.com</th>
                            <th>Admin</th>
                            <th>
                                <div className="btn-group" role="group">
                                    <button className="btn btn-primary">Ver</button>
                                    <button className="btn btn-warning">Editar</button>
                                    <button className="btn btn-danger">Eliminar</button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Index;
