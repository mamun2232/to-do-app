import { signOut } from 'firebase/auth';
import React from 'react';
import auth from '../../firebase.init';

const Home = () => {
      const logOut = () =>{
            signOut(auth)

      }
      
      return (
            <div>
                  <p>hellow</p>
                  <button onClick={logOut}>logOut</button>
            </div>
      );
};

export default Home;