import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header/Header'
import './CabinetPage.css'
import { useForm } from 'react-hook-form'

function CabinetPage() {
  const [userData, setUserData] = useState({})
  const {id} = useParams()
  const navigate = useNavigate()
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  useEffect(()=>{
    if(localStorage.getItem('user_fio')=="" || localStorage.getItem('user_fio')==null || localStorage.getItem('user_fio')==undefined)
    navigate('/auth')
    else
    {
      setUserData({
        surname: localStorage.getItem('user_fio').split(' ')[0],
        name: localStorage.getItem('user_fio').split(' ')[1],
        middle_name: localStorage.getItem('user_fio').split(' ')[2],
        snt_name: localStorage.getItem('snt_name'),
        place:"",
        isVerified: JSON.parse(localStorage.getItem('is_verif'))
      })
    }
  },[])

  return (
    <div>
      <Header/>
      <div className="main_container_cabinetPage">     
            <div className="container_cabinetPage">
              <div className="header_container_cabinetPage">
                <h2>Личная информация</h2>
                <div className="btn_container_cabinetPage">
                {JSON.parse(localStorage.getItem('is_admin'))==true && <button className='btn_cabinetPage' onClick={(e)=>{e.preventDefault(); navigate(`/user/${id}/bulletdoc`)}} disabled>Заявки участников</button>}
                <button className='btn_cabinetPage' onClick={(e)=>{e.preventDefault(); navigate(`/user/${id}/events`)}}>Перейти к собраниям</button>
                <button className='btn_cabinetPage' onClick={(e)=>{e.preventDefault(); localStorage.clear(); navigate('/')}}>Выйти из аккаунта</button>
                </div>                
              </div>
              <div className="content_container_cabinetPage">
                  <form className='form_container_cabinetPage'>
                    <div className="item_form_container_cabinetPage">
                      <h4>Фамилия</h4>
                      <input type='text' className='inputText_cabinetPage' value={userData.surname}/>
                    </div>
                    <div className="item_form_container_cabinetPage">
                      <h4>Имя</h4>
                      <input type='text' className='inputText_cabinetPage' value={userData.name}/>
                    </div>
                    <div className="item_form_container_cabinetPage">
                      <h4>Отчество</h4>
                      <input type='text' className='inputText_cabinetPage' value={userData.middle_name}/>
                    </div>
                    <div className="item_form_container_cabinetPage">
                      <h4>СНТ</h4>
                      <input type='text' className='inputText_cabinetPage' value={userData.snt_name}/>
                    </div>
                    <div className="item_form_container_cabinetPage">
                      <h4>Участок</h4>
                      <input type='text' className='inputText_cabinetPage'/>
                    </div>
                    <div className="item_form_container_cabinetPage">
                      <h4>Подтверждённый участник</h4>
                      <input type='text' className='inputText_cabinetPage' value={userData.isVerified===true ?"Да":"Нет"} disabled/>
                    </div>
                    <div className="saveBtn_container_cabinetPage">
                    {/* <input type='submit' className='saveData_btn_cabinetPage' value="Сохранить" disabled={true}/> */}
                    </div>
                  </form>
                  {JSON.parse(localStorage.getItem('is_admin'))==true &&
                  <div className="footer_container_cabinetPage">
                    <h3>Ссылки на документы</h3>
                    <div className="docLinks_container_cabinetPage">
                    <a href='http://127.0.0.1:8000/download/176/' download target='_blank' className="docLink_cabinetPage">Реестр членов СНТ</a>
                    <a href="http://127.0.0.1:8000/download/175/" download target='_blank' className="docLink_cabinetPage">Реестр членов правления СНТ</a>
                    </div>
                  </div>}
              </div>
            </div>
      </div>
            
    </div>
  )
}

export default CabinetPage