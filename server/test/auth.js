const { chai, server, should } = require("./testConfig");
const UserModel = require("../models/UserModel");

// Este test valida las rutas:

// (1) Login
// (2) Register
// (3) Resend Confirm OTP
// (4) Verify Confirm OTP
describe("auth",()=>{
    
    // Se borra toda la información de la BD antes de ejecutar la prueba
    before((done)=>{
        UserModel.deleteMany({},(err)=>{
            done();
        });
    });

    // Usuario de prueba
    const testData={
        "firstName":"Usuario",
        "lastName":"Prueba",
        "email":"usuario@de.prueba",
        "password":"123456789"
    };

    const testRoute = "/api/auth/";

    // Test POST para /api/auth/register
    describe("/POST Register",()=>{
        it("Debe enviar error de validacion",(done)=>{
            chai.request(server)
            .post(testRoute+"register")
            .send({"email":testData.email})
            .end((err,res)=>{
                res.should.have.status(400);
                done();
            });
        });
    });
    
    // Test POST para /api/auth/register
    describe("/POST Register",()=>{
        it("Debe registrar un usuario",(done)=>{
            chai.request(server)
                .post(testRoute+"register")
                .send(testData)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("Registro exitoso.");
                    testData._id=res.body.data._id;
                    done();
                });
        });
    });
    
    
});