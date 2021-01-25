import React from 'react';
import './auth.css';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
import {loginUser, registerUser} from '../../config/redux/actions';
import Logo1s from '../images/To the stars-pana.svg';

class Auth extends React.Component {
    state = {
        nama: '',
        email: '',
        password: '',
        codeUser: '',
        detectChats: false,
        namaError: '',
        passwordError: '',
        emailErrorLogin: '',
        passwordErrorLogin: ''
    }

    componentDidMount() {
        localStorage.clear();
        const dataUser = {
            email: '',
            password: ''
        }
        localStorage.setItem('dataLogin2', JSON.stringify(dataUser))
    }

    valueChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    gabung = () => {
        this.setState({
            detectChats: true,
            nama: '',
            deskripsi: '',
            email: '',
            password: '',
            codeUser: '',
        })
    }

    daftar = () => {
        this.setState({
            detectChats: false,
            nama: '',
            deskripsi: '',
            email: '',
            password: '',
            codeUser: '',
        })
    }

    validate = () => {
        const { nama, email, password, deskripsi } = this.state;
        if(!nama.length) {
            this.setState({
                namaError: 'nama harus di isi!'
            })
            return false
        }else {
            this.setState({
                namaError: ''
            })
        }
        if(!email.length) {
            this.setState({
                emailError: 'email harus di isi!'
            })
            return false
        }else {
            this.setState({
                emailError: ''
            })
        }
        if(password.length < 5) {
            this.setState({
                passwordError: 'pastikan lebih dari 4 (kata/nomer/simbol)'
            })
            return false
        }else {
            this.setState({
                passwordError: ''
            })
        }
        if(deskripsi.length < 11 || !deskripsi.length) {
            this.setState({
                deskripsiError: 'pastikan lebih dari 10 kata'
            })
            return false
        }else {
            this.setState({
                deskripsiError: ''
            })
        }

        return true
    }

    validateLogin = () => {
        const { email, password } = this.state;
        if(!email.length) {
            this.setState({
                emailErrorLogin: 'pastikan email benar dan di isi!'
            })
            return false
        }else {
            this.setState({
                emailErrorLogin: ''
            })
        }
        if(!password.length) {
            this.setState({
                passwordErrorLogin: 'pastikan password benar dan di isi!'
            })
            return false
        }else {
            this.setState({
                passwordErrorLogin: ''
            })
        }

        return true
    }

    registerChats = (e) => {
        e.preventDefault();

        const {register} = this.props;
        let code = '';
        let codes = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnop12345678';
        const codesL = codes.length;
        for(var i = 0; i <= 5; i++ ) {
            code += codes.charAt(Math.floor(Math.random() * codesL))
        }

        const dataUser = {
            nama: this.state.nama,
            email: this.state.email,
            password: this.state.password,
            code_user: code,
        }

        const regis = register({dataUser});
        if(regis && this.validate() === true) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'success',
                title: `telah mendapat akses login`
              })

              this.setState({
                  nama: '',
                  deskripsi: '',
                  email: '',
                  password: '',
                  codeUser: '',
                })

        }else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'warning',
                title: `terjadi kesalahan, periksa lagi!`
              })
        }
    }

    loginChats = (e) => {
        e.preventDefault();
        const {login} = this.props;

        const dataUser = {
            email: this.state.email,
            password: this.state.password
        }

        const log = login({dataUser});
        if(log && this.validateLogin() === true) {
            localStorage.setItem('dataLogin2', JSON.stringify(dataUser))
            this.props.history.push('/home')
        }else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'warning',
                title: `oh tidak!, gagal login`
              })
        }

    }

    render() {
        const { valueChange, registerChats, loginChats, gabung, daftar } = this;
        const { nama, email, password, detectChats, emailError, namaError, passwordError, emailErrorLogin, passwordErrorLogin } = this.state;

        return (
            <div>
                <img src={Logo1s} alt="bg-auth" className="space" />
                <div className="form-auth">
                    {
                        detectChats ? (
                            <h2>
                                gabung diskusi | <span className="lg-rg lgs-full gabung" onClick={gabung}>gabung</span><span className="lg-rg lgs-set daftar" onClick={daftar}>daftar</span>
                            </h2>
                        ) :
                            <h2>
                                daftar diskusi | <span className="lg-rg lgs-set gabung" onClick={gabung}>gabung</span><span className="lg-rg lgs-full daftar" onClick={daftar}>daftar</span>
                            </h2>
                    }
                    {
                        detectChats ? (
                            <div>

                                <div className="form-chats-mulaiu">
                                    <span>email pengguna</span>
                                    <br />
                                    <br />
                                    <input type="email" name="email" value={email} className="input-chats-mulai" onChange={valueChange} />
                                    <br />
                                    <span className="span-error">{emailErrorLogin}</span>
                                </div>
                                <div className="form-chats-mulaiu">
                                    <span>password</span>
                                    <br />
                                    <br />
                                    <input type="password" name="password" value={password} className="input-chats-mulai" onChange={valueChange} />
                                    <br />
                                    <span className="span-error">{passwordErrorLogin}</span>
                                </div>

                                <button className="btn-mulai" type="submit" onClick={loginChats}><i className="las la-comment-dots"></i> mulai gabung</button>

                            </div>
                        ) :
                            <div>

                                <div className="form-chats-mulaiu">
                                    <span>nama pengguna</span>
                                    <br />
                                    <br />
                                    <input type="text" name="nama" value={nama} className="input-chats-mulai" onChange={valueChange} />
                                    <br />
                                    <span className="span-error">{namaError}</span>
                                </div>
                                <div className="form-chats-mulaiu">
                                    <span>email pengguna</span>
                                    <br />
                                    <br />
                                    <input type="email" name="email" value={email} className="input-chats-mulai" onChange={valueChange} />
                                    <br />
                                    <span className="span-error">{emailError}</span>
                                </div>
                                <div className="form-chats-mulaiu">
                                    <span>password email</span>
                                    <br />
                                    <br />
                                    <input type="password" name="password" value={password} className="input-chats-mulai" onChange={valueChange} />
                                    <br />
                                    <span className="span-error">{passwordError}</span>
                                </div>
                                <button className="btn-mulai" type="submit" onClick={registerChats}><i className="las la-comment-dots"></i> mulai daftar</button>

                            </div>
                    }
                </div>
            </div>
        )
    }
}

const getActionRedux = (dispatch) => {
    return {
        register: (data) => dispatch(registerUser(data)),
        login: (data) => dispatch(loginUser(data))
    }
}

export default connect(null, getActionRedux)(Auth);
