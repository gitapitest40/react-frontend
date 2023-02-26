import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItem from "../AddItem";
import { actions as itemAction } from "../../redux/reducers/Reducer";
function ListProfiles() {
  const dispatch = useDispatch();
  const { itemsList, profileAddLoading } = useSelector((state) => state.reducer);
  const [openAddress,setOpenAddress] = useState(false);
  const [profileList,setProfileList] = useState([]);
  const [idList,setIdList] = useState([]);

  useEffect(() => {
    dispatch(itemAction.listItems());
  }, [dispatch]);

  useEffect(() => {
    if(!profileAddLoading){
      setOpenAddress(false);
    }
  }, [profileAddLoading]);

  useEffect(() => {
    if(itemsList.length){
      itemsList.forEach((v)=>{
        v['checked'] = false;
      })
      setProfileList(itemsList);
    }
  }, [itemsList]);

  const deleteProfile=()=>{
    dispatch(itemAction.deleteProfile(idList));
    setIdList([]);
  }

  const handleCheck=(id,i,checked)=>{
    if(checked){
      idList.push(id);
      setIdList(idList);
      profileList[i]['checked']=checked;
      setProfileList([...profileList]);
    }else{
      idList.forEach((v,index)=>{
        if(v === id){
          idList.splice(index,1)
        }
      })
      setIdList(idList);
      profileList[i]['checked']=checked;
      setProfileList([...profileList]);
    }
  }

  const AddressList=({addresses})=>{
    console.log('addresses',addresses)
    let temp = addresses.map((val,index)=>{
    return(
    <li key={'address'+index}>
      Address {index+1}: {val.street1}, {val.street2}, {val.city}, {val.state}, {val.country}, {val.pincode}
    </li>
    )
      })
      return temp;
  }

  const cancel=()=>{
    setOpenAddress(false);
  }

  return (
    <div className="container">
      {!openAddress?<button className="btn btn-primary" onClick={()=>{setOpenAddress(true)}}>Create Profile</button>:null}
      {idList.length?<button style={{marginLeft: "15px"}} className="btn btn-primary" onClick={deleteProfile}>Delete Profile</button>:null}
        {openAddress?<AddItem/>:null}
    {!openAddress && itemsList && itemsList.length?<table className="table table-bordered" style={{marginTop: '10px'}}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Addresses</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {profileList?profileList.map((val,index)=>{
        return(
        <tr key={'item'+index}>
            <td>{val.name}</td>
            <td>{val.email}</td>
            <td>{val.phone}</td>
            <td><AddressList addresses={val.addresses}/></td>
            <td><input type="checkbox" checked={val.checked} onChange={(e)=>{handleCheck(val._id,index,e.target.checked)}}/></td>
          </tr>
          )
      }):null}
    </tbody>
  </table>:null}
  {openAddress?<button className="btn btn-primary" onClick={cancel} data-dismiss="modal">Cancel</button>:null}
    </div>
  );
}

export default React.memo(ListProfiles);
