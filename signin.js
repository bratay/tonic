//returns 1 = user has account, 0 = new user,  -1 = sign in fail
export async function googleSignIn() {
    let result = await realGoogleSignIn();
    return result;
}

export async function realGoogleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider(); //Google sign in object
    let result = null

    await firebase.auth().signInWithPopup(provider).then(
        async function (r) {
            let user = firebase.auth().currentUser
            let newUser = false

            let query = db.collection('users').where('userID', '==', user.uid)
            await query.get().then(doc => { newUser = (doc.empty) ? true : false })

            if (newUser) {
                // Creates new document with token as name of doc
                db.collection('users').doc(user.uid).set({
                    bio: "",
                    hometown: "",
                    hometownLat: 0,
                    hometownLong: 0,
                    email: user.email,
                    picUrl: String(user.photoURL),
                    userID: user.uid,
                    username: user.displayName,
                    userType: 0
                })

                await autoUpdateUserObject(db.collection('users').doc(user.uid));
                result = 0;
            } else {
                await autoUpdateUserObject(db.collection('users').doc(user.uid));
                result = 1;
            }
        }
    );

    return result
}