import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router ) {
        firebase.initializeApp({
            apiKey: "AIzaSyCFFDUhetWzzK-SB1AZCHhEwVpmtLh8ynA",
            authDomain: "bpcsite-277ab.firebaseapp.com",
            databaseURL: "https://bpcsite-277ab.firebaseio.com",
            projectId: "bpcsite-277ab",
            storageBucket: "bpcsite-277ab.appspot.com",
            messagingSenderId: "536102140627"
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        let url: string = state.url;
        return true;// this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                console.log(error);
                console.log(`${error.message} Please Try Again!`);
            });
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string){
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert('${error.message} Unable to login. Try Again!');
            });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function(){
            alert('Logged Out');
        }, function(error) {
            alert('${error.message} Unabled to logout. Try again!');
        });
    }
}
