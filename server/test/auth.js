const { chai, server, should } = require("./testConfig");
const UserModel = require("../models/UserModel");

// Este test valida las rutas:

// (1) Login
// (2) Register
// (3) Resend Confirm OTP
// (4) Verify Confirm OTP
describe("auth",()=>{
    
    before((done)=>{
        UserModel.deleteMany({},(err)=>{
            done();
        });
    });

    const testData={
        "firstName":"Usuario",
        "lastName":"Prueba",
        "email":"usuario@mail.com",
        "password":"123456789"
    };

    const testRoute = "/api/auth/";

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
    
	describe("/POST Login", () => {
		it("Debe responder que la cuenta no esta confirmada", (done) => {
			chai.request(server)
				.post(testRoute+"login")
				.send({"email": testData.email,"password": testData.password})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("message").eql("Su cuenta no, esta confirmada, por favor confirme su cuenta.");
					done();
				});
		});
	});

	describe("/POST Resend  Confirm OTP", () => {
		it("Debe reenviar el codigo de verificacion OTP", (done) => {
			chai.request(server)
				.post(testRoute+"resend-verify-otp")
				.send({"email": testData.email})
				.end((err, res) => {
					res.should.have.status(200);
					UserModel.findOne({_id: testData._id},"confirmOTP").then((user)=>{                
						testData.confirmOTP = user.confirmOTP;
						done();
					});
				});
		});
    });
    

    describe("/POST Verify Confirm OTP", () => {
        it("Debe confirmar la cuenta via OTP", (done) => {
            chai.request(server)
                .post(testRoute+"verify-otp")
                .send({"email": testData.email, "otp": testData.confirmOTP})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("/POST Login", () => {
        it("Debe enviar error de validacion para login", (done) => {
            chai.request(server)
                .post(testRoute+"login")
                .send({"email": testData.email})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("/POST Login", () => {
        it("Debe fallar el login, cuenta no existe", (done) => {
            chai.request(server)
                .post(testRoute+"login")
                .send({"email": "random@mail.com","password": "random"})
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property("message").eql("Su correo o contraseña son incorrectos");
                    done();
                });
        });
    });

    describe("/POST Login", () => {
        it("Debe realizar login", (done) => {
            chai.request(server)
                .post(testRoute+"login")
                .send({"email": testData.email,"password": testData.password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql("Login Exitoso.");
                    done();
                });
        });
    });
});