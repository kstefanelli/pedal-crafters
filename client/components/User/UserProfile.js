import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../store/singleUser";
import { logout } from "../../store";

const UserProfile = ({ firstName, user, getUser }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  const profileLabels = ["First Name", "Last Name", "Email", "Address"];
  const userInfo = ["firstName", "lastName", "email", "address"];

  return (
    <>
      <div className='flex flex-col items-center py-2 px-4 lg:px-6 xl:px-12 min-h-[75vh] justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4'>Welcome {firstName}!</h2>

          <div className='mt-6 flex flex-col items-center'>
            <div className='text-center'>
              {profileLabels.map((profileLabel, index) => (
                <div
                  className='grid grid-cols-2 justify-center gap-2 text-start items-center text-xl'
                  key={index}
                >
                  <p className='font-bold'>{profileLabel}:</p>
                  <p>{user[userInfo[index]]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.auth.firstName,
  user: state.singleUser,
});

const mapDispatchToProps = {
  getUser: fetchUser,
  handleLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
