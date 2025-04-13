import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, get, set, push, remove, update, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCnXoxgdRHEIS9CDlFN5H4KX9wYH_MwfNg",
    authDomain: "commerceadminpanel.firebaseapp.com",
    databaseURL: "https://commerceadminpanel-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "commerceadminpanel",
    storageBucket: "commerceadminpanel.appspot.com",
    messagingSenderId: "20626601415",
    appId: "1:20626601415:web:9e9fd7f1351bebe56615e2"
};

let app;
try {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
}

const auth = getAuth(app);
const database = getDatabase(app);

async function checkUserRole() {
    const user = auth.currentUser;
    if (!user) {
        console.log('No user logged in, redirecting to login');
        window.location.href = 'login.html';
        return null;
    }

    try {
        const snapshot = await get(ref(database, 'users/' + user.uid));
        const userData = snapshot.val();
        console.log('User role:', userData?.role);
        return userData?.role || null;
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
}

async function protectRoute(allowedRole) {
    const role = await checkUserRole();
    if (!role) {
        console.log('No role found, redirecting to login');
        window.location.href = 'login.html';
        return;
    }

    if (role !== allowedRole) {
        console.log('Incorrect role, redirecting to appropriate dashboard');
        window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
    }
}

export { 
    auth, 
    database, 
    checkUserRole, 
    protectRoute,
    ref,
    get,
    set,
    push,
    remove,
    update,
    onValue,
    signOut
};
