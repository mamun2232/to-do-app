import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Home = () => {
      const [user] = useAuthState(auth)
      const logOut = () =>{
            signOut(auth)

      }
      
      return (
            <div>
                  <p>hellow</p>
                  <button onClick={logOut}>logOut</button>

                  <div className="to-do-container">
                        <div className="container">
                              <h3 className='text-center'>Hellow {user.displayName} , Wellcome Our To Do App </h3>

                        </div>
                  </div>
            </div>
      );
};

export default Home;