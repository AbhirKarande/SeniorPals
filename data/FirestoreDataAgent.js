import * as firebase from 'firebase';

export default class FirestoreDataAgent {
    foodRequestsCollection = firebase.firestore().collection("requests");

    submitFoodRequest = (config) => {
        return new Promise((resolve, reject) => {
            const {user} = config;
            if (!user) {reject("Not logged in"); return;}

            const userFoodRequestDoc = this.foodRequestsCollection.doc(user.uid);

            // check to ensure there is not an active request
            userFoodRequestDoc.get().then((snapshot) => {
                if (snapshot.exists) {
                    reject("You already have a pending food request. You may cancel it in Settings.")
                    return;
                }

                // submit request
                const entry = {
                    name: config.name,
                    address: config.address,
                    dietaryRestrictions: config.dietaryRestrictions,
                    location: config.location,
                    timestamp: config.timestamp,
                    uid: user.uid
                }
                userFoodRequestDoc.set(entry).then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                })
            })
        })
    }

    cancelFoodRequest = (user) => {
        return new Promise((resolve, reject) => {
            if (!user) {reject("Not logged in"); return;}

            const userFoodRequestDoc = this.foodRequestsCollection.doc(user.uid);

            // check whether there is an active request
            userFoodRequestDoc.get().then((snapshot) => {
                if (!snapshot.exists) {
                    reject("You do not have any pending requests");
                    return;
                }

                // delete request
                userFoodRequestDoc.delete().then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                })
            })
        })
    }

    getRequests = () => {
        return new Promise((resolve, reject) => {
            this.foodRequestsCollection.get().then((querySnapshot) => {
                const requests = [];
                querySnapshot.forEach((docSnapshot) => {
                    requests.push(docSnapshot.data());
                })
                resolve(requests);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}