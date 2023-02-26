import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as itemAction } from "../../redux/reducers/Reducer";

function AddItem() {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.reducer);
  const [openAddress,setOpenAddress] = useState(false);
  const [address,setAddress] = useState({});
  const [addressList,setAddressList] = useState([]);

  const handleSubmit =()=>{
    dispatch(itemAction.profileSubmit(profileData));
  }

  const handleChange=(e)=>{
    console.log('e',e)
    profileData[e.target.name] = e.target.value;
    dispatch(itemAction.setProfileData(profileData));
  }

  const handleChangeAddress=(e)=>{
    address[e.target.name] = e.target.value;
    setAddress({...address});
  }

  const handleAddAddress=()=>{
    addressList.push(address);
    setAddressList(addressList);
    setAddress({});
    setOpenAddress(false);
    profileData['addresses'] = addressList;
    dispatch(itemAction.setProfileData(profileData));
  }

  return (
    <div style={{marginTop: '10px'}}>
      <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter name" name="name" value={profileData?.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Enter email" name="email" value={profileData?.email}
                onChange={handleChange}
              />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" placeholder="Enter phone" name="phone" value={profileData?.phone}
                onChange={handleChange}
              />
          </div>
          {openAddress?<div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Enter Street 1" name="street1" value={address?.street1}
                onChange={handleChangeAddress}
              />
               <input type="text" className="form-control" placeholder="Enter Street 2" name="street2" value={address?.street2}
                onChange={handleChangeAddress}
              />
              <input type="text" className="form-control" placeholder="Enter city" name="city" value={address?.city}
                onChange={handleChangeAddress}
              />
              <input type="text" className="form-control" placeholder="Enter state" name="state" value={address?.state}
                onChange={handleChangeAddress}
              />
              <input type="text" className="form-control" placeholder="Enter country" name="country" value={address?.country}
                onChange={handleChangeAddress}
              />
              <input type="number" className="form-control" placeholder="Enter pincode" name="pincode" value={address?.pincode}
                onChange={handleChangeAddress}
              />
            </div>
            <div className="form-group">
            <button className="btn btn-primary" onClick={handleAddAddress}>Add</button>
          </div>
          </div>:
          <div>
            {addressList?addressList.map((val,index)=>{
              return(
              <li key={'item'+index}>
                  Address {index+1}: {val.street1}, {val.street2}, {val.city}, {val.state}, {val.country}, {val.pincode}
                </li>
                )
            }):null}
            <div className="form-group">
              <button className="btn btn-primary" onClick={()=>{setOpenAddress(true)}}>Add Address</button>
            </div>
          </div>}
          <div className="form-group">
            <button className="btn btn-primary" onClick={handleSubmit} data-dismiss="modal">Submit</button>
          </div>
    </div>
  );
}

export default React.memo(AddItem);
