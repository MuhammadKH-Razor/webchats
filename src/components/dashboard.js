import React from 'react';
import './dashboard.css';
import {
    addChats,
    addGrup,
    addGrupUsers,
    getGrupAll,
    getChats,
    deleteGroupUser,
    deleteChat,
    addGrupNotif,
    getNotif,
    updateGrupName,
    getGrupAllProvider
} from '../config/redux/actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import logo1 from './images/Untitled-200.png';
import ClipboardJS from 'clipboard';
import { createHashHistory } from 'history'

class Dashboard extends React.Component {

    state = {
        groupName: '',
        chatsText: '',
        chatsData: [],
        errorChats: '',
        ip_adrees: [],
        namaGrup: '',
        kodeGrup: '',
        deskripsiGrup: '',
        dibuatGrup: '',
        maxGrup: 0.00,
        dataGroups: null,
        dataGrupsProvider: null,
        emailUser: [],
        username: null,
        listChats: [],
        kodeGrupFromLS: null,
        namaGrupSelected: '',
        kodeGrupSelected: '',
        codeGrupNew: '',
        detect: false,
        namaGrupJoin: '',
        maxGrupJoin: 0.00,
        deskripsiGrupJoin: '',
        emailUserJoin: '',
        dibuatGrupJoin: '',
        namaGrupBaru: '',
        allNotif: null,
        nameError: '',
        detectUser: false,
        datasX: null
    }

    componentDidMount() {
        const { getGrupAll, getChats, getGrupAllProviders } = this.props;

        getGrupAll();
        getChats();
        getGrupAllProviders();

        this.setState({
            dataGrups: JSON.parse(localStorage.getItem('data')),
            dataGrupsProvider: JSON.parse(localStorage.getItem('data2')),
            username: JSON.parse(localStorage.getItem('dataLogin')),
            emailUser: JSON.parse(localStorage.getItem('dataLogin2')),
            listChats: JSON.parse(localStorage.getItem('listChats')),
            kodeGrupFromLS: JSON.parse(localStorage.getItem('kode_grup')),
            allNotif: JSON.parse(localStorage.getItem('dataNotif'))
        })

        if (this.state.emailUser.email === "") {
            const history = createHashHistory();
            history.push('/')
        }

    }

    valueChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendChats = (e) => {
        e.preventDefault();
        const { chatsText, username } = this.state;
        const { addChats } = this.props;

        let code = '';
        let code2 = '';
        let codes = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnop12345678';
        let codes2 = 'ABCDEFGHIJQRSTUVXYZabcdefghijklmnop12378';
        const codesL = codes.length;
        const codesL2 = codes2.length;
        for (var i = 0; i <= 5; i++) {
            code += codes.charAt(Math.floor(Math.random() * codesL))
            code2 += codes2.charAt(Math.floor(Math.random() * codesL2))
        }

        const date = new Date();
        const months = ['january', 'february', 'maret', 'april', 'mai', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desamber'];
        const tanggal = new Date().getDate();
        const month = date.getMonth();
        const bulan = months[month];
        const tahun = date.getFullYear();
        const jam = date.getHours();
        const menit = date.getMinutes();

        const fullTime = `${tanggal}-${bulan}-${tahun}`;
        const halfTime = `${jam}:${menit}`;

        const kodeGrups = JSON.parse(localStorage.getItem('kode_grup'));

        const dataUser = JSON.parse(localStorage.getItem('dataLogin'))
        const dataUser2 = JSON.parse(localStorage.getItem('dataLogin2'))

        const dataChats = {
            kodeUser: dataUser[0].data.code,
            kodeGrup: kodeGrups,
            isiChats: chatsText,
            dibuat: fullTime,
            emailPengirim: dataUser2.email,
            namaPengirim: dataUser[0].data.username,
            jamPengiriman: halfTime,
            kodeChat: code2
        }

        if (this.state.chatsText === '') {
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
                title: `pesan tidak boleh kososng`
            })
        }

        const test = addChats({ dataChats });
        if (test) {
            this.setState({
                chatsText: ''
            })
            window.location.reload();
        } else {
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
                title: `gagal kirim pesan`
            })
        }

    }

    tabsShow = () => {
        document.getElementById('tabs-menu').classList.toggle('showX');
    }

    settShow = () => {
        document.getElementById('tabs-menu2').classList.add('showX2');
    }

    closeSett = () => {
        document.getElementById('tabs-menu2').classList.remove('showX2');
    }

    closeInfo = () => {
        document.getElementById('tabs-menu3').classList.remove('showX3');
    }

    settMode = () => {
        document.getElementById('btn-mode').classList.toggle('btn-mode2');
        document.getElementById('dashboard1X').classList.toggle('dashboard1X-light');
        document.getElementById('name-group').classList.toggle('name-group-light');
        document.getElementById('last-chats').classList.toggle('last-chats-light');
    }

    addGrup = (e) => {
        e.preventDefault();
        const { addGrupNotifs } = this.props;

        const { addGrups, addGrupUser } = this.props;
        const { namaGrup, maxGrup, deskripsiGrup } = this.state;

        let code = '';
        let codeNotif = '';
        let codes = 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnop12345678';
        let codesNotif = 'ABCDEFGHIJKLMNOcdefghijklmnop12345678';
        const codesL = codesNotif.length;
        const codesLNotif = codes.length;
        for (var i = 0; i <= 5; i++) {
            code += codes.charAt(Math.floor(Math.random() * codesL))
        }
        for (var i = 0; i <= 5; i++) {
            codeNotif += codesNotif.charAt(Math.floor(Math.random() * codesLNotif))
        }

        const date = new Date();
        const months = ['january', 'february', 'maret', 'april', 'mai', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desamber'];
        const tanggal = new Date().getDate();
        const month = date.getMonth();
        const bulan = months[month];
        const tahun = date.getFullYear();
        const fullTime = `${tanggal}-${bulan}-${tahun}`;
        const dataUser = JSON.parse(localStorage.getItem('dataLogin'));
        const dataUserEmail = JSON.parse(localStorage.getItem('dataLogin2'));

        const dataGrup = {
            namaGrup: namaGrup,
            deskripsiGrup: deskripsiGrup,
            maxGrup: maxGrup,
            kodeGrup: code,
            kodeUserCreate: dataUser[0].data.code,
            dibuatGrup: fullTime,
            email_user: dataUserEmail.email,
            kodeKhususGrup: `${dataUser[0].data.code}${namaGrup}`,
            nama_pembuat: dataUser[0].data.username
        }

        const dataGrup2 = {
            kode_grup: code,
            kode_notif: codeNotif,
            nama_grup: namaGrup,
            nama_pembuat: this.state.username[0].data.username,
            waktu_pembuatan: fullTime,
            nama_pembuat: dataUser[0].data.username
        }

        const dataGrupUser = {
            namaGrup: namaGrup,
            deskripsiGrup: deskripsiGrup,
            maxGrup: maxGrup,
            kodeGrup: code,
            dibuatGrup: fullTime,
            kodeUserCreate: dataUser[0].data.code,
            email_user: dataUserEmail.email,
            kodeKhususGrup: `${dataUser[0].data.code}${namaGrup}`,
            nama_pembuat: dataUser[0].data.username
        }

        const tests = addGrupUser({ dataGrupUser })
        const test = addGrups({ dataGrup });
        const testNotif = addGrupNotifs({ dataGrup2 });

        if (test && tests && testNotif) {
            this.setState({
                namaGrup: '',
                deskripsiGrup: '',
                maxGrup: '',
            })

            window.location.reload();


        } else {
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
                title: `gagal membuat grup baru`
            })
        }
    }

    getGrup = (data, data2, data3, data4, data5, data6) => {
        this.setState({
            detectUser: true
        })
        localStorage.setItem('kode_grup', JSON.stringify(data))
        const { getNotifs } = this.props;
        getNotifs();

        localStorage.setItem('nama_grup', JSON.stringify(data2))
        localStorage.setItem('id_grup', JSON.stringify(data3))
        localStorage.setItem('deskripsi_grup', JSON.stringify(data4))
        localStorage.setItem('dibuat_grup', JSON.stringify(data5))
        localStorage.setItem('max_grup', JSON.stringify(data6))
        this.setState({
            listChats: JSON.parse(localStorage.getItem('listChats'))
        })
    }

    copyText = () => {
        const clipboard = new ClipboardJS('.btn');

        clipboard.on('success', function (e) {
            console.info('Accion:', e.action);
            console.info('Texto:', e.text);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Telah disalin'
            })

            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Accion:', e.action);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Gagal disalin'
            })
        });

    }

    joinGrup = (e) => {
        e.preventDefault();

        const { addGrupUser } = this.props;

        let codeGrupUsers = '';
        let cdu = 'ABCDEFGHIJKLMOPRSTU1234567890abcfghtjyiuklipqw';
        let cdul = cdu.length;
        for (var i = 0; i <= cdul; i++) {
            codeGrupUsers += cdu.charAt(Math.floor(Math.random * cdul))
        }

        const date = new Date();
        const months = ['january', 'february', 'maret', 'april', 'mai', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desamber'];
        const tanggal = new Date().getDate();
        const month = date.getMonth();
        const bulan = months[month];
        const tahun = date.getFullYear();
        const fullTime = `${tanggal}-${bulan}-${tahun}`;
        const emailUser = JSON.parse(localStorage.getItem('dataLogin'));

        const dataGrup = JSON.parse(localStorage.getItem('data'));

        if (this.state.codeGrupNew === '') {
            this.setState({
                detect: false
            })

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
                title: `kode grup masih kosong/tidak sesuai`
            })
        }

        for (var i = 0; i < dataGrup.length; i++) {
            if (this.state.codeGrupNew === dataGrup[i].data.kode_grup) {
                this.setState({
                    detect: true,
                })

                const dataUser = JSON.parse(localStorage.getItem('dataLogin'))

                const dataGrupJoins = {
                    namaGrupJoin: dataGrup[i].data.nama_grup,
                    deskripsiGrupJoin: dataGrup[i].data.deskripsi_grup,
                    maxGrupJoin: dataGrup[i].data.max_grup,
                    dibuatGrupJoin: dataGrup[i].data.dibuat,
                    nama_pembuat: dataUser[0].data.username
                }

                const dataGrupUser = {
                    namaGrup: dataGrupJoins.namaGrupJoin,
                    deskripsiGrup: dataGrupJoins.deskripsiGrupJoin,
                    maxGrup: dataGrupJoins.maxGrupJoin,
                    kodeGrup: this.state.codeGrupNew,
                    dibuatGrup: dataGrupJoins.dibuatGrupJoin,
                    email_user: this.state.emailUser.email,
                    kodeGrupUser: codeGrupUsers,
                    nama_pembuat: dataUser[0].data.username
                }

                if (this.state.detect) {
                    const tests = addGrupUser({ dataGrupUser })

                    if (tests) {
                        this.setState({
                            detect: false,
                            codeGrupNew: ''
                        })

                        window.location.reload()

                    } else {
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
                            title: `gagal bergabung`
                        })
                    }
                }
            }
        }

    }

    keluarGrupUsers = (e) => {
        e.preventDefault();

        const { deleteGroupUsers } = this.props;
        const idGrupOut = JSON.parse(localStorage.getItem('id_grup'));

        const dataGrupOut = {
            idGrupOut: idGrupOut
        }

        Swal.fire({
            title: 'Yakin ingin keluar grup ini?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'lanjutkan',
            cancelButtonText: 'batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const del = deleteGroupUsers({ dataGrupOut })
                if (del) {
                    window.location.reload();
                } else {
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
                        title: `gagal keluar dari grup!`
                    })
                }
            }
        })

    }

    hapusChat = (de) => {
        const { deleteChats } = this.props;
        const ids = de;

        Swal.fire({
            title: 'Yakin ingin hapus pesan ini?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'lanjutkan',
            cancelButtonText: 'batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const dels = deleteChats(ids)
                if (dels) {
                    window.location.reload();
                } else {
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
                        title: `gagal menghapus pesan`
                    })
                }
            }
        })


    }

    copyTextChats1 = () => {
        const clipboard = new ClipboardJS('.btn');

        clipboard.on('success', function (e) {
            console.info('Accion:', e.action);
            console.info('Texto:', e.text);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Telah disalin'
            })

            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Accion:', e.action);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Gagal disalin'
            })
        });

    }

    copyTextChats2 = () => {
        const clipboard = new ClipboardJS('.btn');

        clipboard.on('success', function (e) {
            console.info('Accion:', e.action);
            console.info('Texto:', e.text);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Telah disalin'
            })

            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Accion:', e.action);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Gagal disalin'
            })
        });

    }

    validateUpdateName = () => {
        if (!this.state.namaGrupBaru.length || this.state.namaGrupBaru === '') {
            this.setState({
                nameError: 'nama grup tidak boleh kosong!'
            })
            return false
        } else {
            this.setState({
                nameError: ''
            })
            return true
        }
    }

    updateGrupName = (data) => {
        const { updateGrupNames } = this.props;
        const emailUser = JSON.parse(localStorage.getItem('dataLogin2'))

        const dataGrupUpdate = {
            id: JSON.parse(localStorage.getItem('id_grup')),
            nama_grup: this.state.namaGrupBaru,
            deskripsi_grup: JSON.parse(localStorage.getItem('deskripsi_grup')),
            kode_grup: JSON.parse(localStorage.getItem('kode_grup')),
            dibuat: JSON.parse(localStorage.getItem('dibuat_grup')),
            max_grup: JSON.parse(localStorage.getItem('max_grup')),
            email_user: emailUser.email
        }
        Swal.fire({
            title: 'Yakin ganti nama grup?',
            text: 'hanya anda saja yang dapat melihat perubahan!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'lanjutkan',
            cancelButtonText: 'batal'
        }).then((result) => {
            if (result.isConfirmed && this.validateUpdateName()) {
                let up = updateGrupNames({ dataGrupUpdate })
                if (up) {
                    window.location.reload()
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: true,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'warning',
                        title: 'Gagal di perbarui'
                    })
                }
            }
        })

    }

    validationDeskripsi = () => {
        if (this.state.deskripsiGrupBaru.length < 0 || !this.state.deskripsiGrupBaru.length) {
            this.setState({
                deskripsiError: 'deskripsi grup tidak boleh kosong!'
            })
            return false
        } else {
            this.setState({
                deskripsiError: ''
            })
            return true
        }
    }

    showInfo = () => {
        document.getElementById('tabs-menu3').classList.add('showX3')
    }

    namaGrup = () => {
        return (
            <div>
                {
                    this.state.dataGroups.map(data1 => {
                        this.state.dataGrupsProvider.map((data2, index2) => {
                            if (data2.data.kode_grup === data1.data.kode_grup) {
                                return (
                                    <div className="details-group" key={index2}>
                                        <span className="name-group" id="name-group">{data2.data.nama_grup}</span>
                                        <br />
                                        <span className="last-chats" id="last-chats">cara looping gimana guys?</span>
                                    </div>
                                )
                            }
                        })
                    })
                }
            </div>
        )
    }

    render() {
        const {
            chatsText,
            namaGrup,
            deskripsiGrup,
            maxGrup,
            dataGrups,
            emailUser,
            username,
            listChats,
            codeGrupNew,
            namaGrupBaru,
            allNotif,
            nameError,
            dataGrupsProvider
        } = this.state;

        const {
            valueChange,
            sendChats,
            tabsShow,
            settShow,
            settMode,
            closeSett,
            addGrup,
            getGrup,
            copyText,
            joinGrup,
            keluarGrupUsers,
            hapusChat,
            copyTextChats1,
            copyTextChats2,
            updateGrupName,
            showInfo,
            closeInfo,
        } = this;

        console.log('emailKu :', this.state.emailUser);

        return (
            <div>

                <div className="dashX">

                    <div className="dashboard1X" id="dashboard1X">
                        <div className="top-dash top-dash-one">
                            <div className="info-group">
                                <div className="logo-group2">
                                    <h1>Me</h1>
                                </div>
                                {
                                    username !== null ? (
                                        <span className="name-group2">
                                            {this.state.username[0].data.username}
                                        </span>
                                    ) :
                                        <span className="name-group2">
                                            pengguna tidak dikenal
                                        </span>
                                }
                            </div>
                            <i class="las la-sign-in-alt" data-toggle="modal" data-target="#exampleModal2"></i>
                            <div className="plus">
                                <i className="las la-plus" data-toggle="modal" data-target="#exampleModal"></i>
                            </div>
                        </div>
                        <div className="top-dash">
                            <input type="search" className="group-text" placeholder="cari group..." name="groupName" onChange={valueChange} />
                            <i className="las la-search"></i>
                        </div>
                        <div className="two-dash">
                            {
                                dataGrups && emailUser ? (
                                    dataGrups.map((data, index) => {
                                        if (JSON.parse(localStorage.getItem('dataLogin2')).email === data.data.email_user) {
                                            return (
                                                <div className="groupChats" key={data.data.id} onClick={(d1, d2, d3, d4, d5, d6) => getGrup(data.data.kode_grup, data.data.nama_grup, data.id, data.data.deskripsi_grup, data.data.dibuat, data.data.max_grup)}>
                                                    <div className="logo-group">
                                                        <h1>G</h1>
                                                    </div>
                                                    <div className="details-group" key={index}>
                                                        <span className="name-group" id="name-group">{data.data.nama_grup}</span>
                                                        <br />
                                                        <span className="last-chats" id="last-chats">cara looping gimana guys?</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div></div>
                                        )
                                    })
                                ) :
                                    null
                            }
                        </div>
                    </div>


                    <div className="dashboard2X">
                        <div className="info-groupX">
                            <div className="info-group">
                                <div className="logo-group2">
                                    <h1>G</h1>
                                </div>
                                <span className="name-group2">{JSON.parse(localStorage.getItem('nama_grup'))} - {JSON.parse(localStorage.getItem('kode_grup'))}</span>
                            </div>
                            <div className="tabs">
                                <i class="las la-cog" id="cog" onClick={settShow}></i>
                                <i class="las la-stream" id="stream" onClick={tabsShow}></i>
                                <div className="tabs-menu" id="tabs-menu">
                                    <ul>
                                        <li onClick={showInfo}>info grup</li>
                                        {
                                        }
                                        <li onClick={keluarGrupUsers}>keluar dari grup</li>
                                    </ul>
                                </div>
                                <div className="tabs-menu2" id="tabs-menu2">
                                    <i className="las la-times" id="closedX2" onClick={closeSett}></i>
                                    <img src={logo1} alt="" className="dekorasi-sett" />
                                    <h2>Settings for chatsrooms</h2>
                                    <ul>
                                        <li className="li-sett">kode grup untuk bergabung <span id="codes">({JSON.parse(localStorage.getItem('kode_grup'))})</span></li>
                                        <button className="btn-up-sett btn" id="copy" data-clipboard-text={JSON.parse(localStorage.getItem('kode_grup'))} onClick={copyText}><i className="las la-copy"></i>copy code</button>
                                        <li className="li-sett">perbarui nama grup </li>
                                        <button className="btn-up-sett" data-toggle="modal" data-target="#exampleModal3">Update</button>
                                        <li className="li-sett">perbarui deskripsi grup </li>
                                        <button className="btn-up-sett" data-toggle="modal" data-target="#exampleModal4">Update</button>
                                        <li className="li-mode">
                                            mode on
                                            <div className="mode">
                                                <div className="btn-mode" id="btn-mode" onClick={settMode}>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tabs-menu3" id="tabs-menu3">
                                    <i className="las la-times" id="closedX2" onClick={closeInfo}></i>
                                    <img src={logo1} alt="" className="dekorasi-sett" />
                                    <h2>info {JSON.parse(localStorage.getItem('nama_grup'))}</h2>
                                    <br />
                                    <small>dibuat pada {JSON.parse(localStorage.getItem('dibuat_grup'))}</small>
                                    <br />
                                    <label className="labels">Deskripsi grup</label>
                                    <p>{JSON.parse(localStorage.getItem('deskripsi_grup'))}</p>
                                    <label className="labels">Anggota grup</label>
                                    {
                                        JSON.parse(localStorage.getItem('data')) ? (
                                            JSON.parse(localStorage.getItem('data')).map((data, index) => {
                                                if (data.data.kode_grup === this.state.kodeGrupFromLS) {
                                                    return (
                                                        <p>
                                                            {data.data.username}
                                                        </p>
                                                    )
                                                }
                                            })
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="page-chatsX scrollingContainer">
                            {
                                allNotif !== null ? (
                                    allNotif.map((data, index) => {
                                        if (data.data.kode_grup === JSON.parse(localStorage.getItem('kode_grup'))) {
                                            return (
                                                <div className="chats-intro" key={index}>
                                                    <p>Grup ini <span>dibuat oleh {data.data.nama_pembuat}</span> pada {data.data.waktu_pembuatan}</p>
                                                    <i class="las la-quote-right" id="closeIntro"></i>
                                                </div>
                                            )
                                        }
                                    })
                                ) :
                                    null
                            }

                            {
                                listChats ? (
                                    listChats.map((data, index) => {
                                        if (data.data.email_pengirim === this.state.emailUser.email && data.data.kode_grup === JSON.parse(localStorage.getItem('kode_grup'))) {
                                            return (
                                                <div className="chats-line user" key={index}>
                                                    <i class="las la-trash" id="share2a" onClick={() => hapusChat(data.id)}></i>
                                                    <i class="las la-copy btn" id="share2" data-clipboard-text={data.data.isi_chat} onClick={copyTextChats1}></i>
                                                    <span className="nameUser nameX">{data.data.nama_pengirim} | <span className="sendClock">{data.data.jam_pengiriman}</span></span>
                                                    <p>{data.data.isi_chat}</p>
                                                </div>
                                            )
                                        } else if (data.data.email_pengirim !== this.state.emailUser.email && data.data.kode_grup === JSON.parse(localStorage.getItem('kode_grup'))) {
                                            return (
                                                <div className="chats-line com" key={index}>
                                                    {/* <i class="las la-trash" id="share" onClick={() => hapusChat(data.id)}></i> */}
                                                    <i class="las la-copy btn" id="share" data-clipboard-text={data.data.isi_chat} onClick={copyTextChats2}></i>
                                                    <span className="nameUser nameX">{data.data.nama_pengirim} | <span className="sendClock">{data.data.jam_pengiriman}</span></span>
                                                    <p>{data.data.isi_chat}</p>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div></div>
                                        )
                                    })
                                ) :
                                    null
                            }

                        </div>
                        <div className="typing-chats">
                            <form onSubmit={sendChats}>
                                <input type="text" className="chatsText" value={chatsText} name="chatsText" onChange={valueChange} />
                                <i className="lab la-telegram" onClick={sendChats}></i>
                            </form>
                        </div>
                    </div>

                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Membuat grup pesan baru</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Nama grup</label>
                                        <input type="text" name="namaGrup" className="form-control" value={namaGrup} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={valueChange} />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Deskripsi grup</label>
                                        <input type="text" name="deskripsiGrup" className="form-control" value={deskripsiGrup} id="exampleInputPassword1" onChange={valueChange} />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Maksimal anggota</label>
                                        <input type="number" name="maxGrup" className="form-control" value={maxGrup} id="exampleInputPassword1" onChange={valueChange} />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                <button type="button" className="btn btn-primary" onClick={addGrup}>Buat sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* untuk gabung grup baru */}
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Bergabung bersama grup lain</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">kode grup</label>
                                        <input type="text" name="codeGrupNew" className="form-control" value={codeGrupNew} id="exampleInputPassword1" onChange={valueChange} />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                <button type="button" className="btn btn-primary" onClick={joinGrup}>Gabung sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* perbarui nama grup */}
                <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Mengganti nama grup</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">nama grup yang lama</label>
                                        <input type="text" name="namaGrupBaru" disabled className="form-control" value={JSON.parse(localStorage.getItem('nama_grup'))} id="exampleInputPassword1" onChange={valueChange} />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">nama grup yang baru</label>
                                        <input type="text" name="namaGrupBaru" className="form-control" value={namaGrupBaru} id="exampleInputPassword1" onChange={valueChange} />
                                        <span className="error">{nameError}</span>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                                <button type="button" className="btn btn-primary" onClick={updateGrupName}>Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const getStateRedux = (state) => {
    return {
        dataGrups: state.dataGrup
    }
}

const getActionRedux = (dispatch) => {
    return {
        addGrups: (data) => dispatch(addGrup(data)),
        addGrupUser: (data) => dispatch(addGrupUsers(data)),
        getGrupAll: (data) => dispatch(getGrupAll(data)),
        addChats: (data) => dispatch(addChats(data)),
        getChats: (data) => dispatch(getChats(data)),
        deleteGroupUsers: (data) => dispatch(deleteGroupUser(data)),
        deleteChats: (data) => dispatch(deleteChat(data)),
        addGrupNotifs: (data) => dispatch(addGrupNotif(data)),
        updateGrupNames: (data) => dispatch(updateGrupName(data)),
        getNotifs: (data) => dispatch(getNotif(data)),
        getGrupAllProviders: (data) => dispatch(getGrupAllProvider(data)),
    }
}

export default connect(getStateRedux, getActionRedux)(Dashboard);
