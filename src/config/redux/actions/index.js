import firebase, { database, firestore } from '../../firebase/firebase';

export const loginUser = (data) => (dispatch) => {
     const getData = database.ref(`/user/${data.dataUser.password}`);
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(data.dataUser.email, data.dataUser.password)
        .then(res => {
            getData.on('value', (snapshot) => {
              const array = [];
              Object.keys(snapshot.val()).map(key => {
                  array.push({
                      id: key,
                      data: snapshot.val()[key]
                    })
                })
                localStorage.setItem('dataLogin', JSON.stringify(array))
                resolve(true);
          })
        })
        .catch(() => {
          reject(false)
        })
    })
}

export const registerUser = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(data.dataUser.email, data.dataUser.password)
        database.ref(`/user/${data.dataUser.password}`).push({
            username: data.dataUser.nama,
            code: data.dataUser.code_user,
            email: data.dataUser.email,
            password: data.dataUser.password,
        })
        .then(res => {
            resolve(console.log(res))
            resolve(true)
        })
        .catch(err => {
            reject(false)
            reject(console.log('error :', err))
        })
    })
}

export const addGrup = (data) => (dispatch) => {
  return new  Promise((resolve, reject) => {
      database.ref(`/grup/provider/`)
      .push({
          nama_grup: data.dataGrup.namaGrup,
          deskripsi_grup: data.dataGrup.deskripsiGrup,
          kode_grup: data.dataGrup.kodeGrup,
          dibuat: data.dataGrup.dibuatGrup,
          max_grup:  parseInt(data.dataGrup.maxGrup),
          email_pembuat: data.dataGrup.email_user,
          username: data.dataGrup.nama_pembuat
      })
      .then(res => {
        resolve(true)
      })
      .catch(err => {
        reject(false)
      })
  })
}

export const addGrupNotif = (data) => (dispatch) => {
  return new  Promise((resolve, reject) => {
      database.ref(`/grup/notif`)
      .push({
          kode_grup: data.dataGrup2.kode_grup,
          kode_notif: data.dataGrup2.kode_notif,
          nama_grup: data.dataGrup2.nama_grup,
          nama_pembuat: data.dataGrup2.nama_pembuat,
          waktu_pembuatan: data.dataGrup2.waktu_pembuatan,
          username: data.dataGrup2.nama_pembuat
      })
      .then(res => {
        resolve(true)
      })
      .catch(err => {
        reject(false)
      })
  })
}

export const addGrupUsers = (data) => (dispatch) => {
  return new  Promise((resolve, reject) => {
      database.ref(`/grup/users/`)
      .push({
          nama_grup: data.dataGrupUser.namaGrup,
          deskripsi_grup: data.dataGrupUser.deskripsiGrup,
          kode_grup: data.dataGrupUser.kodeGrup,
          dibuat: data.dataGrupUser.dibuatGrup,
          max_grup:  parseInt(data.dataGrupUser.maxGrup),
          email_user: data.dataGrupUser.email_user,
          username: data.dataGrupUser.nama_pembuat
      })
      .then(res => {
        resolve(true)
      })
      .catch(err => {
        reject(false)
      })
  })
}

export const deleteGroupUser = (data) => (dispatch) => {
    const grupURL = database.ref(`grup/users/${data.dataGrupOut.idGrupOut}`)
    return new Promise((resolve, reject) => {
        grupURL.remove()
        .then(() => {
            resolve(true)
        })
        .catch(err => {
            reject(false)
            reject(err)
        })
    })
}

export const getGrupAllProvider = (data) => (dispatch) => {
    const getData = database.ref('/grup/provider');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
                dispatch({ type: 'DATA_GRUP', value: array })
                localStorage.setItem('data2', JSON.stringify(array));
            })
        })
    })
}

export const getGrupAll = (data) => (dispatch) => {
    const getData = database.ref('/grup/users');
    return new Promise((resolve) => {
        getData.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
                dispatch({ type: 'DATA_GRUP', value: array })
                localStorage.setItem('data', JSON.stringify(array));
            })
        })
    })
}

export const updateGrupName = (data) => (dispatch) => {
    const dbRef = database.ref(`grup/users/${data.dataGrupUpdate.id}`)
    return new Promise((resolve, reject) => {
        dbRef.set({
            nama_grup: data.dataGrupUpdate.nama_grup,
            deskripsi_grup: data.dataGrupUpdate.deskripsi_grup,
            kode_grup: data.dataGrupUpdate.kode_grup,
            dibuat: data.dataGrupUpdate.dibuat,
            max_grup:  parseInt(data.dataGrupUpdate.max_grup),
            email_user: data.dataGrupUpdate.email_user
        })
        .then(res => {
            resolve(true)
        })
        .catch(err => {
            reject(false)
            reject(console.log('err update :', err))
        })
    })
}

export const getNotif = () => () => {
    const dbRef = database.ref(`/grup/notif`)
    dbRef.orderByChild('kode_grup').equalTo(`${JSON.parse(localStorage.getItem('kode_grup'))}`)
    return new Promise((resolve) => {
        dbRef.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            resolve(localStorage.setItem('dataNotif', JSON.stringify(array)))
        })
    })
}

export const addChats = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        database.ref('chats/send').push({
            kode_user: data.dataChats.kodeUser,
            kode_grup: data.dataChats.kodeGrup,
            isi_chat: data.dataChats.isiChats,
            waktu_chat: data.dataChats.dibuat,
            jam_pengiriman: data.dataChats.jamPengiriman,
            nama_pengirim: data.dataChats.namaPengirim,
            email_pengirim: data.dataChats.emailPengirim,
            kode_chat: data.dataChats.kodeChat,
        })
        .then(res => {
            resolve(true)
        })
        .catch(() => {
            reject(false)
        })
    })
}

export const getChats = () => () => {
    const getData = database.ref('/chats/send');
    return new Promise((resolve, reject) => {
        getData.orderByChild('waktu_pengiriman').on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            localStorage.setItem('listChats', JSON.stringify(array));
        })
    })
}

export const deleteChat = (data) => (dispatch) => {
    const grupURL = database.ref(`chats/send/${data}`)
    return new Promise((resolve, reject) => {
        grupURL.remove()
        .then(() => {
            resolve(true)
        })
        .catch(err => {
            reject(false)
            reject(err)
        })
    })
}